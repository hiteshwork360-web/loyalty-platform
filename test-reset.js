(function(){
var ALLOWED_PHONE="+919342253569";
var BUTTON_ID="test-reset-relationship-btn";
var WAITING_BUTTON_ID="test-reset-waiting-btn";

function isAllowed(){
  return typeof currentPhone!=="undefined" && currentPhone===ALLOWED_PHONE;
}

function showMessage(kind,message){
  if(kind==="error" && typeof showError==="function"){showError(message);return;}
  if(kind==="success" && typeof showSuccess==="function"){showSuccess(message);return;}
  window.alert(message);
}

function currentRelationshipDocId(){
  if(typeof currentRelationshipId!=="undefined" && currentRelationshipId)return currentRelationshipId;
  if(typeof relationshipData!=="undefined" && relationshipData && relationshipData.id)return relationshipData.id;
  return null;
}

function userDocRef(){
  return db.collection("users").doc(auth.currentUser.uid);
}

function relationshipDocRef(id){
  return db.collection("relationships").doc(id);
}

function inviteDocRef(id){
  return db.collection("invites").doc(id);
}

function phoneLinkDocRef(phone){
  return db.collection("phoneLinks").doc(phone);
}

function buttonMarkup(id,label){
  return '<button id="'+id+'" class="btn btn-outline" style="margin-top:12px;border-color:var(--coral);color:var(--coral);">'+label+'</button>';
}

function attachClick(id){
  var btn=document.getElementById(id);
  if(!btn || btn.dataset.bound==="1")return;
  btn.dataset.bound="1";
  btn.addEventListener("click",function(event){
    event.preventDefault();
    window.resetTestRelationship();
  });
}

function ensureWaitingButton(){
  if(!isAllowed())return;
  var wait=document.getElementById("invite-wait-step");
  if(!wait || wait.classList.contains("hidden"))return;
  if(!document.getElementById(WAITING_BUTTON_ID)){
    wait.insertAdjacentHTML("beforeend",buttonMarkup(WAITING_BUTTON_ID,"Delete Current Test Relationship"));
  }
  attachClick(WAITING_BUTTON_ID);
}

function ensureDropdownButton(){
  if(!isAllowed())return;
  var dropdown=document.getElementById("profile-dropdown");
  if(!dropdown)return;
  if(!document.getElementById(BUTTON_ID)){
    var item=document.createElement("div");
    item.id=BUTTON_ID;
    item.className="profile-dropdown-item";
    item.style.color="var(--coral)";
    item.textContent="Delete Current Test Relationship";
    dropdown.insertBefore(item,dropdown.lastElementChild);
  }
  attachClick(BUTTON_ID);
}

function refreshButtons(){
  ensureWaitingButton();
  ensureDropdownButton();
}

window.resetTestRelationship=function(){
  if(!auth.currentUser || !isAllowed()){
    showMessage("error","This reset is enabled only for your test number.");
    return;
  }
  if(!window.confirm("Delete the current test relationship for "+ALLOWED_PHONE+"? This is only for testing and can be recreated later.")){
    return;
  }

  var relationshipId=currentRelationshipDocId();
  if(!relationshipId){
    userDocRef().set({relationshipId:firebase.firestore.FieldValue.delete()},{merge:true}).then(function(){
      showMessage("success","No active relationship was linked. Setup is ready again.");
      window.location.reload();
    }).catch(function(error){
      showMessage("error",error.message||"Could not reset your test account.");
    });
    return;
  }

  relationshipDocRef(relationshipId).get().then(function(doc){
    var batch=db.batch();
    var rel=doc.exists?(doc.data()||{}):{};
    var partnerPhone=rel.partnerPhone || ((rel.members||[]).filter(function(phone){return phone!==ALLOWED_PHONE;})[0]) || null;
    var inviteId=rel.inviteId || null;

    if(doc.exists){
      batch.set(relationshipDocRef(relationshipId),{
        status:"cancelled",
        cancelledForTesting:true,
        cancelledAt:firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true});
    }

    if(inviteId){
      batch.set(inviteDocRef(inviteId),{
        status:"cancelled",
        cancelledAt:firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true});
    }

    batch.set(phoneLinkDocRef(ALLOWED_PHONE),{
      phone:ALLOWED_PHONE,
      relationshipId:relationshipId,
      inviteId:inviteId,
      partnerPhone:partnerPhone,
      status:"cancelled",
      updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});

    if(partnerPhone){
      batch.set(phoneLinkDocRef(partnerPhone),{
        phone:partnerPhone,
        relationshipId:relationshipId,
        inviteId:inviteId,
        partnerPhone:ALLOWED_PHONE,
        status:"cancelled",
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true});
    }

    batch.set(userDocRef(),{
      relationshipId:firebase.firestore.FieldValue.delete(),
      lastSeenAt:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});

    return batch.commit();
  }).then(function(){
    showMessage("success","Current test relationship cleared. Reloading setup...");
    setTimeout(function(){
      window.location.reload();
    },500);
  }).catch(function(error){
    console.error("Test reset failed:",error);
    showMessage("error",error.message||"Could not delete the current test relationship.");
  });
};

document.addEventListener("click",function(){
  setTimeout(refreshButtons,0);
});

var observer=new MutationObserver(refreshButtons);
observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
window.addEventListener("load",refreshButtons);
setInterval(refreshButtons,1000);
})();
