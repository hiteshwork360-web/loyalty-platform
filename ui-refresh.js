(function(){
var STYLE_ID='ui-refresh-styles';
var SECTION_META={
  'panel-calendar':'Keep every plan, anniversary, and tiny date in one sweet shared place.',
  'panel-bucket':'Dream big together without losing track of the little wishes too.',
  'panel-travel':'Save the places you are craving and the ones you finally reached together.',
  'panel-baby-names':'Heart the names you both love and keep the cute ones close.',
  'panel-love-notes':'Drop soft messages, future notes, and private little reminders for each other.',
  'panel-memories':'Turn moments into a timeline you can revisit anytime.',
  'panel-date-night':'Pick a date idea fast when you want romance without overthinking it.',
  'panel-favorites':'Tiny preferences, inside jokes, and all your shared little obsessions.',
  'panel-intimate':'A private, respectful space for closeness, comfort, and honest connection.',
  'panel-chat':'Message, send photos, and feel together in real time.'
};

function addStyles(){
  if(document.getElementById(STYLE_ID))return;
  var style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
:root{
  --ui-bg-1:#fff7fb;
  --ui-bg-2:#fff0f7;
  --ui-bg-3:#f8f5ff;
  --ui-surface:rgba(255,255,255,0.9);
  --ui-surface-strong:rgba(255,255,255,0.96);
  --ui-surface-soft:rgba(255,248,252,0.82);
  --ui-border:rgba(255,182,213,0.34);
  --ui-border-strong:rgba(255,105,180,0.18);
  --ui-shadow:0 20px 55px rgba(164,91,141,0.12);
  --ui-shadow-soft:0 12px 28px rgba(164,91,141,0.09);
  --ui-text:#724768;
  --ui-text-soft:#9c6c96;
  --ui-heading:#d45597;
}
html{
  scroll-behavior:smooth;
}
body.ui-revamp{
  color:var(--ui-text);
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.82), transparent 34%),
    radial-gradient(circle at top right, rgba(255,214,232,0.44), transparent 28%),
    linear-gradient(145deg,var(--ui-bg-1) 0%,var(--ui-bg-2) 38%,var(--ui-bg-3) 100%);
  font-size:15px;
  line-height:1.48;
}
body.ui-revamp::before{
  content:'';
  position:fixed;
  inset:0;
  pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px);
  background-size:24px 24px;
  opacity:0.26;
}
.auth-container,
.dashboard,
.modal-overlay{
  position:relative;
  z-index:1;
}
.auth-container{
  padding:22px;
}
.auth-card{
  max-width:440px;
  padding:34px 24px 28px;
  border-radius:32px;
  border:1px solid rgba(255,255,255,0.72);
  background:linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,246,250,0.9));
  box-shadow:0 28px 70px rgba(181,89,150,0.18);
}
.auth-title{
  font-size:3.15rem;
  line-height:0.92;
  margin-bottom:10px;
}
.auth-subtitle{
  max-width:290px;
  margin:0 auto 20px;
  font-size:0.98rem;
  line-height:1.5;
  color:var(--ui-text-soft);
  font-family:'Quicksand',sans-serif;
  font-weight:600;
}
.loyalty-badge{
  padding:10px 16px;
  border-radius:999px;
  font-size:0.82rem;
  letter-spacing:0.4px;
  margin-bottom:18px;
  box-shadow:0 10px 22px rgba(255,193,7,0.22);
}
#message-container{
  min-height:0;
}
.info-box{
  padding:16px;
  border-radius:20px;
  margin-bottom:16px;
  border:1px solid rgba(255,182,213,0.34);
  background:linear-gradient(135deg,rgba(255,247,251,0.94),rgba(245,239,255,0.88));
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.5);
}
.info-title{
  margin-bottom:6px;
  font-size:0.98rem;
}
.info-text{
  font-size:0.88rem;
  line-height:1.6;
  color:var(--ui-text);
}
.input-group{
  margin-bottom:15px;
}
.input-label{
  margin-bottom:6px;
  font-size:0.8rem;
  text-transform:uppercase;
  letter-spacing:0.5px;
  color:var(--ui-text-soft);
}
input,textarea,select{
  padding:13px 15px;
  border-radius:16px;
  border:1.5px solid rgba(255,182,213,0.45);
  background:rgba(255,255,255,0.97);
  color:var(--ui-text);
  font-size:0.95rem;
}
input::placeholder,textarea::placeholder{
  color:#b78fae;
}
input:focus,textarea:focus,select:focus{
  border-color:rgba(212,85,151,0.72);
  box-shadow:0 0 0 5px rgba(255,105,180,0.12);
}
textarea{
  min-height:96px;
}
.phone-input{
  gap:8px;
}
.country-code{
  width:70px;
}
.btn{
  width:100%;
  margin-top:6px;
  padding:14px 18px;
  border-radius:16px;
  font-size:0.96rem;
  box-shadow:0 12px 24px rgba(212,85,151,0.2);
}
.btn:hover{
  transform:translateY(-1px);
}
.btn-small{
  width:auto;
  padding:10px 15px;
  border-radius:14px;
  font-size:0.8rem;
}
.error-message,.success-message{
  padding:12px 14px;
  border-radius:14px;
  margin-bottom:14px;
  font-size:0.86rem;
}
.otp-inputs{
  gap:8px;
  margin:16px 0 18px;
}
.otp-input{
  width:44px;
  height:52px;
  border-radius:14px;
  font-size:1.15rem;
}
.cooldown-timer,
#otp-step a{
  font-size:0.82rem;
}
.dashboard{
  max-width:1180px;
  padding:18px 18px 110px;
}
.top-bar{
  padding:16px 18px;
  margin-bottom:18px;
  border-radius:24px;
  border:1px solid var(--ui-border);
  background:linear-gradient(135deg,rgba(255,251,253,0.92),rgba(247,243,255,0.86));
  box-shadow:var(--ui-shadow-soft);
}
.top-bar-left h1{
  font-size:2rem;
}
.top-bar-left p{
  font-size:0.98rem;
  line-height:1.4;
  color:var(--ui-text-soft);
}
.top-bar-right{
  display:flex;
  align-items:center;
  gap:10px;
}
.user-avatar{
  width:44px;
  height:44px;
  font-size:1rem;
  box-shadow:0 10px 18px rgba(212,85,151,0.18);
}
.countdown-hero{
  margin-bottom:18px;
  padding:28px 22px;
  border-radius:28px;
  border:1px solid var(--ui-border);
  background:
    radial-gradient(circle at top right, rgba(255,223,236,0.66), transparent 28%),
    linear-gradient(135deg,rgba(255,251,253,0.94),rgba(246,239,255,0.88),rgba(255,249,239,0.84));
  box-shadow:var(--ui-shadow);
}
.countdown-label{
  font-size:1.28rem;
  margin-bottom:8px;
}
.countdown-date-display{
  font-size:0.96rem;
  margin-bottom:18px;
}
.countdown-boxes{
  gap:10px;
}
.countdown-box{
  min-width:78px;
  padding:14px 10px;
  border-radius:18px;
  border:1px solid rgba(255,182,213,0.28);
  background:rgba(255,255,255,0.95);
  box-shadow:none;
}
.countdown-number{
  font-size:2.05rem;
}
.countdown-unit{
  font-size:0.67rem;
  letter-spacing:0.7px;
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
  border-radius:20px;
  border:1px solid var(--ui-border);
  background:var(--ui-surface-soft);
  box-shadow:none;
}
.stat-card:hover{
  transform:none;
}
.stat-icon{
  font-size:1.3rem;
  margin-bottom:6px;
}
.stat-value{
  font-size:1.45rem;
}
.stat-label{
  font-size:0.66rem;
  color:var(--ui-text-soft);
  letter-spacing:0.7px;
}
.nav-tabs{
  gap:8px;
  margin-bottom:18px;
  padding:2px 2px 8px;
}
.nav-tab{
  padding:9px 14px;
  border-radius:999px;
  border:1px solid rgba(255,182,213,0.35);
  background:rgba(255,255,255,0.88);
  font-size:0.78rem;
  box-shadow:0 6px 14px rgba(181,89,150,0.06);
}
.nav-tab.active{
  box-shadow:0 10px 20px rgba(212,85,151,0.18);
}
.card{
  padding:20px 18px;
  border-radius:24px;
  margin-bottom:16px;
  border:1px solid var(--ui-border);
  background:linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,247,251,0.88));
  box-shadow:var(--ui-shadow-soft);
}
.card-title{
  margin-bottom:8px;
  font-size:1.48rem;
  letter-spacing:0.2px;
}
.section-subtitle{
  margin:-4px 0 16px;
  font-size:0.84rem;
  line-height:1.55;
  color:var(--ui-text-soft);
  max-width:560px;
}
.add-row{
  gap:8px;
  margin-bottom:16px;
}
.add-row .btn{
  width:auto;
  margin-top:0;
  padding:13px 16px;
}
.list-item{
  gap:12px;
  padding:12px 14px;
  margin-bottom:8px;
  border-radius:18px;
  border:1px solid rgba(255,182,213,0.22);
  background:linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,244,249,0.82));
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
.list-item-content{min-width:0}
.list-item-text{
  font-size:0.9rem;
  line-height:1.45;
}
.list-item-meta{
  margin-top:4px;
  font-size:0.74rem;
  color:var(--ui-text-soft);
}
.icon-btn{
  width:32px;
  height:32px;
  font-size:0.82rem;
}
.tag{
  padding:3px 9px;
  border-radius:999px;
  font-size:0.68rem;
}
.calendar-grid{gap:4px}
.calendar-header{
  font-size:0.66rem;
  color:var(--ui-text-soft);
}
.calendar-day{
  border-radius:12px;
  font-size:0.78rem;
  background:rgba(255,255,255,0.84);
}
.calendar-day.today{
  background:rgba(255,105,180,0.12);
}
.calendar-nav h3{
  font-size:1.14rem;
}
.calendar-nav button{
  width:34px;
  height:34px;
  font-size:0.95rem;
}
.note-card,.fav-card,.intimate-entry{
  border-radius:18px;
}
.note-card{
  padding:18px;
}
.note-text{
  font-size:0.98rem;
  line-height:1.65;
}
.timeline{
  padding-left:28px;
}
.timeline::before{
  left:10px;
}
.timeline-item{
  margin-bottom:18px;
  padding-left:14px;
}
.timeline-item::before{
  left:-24px;
  width:12px;
  height:12px;
}
.timeline-title{
  font-size:0.94rem;
}
.timeline-desc{
  font-size:0.8rem;
  color:var(--ui-text-soft);
}
.date-generator{
  padding:6px 0 0;
}
.date-idea-display{
  min-height:64px;
  margin:18px 0;
  font-size:1.5rem;
}
.date-category-filters{
  gap:6px;
}
.category-chip{
  padding:7px 13px;
  border-radius:999px;
  font-size:0.73rem;
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
  margin-bottom:8px;
}
.fav-label{
  font-size:0.7rem;
  letter-spacing:0.7px;
}
.fav-value-input{
  font-size:1.02rem;
}
.mood-grid{
  gap:8px;
}
.mood-option{
  font-size:1.45rem;
  padding:6px;
  border-radius:12px;
}
.name-section{margin-bottom:14px}
.name-section-title{
  font-size:1.1rem;
  margin-bottom:8px;
}
.name-item{
  margin:3px;
  padding:7px 12px;
  border-radius:16px;
  font-size:0.86rem;
}
.modal-overlay{
  padding:14px;
}
.modal{
  max-width:460px;
  padding:24px 18px;
  border-radius:24px;
  box-shadow:0 28px 70px rgba(164,91,141,0.22);
}
.modal-title{
  font-size:1.5rem;
  margin-bottom:16px;
}
.empty-state{
  padding:28px 14px;
}
.empty-state-icon{
  font-size:2.25rem;
  margin-bottom:10px;
}
.empty-state-text{
  font-size:0.98rem;
  line-height:1.55;
}
.profile-dropdown{
  top:64px;
  right:8px;
  padding:10px;
  min-width:220px;
  border-radius:18px;
  border:1px solid var(--ui-border);
  background:rgba(255,255,255,0.97);
  box-shadow:0 18px 45px rgba(164,91,141,0.14);
}
.profile-dropdown-item{
  padding:10px 12px;
  border-radius:12px;
  font-size:0.84rem;
  color:var(--ui-text);
}
.profile-dropdown-item:hover{
  background:rgba(255,214,232,0.24);
}
.chat-stream,.chat-composer,.chat-bubble{border-radius:20px !important}
.chat-stream{
  min-height:360px !important;
  max-height:58vh !important;
  padding:16px !important;
  background:linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,247,251,0.88)) !important;
}
.chat-empty-icon{font-size:2.1rem !important}
.chat-author,.chat-meta,.chat-hint,.chat-upload-note{font-size:0.74rem !important}
.chat-text{font-size:0.9rem !important}
.chat-bubble{padding:12px 14px !important;max-width:min(80%,360px) !important}
.chat-composer{padding:16px !important;gap:12px !important}
.chat-actions{gap:8px !important}
.chat-actions .btn{padding:12px 14px !important;font-size:0.84rem !important}
.chat-message-input{min-height:78px !important}
.chat-preview-thumb{width:72px !important;height:72px !important;border-radius:16px !important}
#activity-toast-host > div{
  border-radius:18px !important;
  box-shadow:0 16px 36px rgba(164,91,141,0.12) !important;
}
@media (max-width: 900px){
  .dashboard{padding:14px 14px 92px}
  .top-bar{gap:10px;align-items:flex-start}
}
@media (max-width: 768px){
  body.ui-revamp{font-size:14px}
  .auth-container{padding:14px}
  .auth-card{padding:28px 18px 24px;border-radius:26px}
  .auth-title{font-size:2.6rem}
  .dashboard{padding:12px 12px 84px}
  .top-bar{padding:14px;flex-direction:column;gap:8px;margin-bottom:14px}
  .top-bar-left h1{font-size:1.7rem}
  .countdown-hero{padding:22px 14px;border-radius:24px}
  .countdown-boxes{gap:8px}
  .countdown-box{min-width:64px;padding:12px 8px}
  .countdown-number{font-size:1.58rem}
  .us-stats-bar{grid-template-columns:repeat(2,1fr)}
  .nav-tabs{gap:6px;margin-bottom:14px}
  .nav-tab{padding:8px 12px;font-size:0.72rem}
  .card{padding:16px 14px;border-radius:22px}
  .card-title{font-size:1.3rem}
  .section-subtitle{font-size:0.8rem;margin-bottom:14px}
  .add-row{flex-direction:column}
  .add-row .btn{width:100%}
  .favorites-grid{grid-template-columns:1fr}
  .modal{padding:20px 14px}
  .chat-actions{display:grid !important;grid-template-columns:1fr 1fr !important}
}
`;
  document.head.appendChild(style);
}
function sectionSubtitle(){
  document.querySelectorAll('.section-panel').forEach(function(panel){
    var card=panel.querySelector('.card');
    if(!card)return;
    if(card.querySelector('.section-subtitle'))return;
    var meta=SECTION_META[panel.id];
    if(!meta)return;
    var title=card.querySelector('.card-title');
    if(!title)return;
    var sub=document.createElement('div');
    sub.className='section-subtitle';
    sub.textContent=meta;
    title.insertAdjacentElement('afterend',sub);
  });
}
function authCopy(){
  var subtitle=document.querySelector(".auth-subtitle");
  if(subtitle)subtitle.textContent="A calm little world for just the two of you";
  var badge=document.querySelector(".loyalty-badge");
  if(badge)badge.textContent="Loyalty-First Space";
  var authCard=document.querySelector(".auth-card");
  if(authCard && !document.getElementById("auth-kicker")){
    var kicker=document.createElement("div");
    kicker.id="auth-kicker";
    kicker.textContent="Private Couple Hub";
    kicker.style.display="inline-block";
    kicker.style.padding="6px 12px";
    kicker.style.marginBottom="14px";
    kicker.style.borderRadius="999px";
    kicker.style.background="rgba(255,255,255,0.85)";
    kicker.style.border="1px solid rgba(255,182,213,0.34)";
    kicker.style.color="var(--ui-text-soft)";
    kicker.style.fontSize="0.74rem";
    kicker.style.fontWeight="700";
    kicker.style.letterSpacing="0.6px";
    kicker.style.textTransform="uppercase";
    authCard.insertBefore(kicker,authCard.firstChild);
  }
}
function profilePolish(){
  var drop=document.getElementById("dropdown-name");
  if(drop && /\\+91/.test(drop.textContent))drop.textContent="Your Love Space";
  var topTagline=document.getElementById("couple-tagline");
  if(topTagline){
    topTagline.style.maxWidth="560px";
    topTagline.style.lineHeight="1.45";
  }
  var topBar=document.querySelector(".top-bar-right");
  if(topBar && !document.getElementById("top-soft-status")){
    var pill=document.createElement("div");
    pill.id="top-soft-status";
    pill.textContent="Private • Shared • Realtime";
    pill.style.padding="8px 12px";
    pill.style.borderRadius="999px";
    pill.style.fontSize="0.74rem";
    pill.style.fontWeight="700";
    pill.style.color="var(--ui-text-soft)";
    pill.style.background="rgba(255,255,255,0.8)";
    pill.style.border="1px solid rgba(255,182,213,0.26)";
    topBar.insertBefore(pill,topBar.firstChild);
  }
}
function mobileHints(){
  var textareas=document.querySelectorAll('textarea');
  textareas.forEach(function(el){
    if(!el.dataset.rowsTuned){
      el.dataset.rowsTuned='1';
      if(window.innerWidth < 769 && el.rows && Number(el.rows) > 4)el.rows=4;
    }
  });
}
function boot(){
  try{
    addStyles();
    authCopy();
    sectionSubtitle();
    profilePolish();
    mobileHints();
  }catch(err){
    console.error('ui-refresh boot failed',err);
  }
}
function scheduleBoots(){
  [0,250,900,1800].forEach(function(delay){
    window.setTimeout(boot,delay);
  });
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',scheduleBoots,{once:true});
}else{
  scheduleBoots();
}
window.addEventListener('resize',mobileHints);
})();


