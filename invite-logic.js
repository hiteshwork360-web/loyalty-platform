(function(){
var inviteState={pendingInvite:null};
var serverTs=firebase.firestore.FieldValue.serverTimestamp;

function safeHtml(value){
  return String(value==null?"":value)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}

function cutePhrase(){
  var list=["My forever","Love awaits","Us always","Only us","Sweet destiny","Pure forever"];
  return list[Math.floor(Math.random()*list.length)];
}

function ensureFlowCards(){
  var card=document.querySelector(".auth-card");
  if(!card)return;
  if(!document.getElementById("invite-wait-step")){
    var wait=document.createElement("div");
    wait.id="invite-wait-step";
    wait.className="hidden";
    card.appendChild(wait);
  }
  if(!document.getElementById("invite-response-step")){
    var response=document.createElement("div");
    response.id="invite-response-step";
    response.className="hidden";
    card.appendChild(response);
  }
}

function hideAuthSteps(){
  ["phone-step","otp-step","setup-step","invite-wait-step","invite-response-step"].forEach(function(id){
    var element=document.getElementById(id);
    if(element)element.classList.add("hidden");
  });
}

function showAuthSection(id){
  document.getElementById("auth").classList.remove("hidden");
  document.getElementById("app").classList.add("hidden");
  hideAuthSteps();
  var element=document.getElementById(id);
  if(element)element.classList.remove("hidden");
}

function inviteLink(id){
  return window.location.origin+window.location.pathname+"?invite="+encodeURIComponent(id);
}

function queryInviteId(){
  return new URLSearchParams(window.location.search).get("invite");
}

function clearInviteQuery(){
  var url=new URL(window.location.href);
  url.searchParams.delete("invite");
  window.history.replaceState({}, "", url.toString());
}

function ensureItemId(item,prefix){
  if(item&&!item.id){
    item.id=(prefix||"item")+"-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8);
  }
  return item;
}

function normalizeAppData(data){
  var next={calendarEvents:[],bucketList:[],travelList:[],babyNames:[],loveNotes:[],memories:[],customDateIdeas:[],favorites:{},intimateEntries:[],intimateWishlist:[]};
  Object.keys(next).forEach(function(key){
    if(data&&data[key]!=null)next[key]=data[key];
  });
  ["calendarEvents","bucketList","travelList","babyNames","loveNotes","memories","customDateIdeas","intimateEntries","intimateWishlist"].forEach(function(key){
    next[key]=(next[key]||[]).map(function(item){
      return ensureItemId(item,key.slice(0,-1));
    });
  });
  return next;
}

function setMessage(type,message){
  var container=document.getElementById("message-container");
  var box=document.createElement("div");
  if(!container)return;
  container.innerHTML="";
  box.className=type==="error"?"error-message":"success-message";
  box.textContent=message;
  container.appendChild(box);
  setTimeout(function(){
    if(container.contains(box))container.removeChild(box);
  },5000);
}

showError=function(message){setMessage("error",message);};
showSuccess=function(message){setMessage("success",message);};

function relId(a,b){
  return [a,b].sort().join("__").replace(/[^\w]/g,"_");
}

function resetSetupButton(){
  var btn=document.getElementById("setup-btn-text");
  if(btn)btn.textContent="Start Our Forever Journey";
}

function userRef(uid){return db.collection("users").doc(uid);}
function relationshipRef(id){return db.collection("relationships").doc(id);}
function inviteRef(id){return db.collection("invites").doc(id);}
function phoneLinkRef(phone){return db.collection("phoneLinks").doc(phone);}

function ensureCurrentUserSeed(extra){
  if(!auth.currentUser)return Promise.reject(new Error("Please verify your number again."));
  var payload={phone:auth.currentUser.phoneNumber,lastSeenAt:serverTs()};
  if(extra){
    Object.keys(extra).forEach(function(key){
      if(extra[key]!==undefined)payload[key]=extra[key];
    });
  }
  return userRef(auth.currentUser.uid).set(payload,{merge:true});
}

function getDocData(ref){
  return ref.get().then(function(doc){
    if(!doc.exists)return null;
    return {id:doc.id,data:doc.data()||{}};
  });
}

function getPhoneLink(phone){
  return getDocData(phoneLinkRef(phone));
}

function getInvite(id){
  if(!id)return Promise.resolve(null);
  return getDocData(inviteRef(id));
}

function getRelationship(id){
  if(!id)return Promise.resolve(null);
  return getDocData(relationshipRef(id));
}

function waitingUi(invite){
  ensureFlowCards();
  var step=document.getElementById("invite-wait-step");
  var phrase=invite.data.cuteMessage||cutePhrase();
  var link=invite.data.link||inviteLink(invite.id);
  step.innerHTML='<div class="info-box"><div class="info-title">Invite Created</div><div class="info-text">A pending loyalty invite is ready for <strong>'+safeHtml(invite.data.partnerPhone)+'</strong>. Ask your partner to sign in with Firebase OTP on this app. When they open the invite link and verify their number, they can accept it.</div></div><div class="input-group"><label class="input-label">Cute Message</label><input type="text" value="'+safeHtml(phrase)+'" readonly></div><button class="btn btn-outline" onclick="window.__inviteActions.copyLink()">Copy Invite Link</button><div class="info-box" style="margin-top:18px;"><div class="info-title">OTP Only</div><div class="info-text">This version uses Firebase OTP only. Invite delivery is manual: share the link yourself, then your partner verifies their phone and accepts.</div></div>';
  window.__inviteActions={
    copyLink:function(){
      navigator.clipboard.writeText(link).then(function(){
        showSuccess("Invite link copied!");
      });
    }
  };
  inviteState.pendingInvite=invite;
  showAuthSection("invite-wait-step");
}

function incomingUi(invite){
  ensureFlowCards();
  var step=document.getElementById("invite-response-step");
  step.innerHTML='<div class="info-box"><div class="info-title">Love Invite</div><div class="info-text"><strong>'+safeHtml(invite.data.inviterName||"Someone")+'</strong> invited you to join their loyalty space.<br><br><em>'+safeHtml(invite.data.cuteMessage||cutePhrase())+'</em></div></div><button class="btn" onclick="acceptInviteFlow()">Accept Invite</button><button class="btn btn-outline" onclick="declineInviteFlow()">Decline</button>';
  inviteState.pendingInvite=invite;
  showAuthSection("invite-response-step");
}

function loadRelationshipByIdPatched(id){
  currentRelationshipId=id;
  return relationshipRef(id).get().then(function(relDoc){
    if(!relDoc.exists)throw new Error("Relationship not found");
    relationshipData=relDoc.data()||{};
    relationshipData.id=id;
    return db.collection("appData").doc(id).get();
  }).then(function(appDoc){
    appData=normalizeAppData(appDoc.exists?appDoc.data():null);
    showDashboard(relationshipData);
  });
}

function handleRelationshipDoc(rel){
  if(!rel)return showAuthSection("setup-step");
  var status=rel.data.status||"active";
  currentRelationshipId=rel.id;
  relationshipData=rel.data;
  relationshipData.id=rel.id;
  if(status==="pending"){
    return getInvite(rel.data.inviteId).then(function(invite){
      if(!invite){
        showError("Pending relationship found, but the invite record is missing.");
        showAuthSection("setup-step");
        return;
      }
      if(currentPhone===rel.data.partnerPhone)incomingUi(invite);
      else waitingUi(invite);
    });
  }
  if(status==="rejected"||status==="cancelled"||status==="declined"){
    return ensureCurrentUserSeed({relationshipId:firebase.firestore.FieldValue.delete()}).then(function(){
      showAuthSection("setup-step");
    });
  }
  return loadRelationshipByIdPatched(rel.id);
}

function phoneLinkPayload(phone,relationshipId,inviteId,status,partnerPhone){
  return {
    phone:phone,
    relationshipId:relationshipId,
    inviteId:inviteId,
    status:status,
    partnerPhone:partnerPhone,
    updatedAt:serverTs()
  };
}

function createRelationshipBundle(name,partnerPhone,relationshipStart,targetDate){
  var relationshipId=relId(currentPhone,partnerPhone);
  var inviteId=inviteRef().id;
  var memberNames={};
  memberNames[currentPhone]=name;
  var relationshipPayload={
    id:relationshipId,
    inviteId:inviteId,
    createdBy:auth.currentUser.uid,
    inviterPhone:currentPhone,
    partnerPhone:partnerPhone,
    members:[currentPhone,partnerPhone],
    memberNames:memberNames,
    relationshipStart:relationshipStart,
    targetDate:targetDate,
    status:"pending",
    createdAt:serverTs(),
    updatedAt:serverTs()
  };
  var invitePayload={
    relationshipId:relationshipId,
    partnerPhone:partnerPhone,
    inviterPhone:currentPhone,
    inviterName:name,
    cuteMessage:cutePhrase(),
    status:"pending",
    link:inviteLink(inviteId),
    createdAt:serverTs()
  };

  return relationshipRef(relationshipId).set(relationshipPayload,{merge:true}).then(function(){
    return inviteRef(inviteId).set(invitePayload,{merge:true});
  }).then(function(){
    return Promise.all([
      phoneLinkRef(currentPhone).set(phoneLinkPayload(currentPhone,relationshipId,inviteId,"pending",partnerPhone),{merge:true}),
      phoneLinkRef(partnerPhone).set(phoneLinkPayload(partnerPhone,relationshipId,inviteId,"pending",currentPhone),{merge:true}),
      ensureCurrentUserSeed({name:name,relationshipId:relationshipId})
    ]);
  }).then(function(){
    currentRelationshipId=relationshipId;
    relationshipData=relationshipPayload;
    return {id:inviteId,data:invitePayload};
  });
}

function isBlockedLink(link){
  if(!link)return false;
  var status=link.data.status||"active";
  return status!=="rejected"&&status!=="cancelled"&&status!=="declined";
}

createRelationship=function(){
  var name=document.getElementById("user-name").value.trim();
  var partnerPhone="+91"+document.getElementById("partner-phone").value.trim();
  var relationshipStart=document.getElementById("relationship-start").value;
  var targetDate=document.getElementById("target-date").value;
  if(!name||!partnerPhone||partnerPhone.length<13||!relationshipStart||!targetDate){
    showError("Fill all fields");
    return;
  }
  if(partnerPhone===currentPhone){
    showError("Cannot add yourself!");
    return;
  }
  document.getElementById("setup-btn-text").innerHTML='<span class="loading"></span>';
  auth.currentUser.updateProfile({displayName:name}).then(function(){
    return ensureCurrentUserSeed({name:name});
  }).then(function(){
    return Promise.all([getPhoneLink(currentPhone),getPhoneLink(partnerPhone)]);
  }).then(function(results){
    var ownLink=results[0];
    var partnerLink=results[1];
    if(isBlockedLink(ownLink))throw new Error("Your number is already linked to an active or pending relationship.");
    if(isBlockedLink(partnerLink))throw new Error("That partner number is already linked with someone. Loyalty check failed.");
    return createRelationshipBundle(name,partnerPhone,relationshipStart,targetDate);
  }).then(function(invite){
    waitingUi(invite);
    showSuccess("Invite created. Share the invite link with your partner, then they can verify with Firebase OTP and accept.");
  }).catch(function(error){
    showError(error.message||"Unable to create relationship invite.");
    resetSetupButton();
  });
};

function loadFromPhoneLink(link){
  if(!link){
    showAuthSection("setup-step");
    return Promise.resolve();
  }
  return getRelationship(link.data.relationshipId).then(function(rel){
    if(rel)return handleRelationshipDoc(rel);
    return ensureCurrentUserSeed({relationshipId:firebase.firestore.FieldValue.delete()}).then(function(){
      showAuthSection("setup-step");
    });
  });
}

loadUserData=function(user){
  currentPhone=user.phoneNumber;
  ensureCurrentUserSeed().then(function(){
    return userRef(user.uid).get();
  }).then(function(doc){
    var data=doc.exists?(doc.data()||{}):{};
    var requestedInvite=queryInviteId();
    if(data.relationshipId){
      return getRelationship(data.relationshipId).then(function(rel){
        if(rel)return handleRelationshipDoc(rel);
        return ensureCurrentUserSeed({relationshipId:firebase.firestore.FieldValue.delete()}).then(function(){
          return getPhoneLink(user.phoneNumber).then(loadFromPhoneLink);
        });
      });
    }
    if(requestedInvite){
      return getInvite(requestedInvite).then(function(invite){
        if(invite&&invite.data.status==="pending"&&invite.data.partnerPhone===user.phoneNumber){
          inviteState.pendingInvite=invite;
          clearInviteQuery();
          incomingUi(invite);
          return;
        }
        return getPhoneLink(user.phoneNumber).then(loadFromPhoneLink);
      });
    }
    return getPhoneLink(user.phoneNumber).then(loadFromPhoneLink);
  }).catch(function(error){
    console.error("Load err:",error);
    showAuthSection("setup-step");
  });
};

window.acceptInviteFlow=function(){
  var invite=inviteState.pendingInvite;
  if(!invite||!currentUser){
    showError("No pending invite found.");
    return;
  }
  if(invite.data.partnerPhone!==currentPhone){
    showError("This invite belongs to a different phone number.");
    return;
  }
  getRelationship(invite.data.relationshipId).then(function(rel){
    if(!rel)throw new Error("Relationship invite no longer exists.");
    if((rel.data.status||"pending")!=="pending")throw new Error("This invite is no longer available.");
    var memberNames=rel.data.memberNames||{};
    memberNames[currentPhone]=currentUser.displayName||currentPhone;
    return relationshipRef(rel.id).set({
      status:"active",
      memberNames:memberNames,
      acceptedAt:serverTs(),
      updatedAt:serverTs()
    },{merge:true}).then(function(){
      return inviteRef(invite.id).set({
        status:"accepted",
        acceptedAt:serverTs()
      },{merge:true});
    }).then(function(){
      return Promise.all([
        phoneLinkRef(rel.data.inviterPhone).set(phoneLinkPayload(rel.data.inviterPhone,rel.id,invite.id,"active",rel.data.partnerPhone),{merge:true}),
        phoneLinkRef(rel.data.partnerPhone).set(phoneLinkPayload(rel.data.partnerPhone,rel.id,invite.id,"active",rel.data.inviterPhone),{merge:true}),
        ensureCurrentUserSeed({name:currentUser.displayName||"",relationshipId:rel.id})
      ]);
    }).then(function(){
      currentRelationshipId=rel.id;
      return loadRelationshipByIdPatched(rel.id);
    });
  }).catch(function(error){
    showError(error.message||"Could not accept invite.");
  });
};

window.declineInviteFlow=function(){
  var invite=inviteState.pendingInvite;
  if(!invite){
    showError("No invite to decline.");
    return;
  }
  getRelationship(invite.data.relationshipId).then(function(rel){
    if(!rel)throw new Error("Relationship invite no longer exists.");
    return Promise.all([
      relationshipRef(rel.id).set({status:"rejected",updatedAt:serverTs()},{merge:true}),
      inviteRef(invite.id).set({status:"rejected",rejectedAt:serverTs()},{merge:true}),
      phoneLinkRef(rel.data.inviterPhone).set(phoneLinkPayload(rel.data.inviterPhone,rel.id,invite.id,"rejected",rel.data.partnerPhone),{merge:true}),
      phoneLinkRef(rel.data.partnerPhone).set(phoneLinkPayload(rel.data.partnerPhone,rel.id,invite.id,"rejected",rel.data.inviterPhone),{merge:true}),
      ensureCurrentUserSeed({relationshipId:firebase.firestore.FieldValue.delete()})
    ]);
  }).then(function(){
    showSuccess("Invite declined.");
    showAuthSection("setup-step");
  }).catch(function(error){
    showError(error.message||"Could not decline invite.");
  });
};

ensureFlowCards();
})();
