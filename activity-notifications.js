(function(){
var activityState={
  relationshipId:null,
  unsubscribe:null,
  initialized:false,
  activities:[]
};

function activityRef(id){
  return db.collection("relationships").doc(id).collection("activities");
}

function actorName(){
  if(typeof relationshipData!=="undefined" && relationshipData && relationshipData.memberNames && currentPhone && relationshipData.memberNames[currentPhone]){
    return relationshipData.memberNames[currentPhone];
  }
  if(auth.currentUser && auth.currentUser.displayName)return auth.currentUser.displayName;
  return "Your love";
}

function partnerName(phone){
  if(typeof relationshipData!=="undefined" && relationshipData && relationshipData.memberNames && phone && relationshipData.memberNames[phone]){
    return relationshipData.memberNames[phone];
  }
  return "Your partner";
}

function ensureActivityUi(){
  var nav=document.querySelector(".nav-tabs");
  var dashboard=document.querySelector(".dashboard");
  if(!nav || !dashboard)return;

  if(!document.getElementById("activity-toast-host")){
    var host=document.createElement("div");
    host.id="activity-toast-host";
    host.style.position="fixed";
    host.style.top="18px";
    host.style.right="18px";
    host.style.zIndex="1200";
    host.style.display="flex";
    host.style.flexDirection="column";
    host.style.gap="10px";
    host.style.maxWidth="320px";
    document.body.appendChild(host);
  }

  if(!document.getElementById("activity-nav-tab")){
    var tab=document.createElement("div");
    tab.id="activity-nav-tab";
    tab.className="nav-tab";
    tab.textContent="💬 Activity";
    tab.setAttribute("onclick","switchTab('activity')");
    nav.appendChild(tab);
  }

  if(!document.getElementById("panel-activity")){
    var panel=document.createElement("div");
    panel.id="panel-activity";
    panel.className="section-panel";
    panel.innerHTML='<div class="card"><div class="card-title">💬 Love Activity</div><div id="activity-list"></div><div id="activity-empty" class="empty-state"><div class="empty-state-icon">💞</div><div class="empty-state-text">Every sweet little update between you two will appear here.</div></div></div>';
    dashboard.appendChild(panel);
  }
}

function formatActivityTime(value){
  if(!value)return "Just now";
  var date=value.toDate?value.toDate():new Date(value);
  return date.toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});
}

function renderActivities(){
  ensureActivityUi();
  var list=document.getElementById("activity-list");
  var empty=document.getElementById("activity-empty");
  if(!list || !empty)return;
  if(!activityState.activities.length){
    list.innerHTML="";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  list.innerHTML=activityState.activities.map(function(entry){
    var actor=entry.actorName||partnerName(entry.actorPhone);
    return '<div class="list-item"><div class="list-item-content"><div class="list-item-text">'+entry.icon+' '+escapeHtml(actor)+" "+escapeHtml(entry.message)+'</div><div class="list-item-meta">'+escapeHtml(formatActivityTime(entry.createdAt))+"</div></div></div>";
  }).join("");
}

function showPartnerToast(entry){
  if(entry.actorPhone===currentPhone)return;
  ensureActivityUi();
  var host=document.getElementById("activity-toast-host");
  if(!host)return;
  var card=document.createElement("div");
  card.style.background="linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,240,250,0.96))";
  card.style.border="2px solid rgba(255,182,213,0.65)";
  card.style.borderRadius="20px";
  card.style.padding="14px 16px";
  card.style.boxShadow="0 16px 36px rgba(255,105,180,0.2)";
  card.style.color="var(--text-cute)";
  card.style.backdropFilter="blur(10px)";
  card.style.transform="translateY(-10px)";
  card.style.opacity="0";
  card.style.transition="all 0.35s ease";
  card.innerHTML='<div style="font-weight:700;color:var(--deep-rose);margin-bottom:4px;">'+entry.icon+" "+escapeHtml(partnerName(entry.actorPhone))+' sent a little update</div><div style="font-size:0.92rem;line-height:1.5;">'+escapeHtml(entry.message)+'</div>';
  host.appendChild(card);
  requestAnimationFrame(function(){
    card.style.transform="translateY(0)";
    card.style.opacity="1";
  });
  setTimeout(function(){
    card.style.transform="translateY(-8px)";
    card.style.opacity="0";
    setTimeout(function(){
      if(card.parentNode)card.parentNode.removeChild(card);
    },350);
  },4200);
}

function logActivity(payload){
  if(!currentRelationshipId || !currentPhone || !payload || !payload.message)return;
  activityRef(currentRelationshipId).add({
    actorPhone:currentPhone,
    actorName:actorName(),
    icon:payload.icon||"💞",
    message:payload.message,
    createdAt:firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(error){
    console.error("Activity log err:",error);
  });
}

function bindActivityStream(){
  ensureActivityUi();
  if(!currentRelationshipId){
    if(activityState.unsubscribe){
      activityState.unsubscribe();
      activityState.unsubscribe=null;
    }
    activityState.relationshipId=null;
    activityState.activities=[];
    activityState.initialized=false;
    renderActivities();
    return;
  }
  if(activityState.relationshipId===currentRelationshipId)return;
  if(activityState.unsubscribe)activityState.unsubscribe();
  activityState.relationshipId=currentRelationshipId;
  activityState.initialized=false;
  activityState.activities=[];
  activityState.unsubscribe=activityRef(currentRelationshipId).orderBy("createdAt","desc").limit(40).onSnapshot(function(snapshot){
    activityState.activities=snapshot.docs.map(function(doc){
      var data=doc.data()||{};
      data.id=doc.id;
      return data;
    });
    renderActivities();
    if(activityState.initialized){
      snapshot.docChanges().forEach(function(change){
        if(change.type!=="added")return;
        var data=change.doc.data()||{};
        showPartnerToast(data);
      });
    }else{
      activityState.initialized=true;
    }
  },function(error){
    console.error("Activity realtime err:",error);
  });
}

function wrapAction(name, describe){
  var original=window[name];
  if(typeof original!=="function" || original.__activityWrapped)return;
  var wrapped=function(){
    var payload=describe ? describe.apply(this,arguments) : null;
    var result=original.apply(this,arguments);
    if(payload && payload.message){
      setTimeout(function(){logActivity(payload);},0);
    }
    return result;
  };
  wrapped.__activityWrapped=true;
  window[name]=wrapped;
}

function setupActionLogging(){
  wrapAction("saveCalendarEvent",function(){
    var title=(document.getElementById("event-title")||{}).value||"a sweet plan";
    return {icon:"📅",message:"added "+title.trim()+" to your love calendar."};
  });
  wrapAction("deleteCalendarEventById",function(id){
    var item=(appData.calendarEvents||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"📅",message:"removed "+item.title+" from the calendar."}:null;
  });
  wrapAction("addBucketItem",function(){
    var text=(document.getElementById("bucket-input")||{}).value||"a new bucket list dream";
    return text.trim()?{icon:"✨",message:"added "+text.trim()+" to your bucket list."}:null;
  });
  wrapAction("toggleBucket",function(index){
    var item=appData.bucketList&&appData.bucketList[index];
    if(!item)return null;
    return {icon:"✨",message:(item.done?"reopened ":"completed ")+item.text+" on your bucket list."};
  });
  wrapAction("deleteBucketById",function(id){
    var item=(appData.bucketList||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"✨",message:"removed "+item.text+" from your bucket list."}:null;
  });
  wrapAction("addTravelDest",function(){
    var text=(document.getElementById("travel-dest-input")||{}).value||"a dreamy trip";
    return text.trim()?{icon:"✈️",message:"added "+text.trim()+" to your travel dreams."}:null;
  });
  wrapAction("toggleTravel",function(index){
    var item=appData.travelList&&appData.travelList[index];
    if(!item)return null;
    return {icon:"✈️",message:(item.visited?"unchecked ":"marked ")+item.destination+(item.visited?" as not visited yet.":" as visited together.")};
  });
  wrapAction("deleteTravelById",function(id){
    var item=(appData.travelList||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"✈️",message:"removed "+item.destination+" from your travel list."}:null;
  });
  wrapAction("addBabyName",function(){
    var text=(document.getElementById("baby-name-input")||{}).value||"a baby name";
    return text.trim()?{icon:"🍼",message:"added the baby name "+text.trim()+"."}:null;
  });
  wrapAction("heartBabyName",function(index){
    var item=appData.babyNames&&appData.babyNames[index];
    if(!item)return null;
    return {icon:"🍼",message:(item.hearted?"removed a heart from ":"hearted ")+item.name+"."};
  });
  wrapAction("deleteBabyNameById",function(id){
    var item=(appData.babyNames||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"🍼",message:"removed the baby name "+item.name+"."}:null;
  });
  wrapAction("saveLoveNote",function(){
    var text=(document.getElementById("note-text")||{}).value||"a love note";
    var preview=text.trim().slice(0,36);
    return preview?{icon:"💌",message:"left a sweet note: \""+preview+(text.trim().length>36?"...":"")+"\""}:null;
  });
  wrapAction("deleteLoveNoteById",function(id){
    var item=(appData.loveNotes||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"💌",message:"removed a love note."}:null;
  });
  wrapAction("saveMemory",function(){
    var title=(document.getElementById("memory-title")||{}).value||"a memory";
    return title.trim()?{icon:"📸",message:"saved a new memory: "+title.trim()+"."}:null;
  });
  wrapAction("deleteMemoryById",function(id){
    var item=(appData.memories||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"📸",message:"removed the memory "+item.title+"."}:null;
  });
  wrapAction("saveCustomDateIdea",function(){
    var text=(document.getElementById("custom-date-text")||{}).value||"a date idea";
    return text.trim()?{icon:"🌙",message:"added a date idea: "+text.trim()+"."}:null;
  });
  wrapAction("saveFavorite",function(key,value){
    if(!value || !value.trim())return null;
    var labels={
      song:"your song",
      movie:"your movie",
      restaurant:"your restaurant",
      place:"your place",
      show:"your show",
      food:"your food",
      memory:"a favorite memory",
      nickname:"a nickname",
      inside_joke:"an inside joke",
      dream:"a shared dream",
      color:"your color",
      season:"your season"
    };
    return {icon:"💖",message:"updated "+(labels[key]||"a favorite")+" to "+value.trim()+"."};
  });
  wrapAction("saveIntimateEntry",function(){
    return {icon:"🔥",message:"added a private journal entry for you two."};
  });
  wrapAction("deleteIntimateEntryById",function(id){
    var item=(appData.intimateEntries||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"🔥",message:"removed a private journal entry."}:null;
  });
  wrapAction("addIntimateWishlist",function(){
    var text=(document.getElementById("intimate-wish-input")||{}).value||"a private wish";
    return text.trim()?{icon:"💞",message:"added a new together wish: "+text.trim()+"."}:null;
  });
  wrapAction("toggleIntimateWishlist",function(index){
    var item=appData.intimateWishlist&&appData.intimateWishlist[index];
    if(!item)return null;
    return {icon:"💞",message:(item.tried?"unchecked ":"marked ")+"the wish \""+item.text+"\""+(item.tried?" as not tried yet.":" as tried together.")};
  });
  wrapAction("deleteIntimateWishlistById",function(id){
    var item=(appData.intimateWishlist||[]).find(function(entry){return entry.id===id;});
    return item?{icon:"💞",message:"removed the together wish \""+item.text+"\"."}:null;
  });
  wrapAction("saveNewTargetDate",function(){
    var value=(document.getElementById("edit-target-date")||{}).value||"your special date";
    return value?{icon:"⏳",message:"updated your special date to "+value+"."}:null;
  });
}

function bootActivityLayer(){
  ensureActivityUi();
  setupActionLogging();
  bindActivityStream();
}

setInterval(bootActivityLayer,1000);
window.addEventListener("load",bootActivityLayer);
})();
