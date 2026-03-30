(function(){
var chatState={
  relationshipId:null,
  unsubscribe:null,
  messages:[],
  uploadTask:null,
  uploadProgress:0
};

function messagesRef(id){
  return db.collection("relationships").doc(id).collection("messages");
}

function ensureChatStyles(){
  if(document.getElementById("chat-feature-styles"))return;
  var style=document.createElement("style");
  style.id="chat-feature-styles";
  style.textContent=[
    ".chat-shell{display:flex;flex-direction:column;gap:18px;min-height:68vh}",
    ".chat-stream{background:linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,245,250,0.84));border:2px solid rgba(255,182,213,0.45);border-radius:28px;padding:20px;display:flex;flex-direction:column;gap:12px;overflow-y:auto;min-height:420px;max-height:62vh}",
    ".chat-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:260px;color:var(--purple-heart);text-align:center;gap:10px}",
    ".chat-empty-icon{font-size:2.6rem}",
    ".chat-row{display:flex}",
    ".chat-row.mine{justify-content:flex-end}",
    ".chat-row.theirs{justify-content:flex-start}",
    ".chat-bubble{max-width:min(78%,380px);padding:14px 16px;border-radius:22px;box-shadow:0 10px 24px rgba(255,105,180,0.12);position:relative}",
    ".chat-row.mine .chat-bubble{background:linear-gradient(135deg,var(--deep-rose),var(--purple-heart));color:white;border-bottom-right-radius:8px}",
    ".chat-row.theirs .chat-bubble{background:linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,240,250,0.96));border:2px solid rgba(255,182,213,0.45);color:var(--text-cute);border-bottom-left-radius:8px}",
    ".chat-author{font-size:0.74rem;font-weight:700;opacity:0.9;margin-bottom:6px}",
    ".chat-text{font-size:0.96rem;line-height:1.55;white-space:pre-wrap;word-break:break-word}",
    ".chat-meta{margin-top:8px;font-size:0.72rem;opacity:0.75}",
    ".chat-image{width:100%;border-radius:18px;display:block;cursor:pointer;background:rgba(255,255,255,0.22)}",
    ".chat-composer{background:var(--card-bg);backdrop-filter:blur(14px);border:2px solid var(--card-border);border-radius:26px;padding:18px;display:flex;flex-direction:column;gap:14px}",
    ".chat-actions{display:flex;gap:10px;flex-wrap:wrap}",
    ".chat-actions .btn{width:auto;margin-top:0;padding:14px 18px;font-size:0.95rem}",
    ".chat-message-input{min-height:96px}",
    ".chat-preview{display:none;background:linear-gradient(135deg,rgba(255,214,232,0.35),rgba(230,213,247,0.35));border:2px dashed rgba(255,105,180,0.28);border-radius:20px;padding:14px;gap:14px;align-items:center}",
    ".chat-preview.active{display:flex}",
    ".chat-preview-thumb{width:88px;height:88px;border-radius:18px;object-fit:cover;box-shadow:0 8px 20px rgba(255,105,180,0.16)}",
    ".chat-preview-meta{flex:1;min-width:0}",
    ".chat-progress{height:10px;border-radius:999px;background:rgba(255,255,255,0.65);overflow:hidden;margin-top:10px}",
    ".chat-progress-fill{height:100%;width:0;background:linear-gradient(135deg,var(--deep-rose),var(--purple-heart));transition:width 0.2s ease}",
    ".chat-upload-note{font-size:0.8rem;color:var(--purple-heart);margin-top:6px}",
    ".chat-hint{font-size:0.82rem;color:var(--purple-heart);line-height:1.5}",
    "@media(max-width:768px){.chat-shell{min-height:0}.chat-stream{padding:14px;min-height:360px;max-height:54vh}.chat-bubble{max-width:88%}.chat-actions{display:grid;grid-template-columns:1fr 1fr}.chat-actions .btn{width:100%}}"
  ].join("");
  document.head.appendChild(style);
}

function ensureChatUi(){
  ensureChatStyles();
  var nav=document.querySelector(".nav-tabs");
  var dashboard=document.querySelector(".dashboard");
  if(!nav || !dashboard)return;

  if(!document.getElementById("chat-nav-tab")){
    var tab=document.createElement("div");
    tab.id="chat-nav-tab";
    tab.className="nav-tab";
    tab.textContent="\uD83D\uDCAC Chat";
    tab.setAttribute("onclick","switchTab('chat')");
    nav.appendChild(tab);
  }

  if(!document.getElementById("panel-chat")){
    var panel=document.createElement("div");
    panel.id="panel-chat";
    panel.className="section-panel";
    panel.innerHTML=
      '<div class="card">'+
        '<div class="card-title">\uD83D\uDCAC Love Chat</div>'+
        '<div class="chat-shell">'+
          '<div class="chat-stream" id="chat-stream"></div>'+
          '<div class="chat-composer">'+
            '<div class="chat-preview" id="chat-preview">'+
              '<img id="chat-preview-thumb" class="chat-preview-thumb" alt="Photo preview">'+
              '<div class="chat-preview-meta">'+
                '<div style="font-weight:700;color:var(--deep-rose);margin-bottom:4px;">Ready to send this sweet snap</div>'+
                '<div id="chat-preview-name" class="chat-hint"></div>'+
                '<div id="chat-progress" class="chat-progress hidden"><div id="chat-progress-fill" class="chat-progress-fill"></div></div>'+
                '<div id="chat-upload-note" class="chat-upload-note"></div>'+
              '</div>'+
              '<button class="btn btn-small btn-outline" type="button" onclick="clearChatImage()">Clear</button>'+
            '</div>'+
            '<textarea id="chat-message-input" class="chat-message-input" placeholder="Write something sweet..."></textarea>'+
            '<div class="chat-actions">'+
              '<button class="btn btn-outline" type="button" onclick="openChatGallery()">Gallery Photo</button>'+
              '<button class="btn btn-outline" type="button" onclick="openChatCamera()">Camera Photo</button>'+
              '<button class="btn" type="button" onclick="sendChatMessage()">Send Message</button>'+
            '</div>'+
            '<div class="chat-hint">Messages sync instantly for both of you. Photos upload safely before they appear, so your chat never shows a broken image.</div>'+
          '</div>'+
        '</div>'+
        '<input type="file" id="chat-gallery-input" accept="image/*" class="hidden">'+
        '<input type="file" id="chat-camera-input" accept="image/*" capture="environment" class="hidden">'+
      '</div>';
    dashboard.appendChild(panel);
  }
}

function escapeSafe(value){
  if(typeof escapeHtml==="function")return escapeHtml(value);
  return String(value==null?"":value)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}

function currentUserName(){
  if(typeof relationshipData!=="undefined" && relationshipData && relationshipData.memberNames && currentPhone && relationshipData.memberNames[currentPhone]){
    return relationshipData.memberNames[currentPhone];
  }
  if(auth.currentUser && auth.currentUser.displayName)return auth.currentUser.displayName;
  return "You";
}

function formatStamp(message){
  var source=message.createdAt||message.clientCreatedAt||Date.now();
  var date=source.toDate?source.toDate():new Date(source);
  return date.toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});
}

function getPendingImage(){
  return window.__chatPendingImage||null;
}

function setPendingImage(next){
  window.__chatPendingImage=next||null;
  renderPendingImage();
}

function renderPendingImage(){
  var preview=document.getElementById("chat-preview");
  var thumb=document.getElementById("chat-preview-thumb");
  var name=document.getElementById("chat-preview-name");
  var progress=document.getElementById("chat-progress");
  var fill=document.getElementById("chat-progress-fill");
  var note=document.getElementById("chat-upload-note");
  if(!preview || !thumb || !name || !progress || !fill || !note)return;
  var pending=getPendingImage();
  if(!pending){
    preview.classList.remove("active");
    thumb.removeAttribute("src");
    name.textContent="";
    note.textContent="";
    progress.classList.add("hidden");
    fill.style.width="0%";
    return;
  }
  preview.classList.add("active");
  thumb.src=pending.previewUrl;
  name.textContent=pending.file.name+" • "+Math.max(1,Math.round(pending.file.size/1024))+" KB";
  note.textContent=chatState.uploadTask?"Uploading your photo...":"";
  if(chatState.uploadTask){
    progress.classList.remove("hidden");
    fill.style.width=Math.min(100,Math.max(0,chatState.uploadProgress))+"%";
  }else{
    progress.classList.add("hidden");
    fill.style.width="0%";
  }
}

function clearPendingImageObject(){
  var pending=getPendingImage();
  if(pending && pending.previewUrl)URL.revokeObjectURL(pending.previewUrl);
  window.__chatPendingImage=null;
}

window.clearChatImage=function(){
  if(chatState.uploadTask)return;
  clearPendingImageObject();
  renderPendingImage();
  var gallery=document.getElementById("chat-gallery-input");
  var camera=document.getElementById("chat-camera-input");
  if(gallery)gallery.value="";
  if(camera)camera.value="";
};

window.openChatGallery=function(){
  var input=document.getElementById("chat-gallery-input");
  if(input)input.click();
};

window.openChatCamera=function(){
  var input=document.getElementById("chat-camera-input");
  if(input)input.click();
};

function bindPickerInputs(){
  var gallery=document.getElementById("chat-gallery-input");
  var camera=document.getElementById("chat-camera-input");
  if(gallery && !gallery.dataset.bound){
    gallery.dataset.bound="1";
    gallery.addEventListener("change",function(event){
      handlePickedImage(event.target.files && event.target.files[0]);
    });
  }
  if(camera && !camera.dataset.bound){
    camera.dataset.bound="1";
    camera.addEventListener("change",function(event){
      handlePickedImage(event.target.files && event.target.files[0]);
    });
  }
}

function handlePickedImage(file){
  if(!file)return;
  if(!/^image\//.test(file.type)){
    if(typeof showError==="function")showError("Only image files can be shared here.");
    return;
  }
  if(file.size>10*1024*1024){
    if(typeof showError==="function")showError("Please choose an image smaller than 10 MB.");
    return;
  }
  clearPendingImageObject();
  setPendingImage({
    file:file,
    previewUrl:URL.createObjectURL(file)
  });
}

function renderChatMessages(){
  ensureChatUi();
  bindPickerInputs();
  var stream=document.getElementById("chat-stream");
  if(!stream)return;
  if(!chatState.messages.length){
    stream.innerHTML='<div class="chat-empty"><div class="chat-empty-icon">\uD83D\uDC9E</div><div class="empty-state-text">Your private couple chat is ready. Say hi or share a sweet photo.</div></div>';
    return;
  }
  stream.innerHTML=chatState.messages.map(function(message){
    var mine=message.senderPhone===currentPhone;
    var body='';
    if(message.type==="image" && message.imageUrl){
      body+='<img class="chat-image" src="'+escapeSafe(message.imageUrl)+'" alt="Shared photo" onclick="openChatImage(\''+escapeSafe(message.imageUrl)+'\')">';
      if(message.text)body+='<div class="chat-text" style="margin-top:10px;">'+escapeSafe(message.text)+'</div>';
    }else{
      body+='<div class="chat-text">'+escapeSafe(message.text||"")+'</div>';
    }
    return '<div class="chat-row '+(mine?'mine':'theirs')+'"><div class="chat-bubble"><div class="chat-author">'+escapeSafe(message.senderName||"Love")+'</div>'+body+'<div class="chat-meta">'+escapeSafe(formatStamp(message))+'</div></div></div>';
  }).join("");
  stream.scrollTop=stream.scrollHeight;
}

window.openChatImage=function(url){
  if(typeof openModalWith!=="function")return;
  openModalWith("Shared Photo",'<img src="'+escapeSafe(url)+'" alt="Shared photo" style="width:100%;border-radius:22px;display:block;">');
};

function compressImage(file){
  return new Promise(function(resolve,reject){
    var reader=new FileReader();
    reader.onload=function(event){
      var img=new Image();
      img.onload=function(){
        var maxSide=1600;
        var width=img.width;
        var height=img.height;
        if(width>height && width>maxSide){
          height=Math.round(height*(maxSide/width));
          width=maxSide;
        }else if(height>=width && height>maxSide){
          width=Math.round(width*(maxSide/height));
          height=maxSide;
        }
        var canvas=document.createElement("canvas");
        canvas.width=width;
        canvas.height=height;
        var ctx=canvas.getContext("2d");
        ctx.drawImage(img,0,0,width,height);
        canvas.toBlob(function(blob){
          if(!blob){
            reject(new Error("Image compression failed."));
            return;
          }
          resolve(blob);
        },"image/jpeg",0.82);
      };
      img.onerror=function(){reject(new Error("Could not read that image."));};
      img.src=event.target.result;
    };
    reader.onerror=function(){reject(new Error("Could not open that image."));};
    reader.readAsDataURL(file);
  });
}

function safeFileName(name){
  return name.replace(/[^a-zA-Z0-9._-]/g,"_");
}

function uploadChatImage(relationshipId,messageId,file){
  return compressImage(file).then(function(blob){
    var path="relationships/"+relationshipId+"/messages/"+messageId+"/"+Date.now()+"_"+safeFileName(file.name||"photo.jpg");
    var ref=storage.ref().child(path);
    chatState.uploadProgress=0;
    chatState.uploadTask=ref.put(blob,{contentType:"image/jpeg"});
    renderPendingImage();
    return new Promise(function(resolve,reject){
      chatState.uploadTask.on("state_changed",function(snapshot){
        if(snapshot.totalBytes){
          chatState.uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          renderPendingImage();
        }
      },function(error){
        chatState.uploadTask=null;
        chatState.uploadProgress=0;
        renderPendingImage();
        reject(error);
      },function(){
        ref.getDownloadURL().then(function(url){
          chatState.uploadTask=null;
          chatState.uploadProgress=0;
          renderPendingImage();
          resolve({url:url,ref:ref});
        }).catch(function(error){
          chatState.uploadTask=null;
          chatState.uploadProgress=0;
          renderPendingImage();
          reject(error);
        });
      });
    });
  });
}

function resetComposer(){
  var input=document.getElementById("chat-message-input");
  if(input)input.value="";
  clearPendingImageObject();
  renderPendingImage();
  var gallery=document.getElementById("chat-gallery-input");
  var camera=document.getElementById("chat-camera-input");
  if(gallery)gallery.value="";
  if(camera)camera.value="";
}

window.sendChatMessage=function(){
  if(!currentRelationshipId){
    if(typeof showError==="function")showError("Open your shared space first.");
    return;
  }
  if(chatState.uploadTask){
    if(typeof showError==="function")showError("Please wait for the current upload to finish.");
    return;
  }
  var input=document.getElementById("chat-message-input");
  var text=input?input.value.trim():"";
  var pending=getPendingImage();
  if(!text && !pending){
    if(typeof showError==="function")showError("Write a message or pick a photo first.");
    return;
  }
  var doc=messagesRef(currentRelationshipId).doc();
  var payload={
    id:doc.id,
    senderPhone:currentPhone,
    senderName:currentUserName(),
    clientCreatedAt:Date.now(),
    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
    type:pending?"image":"text",
    text:text||""
  };

  if(!pending){
    doc.set(payload).then(function(){
      resetComposer();
    }).catch(function(error){
      console.error("Send message err:",error);
      if(typeof showError==="function")showError(error.message||"Could not send that message.");
    });
    return;
  }

  uploadChatImage(currentRelationshipId,doc.id,pending.file).then(function(uploaded){
    payload.imageUrl=uploaded.url;
    payload.storagePath=uploaded.ref.fullPath;
    return doc.set(payload).catch(function(error){
      return uploaded.ref.delete().catch(function(){return null;}).then(function(){throw error;});
    });
  }).then(function(){
    resetComposer();
  }).catch(function(error){
    console.error("Send photo err:",error);
    if(typeof showError==="function")showError(error.message||"Could not share that photo.");
  });
};

function bindChatStream(){
  ensureChatUi();
  bindPickerInputs();
  if(!currentRelationshipId){
    if(chatState.unsubscribe){
      chatState.unsubscribe();
      chatState.unsubscribe=null;
    }
    chatState.relationshipId=null;
    chatState.messages=[];
    renderChatMessages();
    return;
  }
  if(chatState.relationshipId===currentRelationshipId)return;
  if(chatState.unsubscribe)chatState.unsubscribe();
  chatState.relationshipId=currentRelationshipId;
  chatState.messages=[];
  renderChatMessages();
  chatState.unsubscribe=messagesRef(currentRelationshipId)
    .orderBy("clientCreatedAt","asc")
    .limitToLast(60)
    .onSnapshot(function(snapshot){
      chatState.messages=snapshot.docs.map(function(doc){
        var data=doc.data()||{};
        data.id=doc.id;
        return data;
      });
      renderChatMessages();
    },function(error){
      console.error("Chat realtime err:",error);
      if(typeof showError==="function")showError("Chat needs the latest Firestore rules published.");
    });
}

function bootChatFeature(){
  ensureChatUi();
  bindPickerInputs();
  bindChatStream();
}

setInterval(bootChatFeature,1000);
window.addEventListener("load",bootChatFeature);
})();
