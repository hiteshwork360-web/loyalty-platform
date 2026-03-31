(function(){
var STYLE_ID='ui-refresh-styles';
var APPLIED='ui-overhauled';
var PANEL_META={
  'panel-calendar':{eyebrow:'Plan together',title:'Shared calendar',text:'Dates, anniversaries, and upcoming plans live here.'},
  'panel-bucket':{eyebrow:'Dream together',title:'Bucket list',text:'Keep every little and big dream in one place.'},
  'panel-travel':{eyebrow:'Go somewhere',title:'Travel board',text:'Save dream destinations and mark the memories you made.'},
  'panel-baby-names':{eyebrow:'Future maybe',title:'Baby names',text:'Collect the names that feel soft, meaningful, and yours.'},
  'panel-love-notes':{eyebrow:'Say it softly',title:'Love notes',text:'Short messages, future notes, and private little reminders.'},
  'panel-memories':{eyebrow:'Hold the moments',title:'Memory lane',text:'Build a timeline of photos, milestones, and small wins.'},
  'panel-date-night':{eyebrow:'Pick tonight',title:'Date ideas',text:'When you want romance fast without overthinking it.'},
  'panel-favorites':{eyebrow:'Know each other',title:'Favorites',text:'Tiny details, inside jokes, and everything sweet in between.'},
  'panel-intimate':{eyebrow:'Private space',title:'Closer connection',text:'A respectful place for trust, closeness, and comfort.'},
  'panel-chat':{eyebrow:'Always nearby',title:'Couple chat',text:'Real-time messages and photos that feel instant and personal.'}
};

function addStyles(){
  if(document.getElementById(STYLE_ID)) return;
  var style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent = `
:root{
  --ui-bg:#f7efe7;
  --ui-bg-2:#fdf8f3;
  --ui-surface:#fffaf6;
  --ui-surface-2:#fff4ef;
  --ui-card:#fffdfb;
  --ui-line:rgba(169,108,95,0.12);
  --ui-line-strong:rgba(169,108,95,0.2);
  --ui-text:#5f463f;
  --ui-text-soft:#8a6b61;
  --ui-accent:#d06f82;
  --ui-accent-2:#f0b66f;
  --ui-accent-3:#92b7a3;
  --ui-shadow:0 18px 50px rgba(128,91,81,0.10);
  --ui-shadow-soft:0 10px 28px rgba(128,91,81,0.08);
  --ui-radius-xl:34px;
  --ui-radius-lg:24px;
  --ui-radius-md:18px;
}
html{scroll-behavior:smooth}
body.ui-revamp{
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.95), transparent 28%),
    radial-gradient(circle at 85% 15%, rgba(255,220,204,0.65), transparent 18%),
    linear-gradient(180deg,var(--ui-bg-2),var(--ui-bg));
  color:var(--ui-text);
  font-size:15px;
}
body.ui-revamp::before{
  content:'';
  position:fixed;
  inset:0;
  pointer-events:none;
  background-image:linear-gradient(rgba(169,108,95,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(169,108,95,0.03) 1px, transparent 1px);
  background-size:22px 22px;
  opacity:.4;
}
.auth-container,.dashboard,.modal-overlay{position:relative;z-index:1}
.auth-container{padding:28px;min-height:100vh;display:grid;place-items:center}
.auth-card{
  max-width:520px;
  width:100%;
  padding:36px 34px 30px;
  border-radius:38px;
  background:linear-gradient(180deg, rgba(255,253,251,0.98), rgba(255,245,239,0.95));
  border:1px solid rgba(255,255,255,0.75);
  box-shadow:0 30px 90px rgba(136,91,81,0.13);
  text-align:left;
}
.auth-title{
  font-family:'Georgia',serif !important;
  font-size:3rem;
  line-height:0.95;
  letter-spacing:-0.03em;
  background:none !important;
  -webkit-text-fill-color:var(--ui-text) !important;
  color:var(--ui-text) !important;
  margin-bottom:10px;
}
.auth-subtitle{
  margin:0 0 22px;
  font-family:'Quicksand',sans-serif;
  color:var(--ui-text-soft);
  font-size:1rem;
  max-width:360px;
}
.loyalty-badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:9px 14px;
  border-radius:999px;
  background:rgba(255,255,255,0.8);
  border:1px solid var(--ui-line);
  color:var(--ui-accent);
  box-shadow:none;
  margin-bottom:22px;
}
.info-box{
  padding:18px 18px 16px;
  border-radius:22px;
  background:linear-gradient(180deg, rgba(255,250,247,0.95), rgba(255,243,236,0.9));
  border:1px solid var(--ui-line);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.65);
}
.info-title,.input-label,.card-kicker,.workspace-title,.section-subtitle,.panel-lead{
  font-family:'Quicksand',sans-serif;
}
.info-title{font-size:0.94rem;color:var(--ui-text);font-weight:700}
.info-text{font-size:0.9rem;line-height:1.65;color:var(--ui-text-soft)}
.input-group{margin-bottom:16px}
.input-label{
  font-size:0.75rem;
  text-transform:uppercase;
  letter-spacing:0.12em;
  color:var(--ui-text-soft);
  margin-bottom:7px;
}
input,textarea,select{
  border-radius:18px;
  border:1px solid rgba(169,108,95,0.18);
  background:rgba(255,255,255,0.92);
  color:var(--ui-text);
  font-size:0.96rem;
  padding:14px 15px;
  box-shadow:none;
}
input:focus,textarea:focus,select:focus{
  border-color:rgba(208,111,130,0.58);
  box-shadow:0 0 0 4px rgba(208,111,130,0.12);
}
input::placeholder,textarea::placeholder{color:#b59287}
.phone-input{gap:10px}
.country-code{width:74px}
.btn{
  width:100%;
  border:none;
  border-radius:18px;
  padding:14px 18px;
  font-family:'Quicksand',sans-serif;
  font-weight:700;
  font-size:0.95rem;
  letter-spacing:0.01em;
  box-shadow:0 16px 26px rgba(208,111,130,0.17);
}
.btn-small{width:auto;padding:10px 15px;border-radius:14px;font-size:0.82rem;box-shadow:none}
.btn-outline{border:1px solid var(--ui-line-strong);background:rgba(255,255,255,0.8);color:var(--ui-text)}
.dashboard{
  max-width:1320px;
  padding:26px 24px 120px;
  display:grid;
  grid-template-columns:290px minmax(0,1fr);
  gap:22px;
  align-items:start;
}
.top-bar{
  grid-column:1 / -1;
  display:grid;
  grid-template-columns:minmax(0,1fr) auto;
  align-items:end;
  gap:20px;
  padding:28px 30px;
  border-radius:34px;
  background:linear-gradient(135deg, rgba(255,251,247,0.96), rgba(251,240,236,0.92));
  border:1px solid rgba(255,255,255,0.72);
  box-shadow:var(--ui-shadow);
}
.top-bar-left h1{
  font-family:'Georgia',serif !important;
  font-size:2.8rem;
  font-weight:700;
  line-height:0.95;
  color:var(--ui-text) !important;
  background:none !important;
  -webkit-text-fill-color:var(--ui-text) !important;
}
.top-bar-left p{font-size:1rem;color:var(--ui-text-soft);font-family:'Quicksand',sans-serif;max-width:540px}
.top-bar-right{display:flex;align-items:center;gap:12px}
.user-avatar{
  width:52px;height:52px;border-radius:18px;
  background:linear-gradient(135deg,#d07c8e,#e7a67a);
  color:#fff;box-shadow:0 14px 28px rgba(208,111,130,0.18)
}
.profile-dropdown{
  top:96px;right:24px;border-radius:24px;padding:12px;background:rgba(255,251,248,0.98);
  border:1px solid var(--ui-line);box-shadow:var(--ui-shadow);min-width:240px
}
.profile-dropdown-item{border-radius:16px;padding:12px 14px;color:var(--ui-text)}
.profile-dropdown-item:hover{background:rgba(208,111,130,0.08)}
.countdown-hero,
.us-stats-bar,
.nav-tabs{grid-column:1}
.countdown-hero{
  padding:24px 22px;
  border-radius:32px;
  background:linear-gradient(180deg, rgba(255,250,246,0.98), rgba(255,241,235,0.92));
  border:1px solid var(--ui-line);
  box-shadow:var(--ui-shadow-soft);
  position:sticky;
  top:22px;
}
.countdown-label{
  font-size:0.78rem;
  text-transform:uppercase;
  letter-spacing:0.14em;
  color:var(--ui-text-soft);
  margin-bottom:10px;
}
.countdown-date-display{font-size:1rem;color:var(--ui-text);margin-bottom:16px}
.countdown-boxes{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.countdown-box{
  min-width:0;
  padding:16px 10px;
  border-radius:22px;
  background:rgba(255,255,255,0.78);
  border:1px solid rgba(169,108,95,0.12);
}
.countdown-number{font-size:1.95rem;color:var(--ui-accent);font-weight:700}
.countdown-unit{font-size:0.74rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--ui-text-soft)}
.countdown-together{margin-top:16px;font-size:0.95rem;color:var(--ui-text)}
.us-stats-bar{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
  margin:0;
}
.stat-card{
  padding:16px 14px;
  border-radius:24px;
  background:rgba(255,252,249,0.92);
  border:1px solid var(--ui-line);
  box-shadow:var(--ui-shadow-soft);
}
.stat-icon{font-size:1.2rem;margin-bottom:10px}
.stat-value{font-size:1.35rem;color:var(--ui-text)}
.stat-label{font-size:0.76rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--ui-text-soft)}
.nav-tabs{
  display:grid;
  grid-template-columns:1fr;
  gap:10px;
  margin:0;
  padding:0;
  overflow:visible;
}
.nav-tab{
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:100%;
  padding:14px 16px;
  border-radius:18px;
  border:1px solid var(--ui-line);
  background:rgba(255,252,249,0.9);
  color:var(--ui-text);
  font-size:0.9rem;
  font-weight:700;
  box-shadow:var(--ui-shadow-soft);
}
.nav-tab::after{content:'Open';font-size:0.72rem;font-weight:700;color:var(--ui-text-soft);text-transform:uppercase;letter-spacing:0.08em}
.nav-tab.active{
  background:linear-gradient(135deg,#cf7387,#e5a472);
  color:#fff;
  border-color:transparent;
  box-shadow:0 18px 30px rgba(208,111,130,0.18);
}
.nav-tab.active::after{color:rgba(255,255,255,0.8)}
.section-panel{
  grid-column:2;
  display:none;
  animation:none;
}
.section-panel.active{display:block}
.card{
  border-radius:34px;
  padding:28px 28px 24px;
  background:linear-gradient(180deg, rgba(255,253,251,0.98), rgba(255,247,242,0.93));
  border:1px solid rgba(255,255,255,0.75);
  box-shadow:var(--ui-shadow);
}
.panel-shell{display:flex;flex-direction:column;gap:18px}
.panel-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  padding-bottom:18px;
  border-bottom:1px solid rgba(169,108,95,0.10);
  margin-bottom:18px;
}
.panel-head-main{min-width:0}
.panel-kicker{
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-size:0.74rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:0.12em;
  color:var(--ui-text-soft);
  margin-bottom:10px;
}
.card-title{
  font-family:'Georgia',serif !important;
  font-size:2rem;
  color:var(--ui-text);
  margin:0;
}
.section-subtitle{font-size:1rem;line-height:1.6;color:var(--ui-text-soft);max-width:650px}
.panel-chip{
  display:inline-flex;align-items:center;justify-content:center;
  padding:10px 14px;border-radius:999px;background:rgba(255,255,255,0.85);border:1px solid var(--ui-line);
  font-size:0.76rem;font-weight:700;color:var(--ui-accent);white-space:nowrap
}
.add-row{gap:10px;align-items:stretch;background:rgba(255,248,244,0.88);padding:12px;border-radius:22px;border:1px solid var(--ui-line);margin-bottom:18px}
.add-row input,.add-row select{background:#fff}
.list-item,.timeline-item,.memory-card,.note-card,.trip-card,.baby-card,.intimate-entry,.chat-message,.fav-card,.name-section,.date-generator,.date-idea-display{
  border-radius:22px !important;
}
.list-item,.timeline-item,.memory-card,.note-card,.trip-card,.baby-card,.fav-card,.name-section,.date-idea-display,.chat-message{
  border:1px solid var(--ui-line);
  background:rgba(255,255,255,0.82);
  box-shadow:none;
}
.empty-state{
  padding:48px 22px;
  border-radius:26px;
  background:rgba(255,250,246,0.82);
  border:1px dashed rgba(169,108,95,0.2);
}
.empty-state-icon{font-size:2.4rem}
.empty-state-text{font-family:'Quicksand',sans-serif;font-size:1rem;color:var(--ui-text-soft)}
.calendar-grid,.favorites-grid{gap:12px}
.calendar-day,.calendar-header{border-radius:18px}
.modal{
  border-radius:34px;
  background:linear-gradient(180deg, rgba(255,252,249,0.98), rgba(255,245,238,0.94));
  border:1px solid rgba(255,255,255,0.72);
  box-shadow:0 30px 90px rgba(90,56,48,0.16);
}
.modal-title{font-family:'Georgia',serif !important;color:var(--ui-text);font-size:2rem}
#message-container{min-height:0}
.error-message,.success-message{border-radius:16px;font-size:0.88rem}
.ui-dashboard-shell{display:contents}
.ui-side-stack{display:grid;gap:18px;align-content:start}
.ui-main-stack{display:grid;gap:18px;align-content:start}
.ui-auth-kicker{
  display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;
  background:rgba(255,255,255,0.85);border:1px solid var(--ui-line);margin-bottom:16px;
  color:var(--ui-text-soft);font-size:0.74rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase
}
.ui-top-chip{
  display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;
  background:rgba(255,255,255,0.8);border:1px solid var(--ui-line);color:var(--ui-text-soft);
  font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase
}
.ui-top-chip strong{color:var(--ui-text)}
.ui-top-mini{
  display:grid;grid-auto-flow:column;gap:8px;align-items:center
}
.ui-top-mini span{padding:8px 10px;border-radius:999px;background:rgba(255,255,255,0.75);border:1px solid var(--ui-line);font-size:0.72rem;color:var(--ui-text-soft);font-weight:700}
@media (max-width:1080px){
  .dashboard{grid-template-columns:1fr;gap:18px}
  .top-bar{grid-column:auto}
  .countdown-hero,.us-stats-bar,.nav-tabs,.section-panel{grid-column:auto}
  .countdown-hero{position:relative;top:auto}
  .nav-tabs{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:720px){
  .auth-container{padding:16px}
  .auth-card{padding:28px 20px 24px;border-radius:28px}
  .auth-title{font-size:2.4rem}
  .dashboard{padding:16px 16px 96px}
  .top-bar{padding:22px 18px;grid-template-columns:1fr;align-items:start}
  .top-bar-left h1{font-size:2.2rem}
  .countdown-boxes,.us-stats-bar,.nav-tabs{grid-template-columns:1fr 1fr}
  .nav-tab{padding:12px 14px;font-size:0.84rem}
  .nav-tab::after{display:none}
  .card{padding:22px 18px 18px;border-radius:28px}
  .panel-head{flex-direction:column;align-items:flex-start}
  .card-title{font-size:1.6rem}
  .add-row{flex-direction:column}
  .favorites-grid{grid-template-columns:1fr}
}
@media (max-width:520px){
  .countdown-boxes,.us-stats-bar,.nav-tabs{grid-template-columns:1fr}
}
`;
  document.head.appendChild(style);
}

function makeAuthHero(){
  var authCard=document.querySelector('.auth-card');
  if(!authCard || document.getElementById('ui-auth-kicker')) return;
  var kicker=document.createElement('div');
  kicker.id='ui-auth-kicker';
  kicker.className='ui-auth-kicker';
  kicker.textContent='For two people who choose each other every day';
  authCard.insertBefore(kicker, authCard.firstChild);
  var subtitle=document.querySelector('.auth-subtitle');
  if(subtitle) subtitle.textContent='A slower, sweeter private space for your relationship, your memories, and your daily little world.';
  var badge=document.querySelector('.loyalty-badge');
  if(badge) badge.textContent='Private loyalty-first space';
}

function makeTopBar(){
  var right=document.querySelector('.top-bar-right');
  if(!right || document.getElementById('ui-top-chip')) return;
  var chip=document.createElement('div');
  chip.id='ui-top-chip';
  chip.className='ui-top-chip';
  chip.innerHTML='<strong>Your shared home</strong> realtime and private';
  right.insertBefore(chip, right.firstChild);
}

function buildDashboardShell(){
  var dashboard=document.querySelector('.dashboard');
  if(!dashboard || dashboard.classList.contains(APPLIED)) return;
  var topBar=dashboard.querySelector('.top-bar');
  var countdown=dashboard.querySelector('.countdown-hero');
  var stats=dashboard.querySelector('.us-stats-bar');
  var tabs=dashboard.querySelector('.nav-tabs');
  var panels=[].slice.call(dashboard.querySelectorAll('.section-panel'));
  if(!topBar || !countdown || !stats || !tabs || !panels.length) return;

  var side=document.createElement('div');
  side.className='ui-side-stack';
  var main=document.createElement('div');
  main.className='ui-main-stack';

  dashboard.insertBefore(side, topBar.nextSibling);
  dashboard.insertBefore(main, side.nextSibling);

  side.appendChild(countdown);
  side.appendChild(stats);
  side.appendChild(tabs);
  panels.forEach(function(panel){ main.appendChild(panel); });

  dashboard.classList.add(APPLIED);
}

function enhancePanels(){
  document.querySelectorAll('.section-panel').forEach(function(panel){
    var card=panel.querySelector('.card');
    if(!card || card.querySelector('.panel-shell')) return;
    var title=card.querySelector('.card-title');
    if(!title) return;
    var meta=PANEL_META[panel.id] || {eyebrow:'Shared space',title:title.textContent,text:'A quiet place for both of you.'};

    var shell=document.createElement('div');
    shell.className='panel-shell';
    while(card.firstChild){ shell.appendChild(card.firstChild); }
    card.appendChild(shell);

    var heading=title.parentNode;
    var head=document.createElement('div');
    head.className='panel-head';
    var main=document.createElement('div');
    main.className='panel-head-main';
    var kicker=document.createElement('div');
    kicker.className='panel-kicker';
    kicker.textContent=meta.eyebrow;
    var newTitle=document.createElement('div');
    newTitle.className='card-title';
    newTitle.textContent=meta.title;
    var sub=document.createElement('div');
    sub.className='section-subtitle';
    sub.textContent=meta.text;
    main.appendChild(kicker);
    main.appendChild(newTitle);
    main.appendChild(sub);
    var chip=document.createElement('div');
    chip.className='panel-chip';
    chip.textContent='Shared between both of you';
    head.appendChild(main);
    head.appendChild(chip);

    if(heading && heading.classList && heading.classList.contains('card-title')){
      heading.remove();
    }
    shell.insertBefore(head, shell.firstChild);
  });
}

function relabelTabs(){
  document.querySelectorAll('.nav-tab').forEach(function(tab){
    if(tab.dataset.uiRenamed) return;
    var text=tab.textContent.replace(/^[^A-Za-z]+/,'').trim();
    tab.dataset.uiRenamed='1';
    tab.textContent=text;
  });
}

function polishProfile(){
  var drop=document.getElementById('dropdown-name');
  if(drop && /^\+/.test(drop.textContent.trim())) drop.textContent='Your private space';
}

function tuneEmptyStates(){
  document.querySelectorAll('.empty-state-text').forEach(function(el){
    if(el.dataset.uiTuned) return;
    el.dataset.uiTuned='1';
    el.textContent=el.textContent.replace(/!+$/,'').replace(/\.\.\./g,'.');
  });
}

function boot(){
  try{
    addStyles();
    makeAuthHero();
    makeTopBar();
    buildDashboardShell();
    enhancePanels();
    relabelTabs();
    polishProfile();
    tuneEmptyStates();
  }catch(err){
    console.error('ui-refresh boot failed', err);
  }
}

function scheduleBoots(){
  [0,250,900,1800].forEach(function(delay){
    window.setTimeout(boot, delay);
  });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', scheduleBoots, {once:true});
}else{
  scheduleBoots();
}
window.addEventListener('resize', boot);
})();
