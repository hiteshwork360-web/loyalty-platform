(function(){
var STYLE_ID='ui-refresh-styles';
function addStyles(){
  if(document.getElementById(STYLE_ID))return;
  var style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
:root{
  --surface-strong:rgba(255,255,255,0.94);
  --surface-soft:rgba(255,247,251,0.86);
  --surface-border:rgba(255,182,213,0.38);
  --shadow-soft:0 18px 48px rgba(255,105,180,0.12);
  --shadow-card:0 10px 28px rgba(255,105,180,0.10);
  --text-main:#7b4b7a;
  --text-soft:#9a6b97;
}
body{
  font-size:15px;
  line-height:1.45;
  color:var(--text-main);
}
.auth-container{
  padding:18px;
}
.auth-card{
  max-width:430px;
  padding:32px 24px;
  border-radius:30px;
  box-shadow:0 22px 60px rgba(255,105,180,0.22);
}
.auth-title{
  font-size:3.2rem;
  line-height:0.92;
  margin-bottom:8px;
}
.auth-subtitle{
  font-size:1rem;
  margin-bottom:24px;
}
.loyalty-badge{
  padding:10px 18px;
  border-radius:999px;
  font-size:0.9rem;
  margin-bottom:20px;
}
.info-box{
  padding:16px 16px;
  border-radius:18px;
  margin-bottom:16px;
  background:linear-gradient(135deg,rgba(255,240,247,0.88),rgba(244,236,255,0.82));
  border:1px solid rgba(255,182,213,0.42);
}
.info-title{
  font-size:1rem;
  margin-bottom:6px;
}
.info-text{
  font-size:0.88rem;
  line-height:1.55;
}
.input-group{
  margin-bottom:16px;
}
.input-label{
  font-size:0.84rem;
  margin-bottom:6px;
}
input,textarea,select{
  padding:13px 16px;
  border-radius:16px;
  font-size:0.96rem;
  border-width:1.5px;
  background:rgba(255,255,255,0.96);
}
textarea{
  min-height:96px;
}
.phone-input{
  gap:8px;
}
.country-code{
  width:72px;
}
.btn{
  padding:14px 18px;
  border-radius:16px;
  font-size:0.98rem;
  box-shadow:0 10px 22px rgba(255,105,180,0.22);
}
.btn-small{
  padding:10px 16px;
  font-size:0.82rem;
  border-radius:14px;
}
.error-message,.success-message{
  padding:12px 15px;
  border-radius:14px;
  font-size:0.88rem;
}
.otp-inputs{
  gap:8px;
  margin:14px 0 18px;
}
.otp-input{
  width:44px;
  height:52px;
  border-radius:14px;
  font-size:1.25rem;
}
.dashboard{
  max-width:1160px;
  padding:16px 16px 90px;
}
.top-bar{
  padding:14px 18px;
  margin-bottom:18px;
  border-radius:22px;
  background:var(--surface-soft);
  border:1px solid var(--surface-border);
  box-shadow:var(--shadow-card);
}
.top-bar-left h1{
  font-size:1.9rem;
}
.top-bar-left p{
  font-size:1rem;
}
.user-avatar{
  width:42px;
  height:42px;
  font-size:1rem;
  box-shadow:0 8px 18px rgba(255,105,180,0.2);
}
.countdown-hero{
  padding:28px 20px;
  margin-bottom:18px;
  border-radius:28px;
  background:linear-gradient(135deg,rgba(255,248,252,0.86),rgba(246,240,255,0.82),rgba(255,252,242,0.72));
  border:1px solid var(--surface-border);
  box-shadow:var(--shadow-soft);
}
.countdown-label{
  font-size:1.28rem;
  margin-bottom:8px;
}
.countdown-date-display{
  font-size:0.98rem;
  margin-bottom:16px;
}
.countdown-boxes{
  gap:10px;
}
.countdown-box{
  min-width:78px;
  padding:14px 10px;
  border-radius:18px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(255,182,213,0.34);
}
.countdown-number{
  font-size:2.15rem;
}
.countdown-unit{
  font-size:0.68rem;
}
.countdown-together{
  margin-top:16px;
  font-size:1.05rem;
}
.us-stats-bar{
  gap:10px;
  margin-bottom:18px;
  grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
}
.stat-card{
  padding:14px 12px;
  border-radius:18px;
  border:1px solid var(--surface-border);
  background:var(--surface-soft);
  box-shadow:none;
}
.stat-card:hover{
  transform:translateY(-2px);
}
.stat-icon{
  font-size:1.35rem;
  margin-bottom:6px;
}
.stat-value{
  font-size:1.5rem;
}
.stat-label{
  font-size:0.66rem;
  letter-spacing:0.7px;
}
.nav-tabs{
  gap:8px;
  margin-bottom:18px;
  padding:4px 2px 8px;
}
.nav-tab{
  padding:9px 14px;
  border-radius:999px;
  font-size:0.78rem;
  border-width:1px;
  background:rgba(255,255,255,0.9);
  box-shadow:0 4px 10px rgba(255,105,180,0.06);
}
.nav-tab.active{
  box-shadow:0 8px 18px rgba(255,105,180,0.18);
}
.card{
  padding:20px 18px;
  border-radius:24px;
  border:1px solid var(--surface-border);
  background:var(--surface-soft);
  box-shadow:var(--shadow-card);
  margin-bottom:16px;
}
.card-title{
  font-size:1.5rem;
  margin-bottom:16px;
}
.add-row{
  gap:8px;
  margin-bottom:16px;
}
.add-row .btn{
  padding:13px 16px;
}
.list-item{
  gap:12px;
  padding:12px 14px;
  margin-bottom:8px;
  border-radius:16px;
  border:1px solid rgba(255,182,213,0.22);
  background:linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,244,249,0.78));
}
.list-item:hover{
  transform:none;
  box-shadow:none;
}
.list-item-check{
  width:24px;
  height:24px;
  border-width:2px;
}
.list-item-text{
  font-size:0.9rem;
  line-height:1.45;
}
.list-item-meta{
  font-size:0.74rem;
}
.icon-btn{
  width:32px;
  height:32px;
  font-size:0.82rem;
}
.tag{
  padding:3px 10px;
  border-radius:999px;
  font-size:0.68rem;
}
.calendar-grid{
  gap:4px;
}
.calendar-header{
  font-size:0.68rem;
  padding:5px 0;
}
.calendar-day{
  border-radius:12px;
  font-size:0.78rem;
}
.calendar-day.has-event::after{
  width:5px;
  height:5px;
}
.calendar-nav h3{
  font-size:1.18rem;
}
.calendar-nav button{
  width:34px;
  height:34px;
  font-size:1rem;
}
.note-card,.intimate-entry,.fav-card{
  border-radius:18px;
}
.note-card{
  padding:18px;
}
.note-text{
  font-size:1rem;
  line-height:1.65;
}
.timeline{
  padding-left:28px;
}
.timeline::before{
  left:10px;
}
.timeline-item::before{
  left:-24px;
  width:12px;
  height:12px;
}
.timeline-title{
  font-size:0.95rem;
}
.timeline-desc{
  font-size:0.8rem;
}
.date-generator{
  padding:10px 0 4px;
}
.date-idea-display{
  font-size:1.55rem;
  min-height:64px;
  margin:20px 0;
}
.category-chip{
  padding:7px 14px;
  font-size:0.74rem;
  border-radius:999px;
  border-width:1px;
}
.favorites-grid{
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:10px;
}
.fav-card{
  padding:16px;
}
.fav-icon{
  font-size:1.5rem;
}
.fav-label{
  font-size:0.72rem;
}
.fav-value-input{
  font-size:1.02rem;
}
.mood-grid{
  gap:8px;
}
.mood-option{
  font-size:1.5rem;
  padding:6px;
  border-radius:12px;
}
.name-section{
  margin-bottom:14px;
}
.name-section-title{
  font-size:1.12rem;
}
.name-item{
  padding:7px 12px;
  margin:3px;
  border-radius:16px;
  font-size:0.86rem;
}
.modal-overlay{
  padding:14px;
}
.modal{
  max-width:440px;
  padding:24px 18px;
  border-radius:24px;
}
.modal-title{
  font-size:1.55rem;
  margin-bottom:16px;
}
.empty-state{
  padding:28px 14px;
}
.empty-state-icon{
  font-size:2.4rem;
  margin-bottom:10px;
}
.empty-state-text{
  font-size:1rem;
  line-height:1.5;
}
.profile-dropdown{
  top:64px;
  right:10px;
  min-width:220px;
  padding:10px;
  border-radius:18px;
  border:1px solid var(--surface-border);
  box-shadow:0 20px 45px rgba(123,75,122,0.14);
}
.profile-dropdown-item{
  padding:10px 12px;
  border-radius:12px;
  font-size:0.84rem;
}
.chat-composer,.chat-stream,.chat-bubble{
  border-radius:20px !important;
}
.chat-actions{
  gap:8px !important;
}
.chat-actions .btn{
  padding:12px 14px !important;
  font-size:0.84rem !important;
}
.chat-message-input{
  min-height:78px !important;
}
.chat-hint,.chat-meta,.chat-author{
  font-size:0.74rem !important;
}
.chat-text{
  font-size:0.9rem !important;
}
@media (max-width: 768px){
  body{font-size:14px}
  .auth-card{padding:26px 18px;border-radius:26px}
  .auth-title{font-size:2.7rem}
  .dashboard{padding:12px 12px 82px}
  .top-bar{padding:12px 14px;margin-bottom:14px;gap:8px}
  .countdown-hero{padding:22px 14px;border-radius:24px}
  .countdown-boxes{gap:8px}
  .countdown-box{min-width:66px;padding:12px 8px}
  .countdown-number{font-size:1.65rem}
  .us-stats-bar{grid-template-columns:repeat(2,1fr)}
  .nav-tabs{gap:6px;margin-bottom:14px}
  .nav-tab{padding:8px 12px;font-size:0.74rem}
  .card{padding:16px 14px;border-radius:22px}
  .card-title{font-size:1.35rem}
  .add-row{flex-direction:column}
  .add-row .btn{width:100%}
  .favorites-grid{grid-template-columns:1fr}
  .modal{padding:20px 14px}
}
`;
  document.head.appendChild(style);
}
function refineCopy(){
  var title=document.querySelector('.auth-subtitle');
  if(title)title.textContent='A soft, private little world for just the two of you';
  var badge=document.querySelector('.loyalty-badge');
  if(badge)badge.textContent='Loyalty-First Space';
  var waiting=document.querySelector('#invite-wait-step .info-title');
  if(waiting)waiting.textContent='Invite Ready';
}
function refineButtons(){
  var send=document.getElementById('send-otp-btn');
  if(send && !send.dataset.uiPolished){
    send.dataset.uiPolished='1';
    send.style.marginTop='4px';
  }
  var inputs=document.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach(function(el){
    if(el.placeholder && !el.dataset.uiPlaceholder){
      el.dataset.uiPlaceholder='1';
      el.placeholder=el.placeholder.replace('...', '...');
    }
  });
}
function refineProfile(){
  var dropdownName=document.getElementById('dropdown-name');
  if(dropdownName && dropdownName.textContent && /\+91/.test(dropdownName.textContent)){
    dropdownName.textContent='Your Love Space';
  }
}
function boot(){
  addStyles();
  refineCopy();
  refineButtons();
  refineProfile();
}
window.addEventListener('load',boot);
setInterval(boot,1200);
})();
