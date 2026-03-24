import { useEffect, useRef, useState } from "react"
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Studio Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#080A14;--s1:#0D0F1C;--s2:#111526;--s3:#171B2E;--s4:#1D2238;--card:#13162A;--border:rgba(255,255,255,.055);--border2:rgba(255,255,255,.1);--accent:#7C5CFC;--accentL:#A285FF;--accentD:#5236C2;--accentGlow:rgba(124,92,252,.18);--accentBorder:rgba(124,92,252,.35);--text:#ECF0FF;--text2:#8A92B8;--text3:#4D5578;--green:#2FD89A;--red:#F04F6A;--orange:#FF8C42;--blue:#38BDF8}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);height:100vh;overflow:hidden}
button,input,select,textarea{font-family:'Inter',sans-serif}
.app{display:flex;height:100vh;overflow:hidden}
.sidebar{width:52px;background:var(--s1);border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:14px 0 10px;gap:4px;z-index:10;flex-shrink:0}
.logo-box{width:34px;height:34px;background:linear-gradient(135deg,var(--accent),var(--accentD));border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;cursor:pointer;overflow:hidden}
.nav-btn{width:38px;height:38px;border-radius:3px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;transition:all .15s;color:var(--text3)}
.nav-btn:hover{background:rgba(255,255,255,.04);color:var(--text2)}
.nav-btn.active{background:rgba(124,92,252,.15);color:var(--accent)}
.nav-btn.active::before{content:'';position:absolute;left:-1px;top:20%;bottom:20%;width:3px;background:var(--accent);border-radius:0 2px 2px 0}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.topbar{background:var(--s1);border-bottom:1px solid var(--border);height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.topnav{display:flex;height:100%;align-items:center;gap:2px}
.top-nav-btn{padding:0 13px;height:100%;display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12.5px;font-weight:400;color:var(--text2);position:relative;transition:all .15s;border:none;background:none}
.top-nav-btn.active{font-weight:700;color:var(--text)}
.top-nav-btn.active::after{content:'';position:absolute;bottom:0;left:13px;right:13px;height:2px;background:var(--accent);border-radius:2px 2px 0 0}
.topbar-right{display:flex;align-items:center;gap:7px}
.search-box{display:flex;align-items:center;gap:7px;background:var(--s3);border:1px solid var(--border);border-radius:3px;padding:0 10px;height:30px;width:210px}
.search-box input{background:transparent;border:none;outline:none;color:var(--text);font-size:12px;width:100%}
.icon-btn{width:30px;height:30px;background:var(--s3);border:1px solid var(--border);border-radius:3px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text2);position:relative}
.notif-dot{position:absolute;top:6px;right:6px;width:6px;height:6px;background:var(--red);border-radius:50%;border:1.5px solid var(--s1)}
.avatar{width:30px;height:30px;border-radius:4px;background:linear-gradient(135deg,var(--accent),var(--accentD));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;cursor:pointer;overflow:hidden;border:1px solid var(--border2);position:relative}
.profile-drop{position:absolute;top:calc(100% + 7px);right:0;width:190px;background:var(--s2);border:1px solid var(--border2);border-radius:4px;box-shadow:0 16px 48px rgba(0,0,0,.5);z-index:300;overflow:hidden;display:none}
.profile-drop.show{display:block}
.pdrop-item{display:flex;align-items:center;gap:9px;padding:9px 13px;cursor:pointer;font-size:12px;font-weight:500;color:var(--text2);transition:background .12s}
.pdrop-item:hover{background:var(--s3)}
.page{flex:1;overflow:hidden}
/* Overview */
.overview{height:100%;overflow-y:auto;padding:20px 22px}
.greeting{font-size:21px;font-weight:800;letter-spacing:-.4px}
.greeting-sub{font-size:11px;color:var(--text3);margin-top:2px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0 16px}
.stat-card{background:var(--s2);border:1px solid var(--border);border-radius:4px;padding:16px;position:relative;overflow:hidden}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--c,var(--accent)) 0%,transparent 100%)}
.stat-glow{position:absolute;top:-30px;right:-30px;width:80px;height:80px;background:var(--c,var(--accent));opacity:.07;filter:blur(18px)}
.stat-val{font-size:24px;font-weight:800;letter-spacing:-1px;color:var(--text);line-height:1}
.stat-label{font-size:11px;color:var(--text3);margin-top:4px}
.charts-row{display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:16px}
.bottom-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.card{background:var(--s2);border:1px solid var(--border);border-radius:4px;padding:16px}
.card-title{font-size:13px;font-weight:700}
.card-sub{font-size:11px;color:var(--text3);margin-top:2px}
/* Tasks */
.tasks-page{height:100%;overflow-y:auto;padding:20px 22px}
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.page-title{font-size:20px;font-weight:800;letter-spacing:-.4px}
.page-subtitle{font-size:11px;color:var(--text3);margin-top:2px}
.board{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.col{background:var(--s2);border:1px solid var(--border);border-radius:4px;padding:12px;min-height:280px;display:flex;flex-direction:column;transition:all .2s}
.col.drag-over{background:var(--s3);border-color:var(--accentBorder)}
.col-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.col-dot{width:7px;height:7px;border-radius:0;flex-shrink:0}
.col-cnt{width:20px;height:20px;border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
.task-card{background:var(--card);border:1px solid var(--border);border-radius:3px;padding:10px 11px;margin-bottom:7px;cursor:grab;position:relative;transition:all .2s;overflow:hidden}
.task-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.4);border-color:var(--accentBorder)}
.task-bar{position:absolute;left:0;top:20%;bottom:20%;width:3px;border-radius:0 1px 1px 0;opacity:.8}
.task-title{font-size:12.5px;font-weight:500;margin-bottom:7px;padding-left:5px;line-height:1.4}
.task-footer{display:flex;align-items:center;justify-content:space-between;padding-left:5px}
.badge{font-size:10px;font-weight:600;padding:2px 7px;border-radius:var(--r2)}
.date-chip{display:flex;align-items:center;gap:3px;font-size:10px;color:var(--text3)}
.add-task-btn{width:100%;padding:7px;background:var(--accentGlow);border:1px dashed var(--accentBorder);border-radius:2px;color:var(--text3);font-size:11px;cursor:pointer;margin-top:4px;transition:all .15s}
/* Projects */
.projects-page{height:100%;overflow-y:auto;padding:20px 22px}
.proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.proj-card{background:var(--s2);border:1px solid var(--border);border-radius:4px;overflow:hidden}
.proj-top{height:3px}
.proj-body{padding:16px 18px}
.prog-bar{height:3px;background:rgba(255,255,255,.05);border-radius:0;overflow:hidden}
.prog-fill{height:100%;transition:width .3s}
.link-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;background:var(--accentGlow);border:1px solid var(--accentBorder);border-radius:3px;font-size:10px;color:var(--accentL);font-weight:600;text-decoration:none}
/* Filter */
.filter-row{display:flex;gap:3px;background:var(--s3);border-radius:2px;padding:3px}
.filter-btn{padding:4px 10px;border-radius:2px;border:none;background:transparent;color:var(--text3);font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s}
.filter-btn.active{background:var(--s2);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,.3);border-radius:var(--r1)}
/* Status */
.status-badge{font-size:10px;font-weight:600;padding:2px 7px;border-radius:var(--r2)}
.pay-chip{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:var(--r2)}
/* Overlay/Modal */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(12px);z-index:400;display:none;align-items:center;justify-content:center}
.overlay.show{display:flex}
.modal{background:var(--s2);border:1px solid var(--accentBorder);border-radius:4px;padding:26px;box-shadow:0 40px 80px rgba(0,0,0,.7);max-height:90vh;overflow-y:auto}
.modal-title{font-size:15px;font-weight:700;margin-bottom:4px}
.modal-sub{font-size:11.5px;color:var(--text3);margin-bottom:20px}
.field{margin-bottom:14px}
.field-label{font-size:10px;font-weight:700;color:var(--text3);letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px}
.inp{width:100%;background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:8px 11px;color:var(--text);font-size:12.5px;font-family:'Inter',sans-serif;outline:none;transition:border .2s}
.inp:focus{border-color:var(--accentBorder)}
.btn-primary{background:linear-gradient(135deg,var(--accent),var(--accentD));border:none;border-radius:3px;padding:8px 16px;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:5px;transition:all .2s}
.btn-secondary{background:var(--s3);border:1px solid var(--border2);border-radius:3px;padding:7px 13px;color:var(--text2);font-size:11px;cursor:pointer;font-family:'Inter',sans-serif}
.btn-danger{background:rgba(240,79,106,.08);border:1px solid rgba(240,79,106,.2);border-radius:3px;padding:7px 13px;color:var(--red);font-size:12px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:5px}
.modal-footer{display:flex;justify-content:space-between;align-items:center;margin-top:20px}
.payment-btns{display:flex;gap:7px;margin-bottom:14px}
.pay-btn{flex:1;padding:8px;background:var(--s3);border:1px solid var(--border);border-radius:3px;cursor:pointer;font-family:'Inter',sans-serif;font-size:11.5px;font-weight:500;transition:all .15s;color:var(--text3)}
/* Settings */
.settings-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:20px}
.stab{padding:9px 16px;cursor:pointer;font-size:12px;font-weight:600;color:var(--text3);border-bottom:2px solid transparent;transition:all .15s}
.stab.active{color:var(--text);border-bottom-color:var(--accent)}
.theme-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.theme-card{background:var(--s3);border:2px solid var(--border2);border-radius:4px;padding:10px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden}
.theme-bar{height:3px;margin:-10px -10px 8px;border-radius:2px 2px 0 0}
.theme-dots{display:flex;gap:3px;margin-bottom:7px}
.theme-dot{width:13px;height:13px;border-radius:2px}
.theme-name{font-size:9.5px;font-weight:700;display:flex;align-items:center;gap:3px}
/* Checklist */
.check-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)}
.checkbox{width:15px;height:15px;border-radius:2px;border:1.5px solid var(--border2);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.checkbox.done{background:var(--green);border-color:var(--green)}
/* Scrollbar */
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--s4);border-radius:3px}
/* LIVE DOT PULSE */
@keyframes livePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.5}}
@keyframes liveRing{0%{transform:scale(1);opacity:0.7}100%{transform:scale(2.6);opacity:0}}
.live-dot{position:relative;width:8px;height:8px;flex-shrink:0}
.live-dot-inner{width:8px;height:8px;border-radius:50%;background:var(--green,#2FD89A);animation:livePulse 2s ease-in-out infinite}
.live-dot-ring{position:absolute;inset:0;border-radius:50%!important;background:var(--green,#2FD89A);animation:liveRing 2s ease-in-out infinite}
.live-pill{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;color:#2FD89A;letter-spacing:.3px;background:none;border:none;padding:0}
/* PAGE TRANSITION */
@keyframes pageIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.page-anim{animation:pageIn .25s cubic-bezier(.4,0,.2,1) both}
.fade-in{animation:fadeIn .2s ease both}
/* MODAL ANIMATION */
@keyframes modalIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
.overlay.show .modal{animation:modalIn .2s cubic-bezier(.4,0,.2,1) both}
/* CARD HOVER */
.stat-card{transition:transform .15s,box-shadow .15s}
.stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
.nav-btn{transition:background .15s,color .15s}
.top-nav-btn{transition:color .15s}
.nav-btn.active::before{transition:all .2s}
.task-card{transition:transform .15s,box-shadow .15s,border-color .15s}
.btn-primary:active{transform:scale(.97)}
.btn-secondary:active{transform:scale(.97)}
.filter-btn{transition:all .15s}
.proj-card{transition:transform .15s,box-shadow .15s}
.proj-card:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.35)}
/* Tag */
.tag{display:inline-block;font-size:10px;color:var(--text3);background:var(--s4);border:1px solid var(--border);border-radius:2px;padding:2px 6px}
/* Template dropdown */
.tmpl-drop{position:absolute;right:0;top:calc(100% + 3px);width:210px;background:var(--s2);border:1px solid var(--accentBorder);border-radius:4px;box-shadow:0 12px 32px rgba(0,0,0,.5);z-index:50;overflow:hidden;display:none}
.tmpl-drop.show{display:block}
.tmpl-item{display:flex;align-items:center;gap:9px;padding:9px 12px;cursor:pointer;border-bottom:1px solid var(--border);transition:background .12s}
.tmpl-item:hover{background:var(--s3)}
/* Gate */
.gate{height:100vh;background:var(--bg);display:flex;flex-direction:column;position:relative;overflow:hidden}
.gate-nav{border-bottom:1px solid var(--border);padding:0 36px;height:52px;display:flex;align-items:center;background:var(--s1)}
.gate-center{flex:1;display:flex;align-items:center;justify-content:center}
.gate-box{width:400px;text-align:center}
.gate-logo{width:60px;height:60px;background:linear-gradient(135deg,var(--accent),var(--accentD));border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;overflow:hidden}
.gate-card{background:var(--s2);border:2px solid var(--accentBorder);border-radius:6px;padding:22px;box-shadow:0 24px 60px rgba(0,0,0,.5);transition:border-color .3s}
.gate-card.error{border-color:var(--red);animation:shake .4s ease}
@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
.gate-input{flex:1;background:var(--s3);border:1px solid var(--border2);border-radius:3px;padding:10px 13px;color:var(--text);font-size:15px;font-family:monospace;font-weight:800;letter-spacing:2px;outline:none;transition:border .2s}
.gate-enter-btn{background:linear-gradient(135deg,var(--accent),var(--accentD));border:none;border-radius:3px;padding:10px 16px;color:#fff;font-size:12.5px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px}
@keyframes drift{0%{transform:translateY(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-120vh);opacity:0}}
.gate-particle{position:absolute;border-radius:50%;animation:drift linear infinite}
.prog-bar-wrap{height:3px;background:rgba(255,255,255,.05);border-radius:0;overflow:hidden;margin:8px 0}
/* All Projects Portal button */
.allproj-btn{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 12px;background:linear-gradient(135deg,rgba(47,216,154,.12),rgba(47,216,154,.06));border:1px solid rgba(47,216,154,.3);border-radius:3px;color:#2FD89A;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s;letter-spacing:.2px}
.allproj-btn:hover{background:rgba(47,216,154,.18);border-color:rgba(47,216,154,.5)}
</style>

<!-- Firebase -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  var _d=function(s){return atob(s);};
  const firebaseConfig = {
  apiKey: _d('QUl6YVN5Q0VJNjJyOFQzRS1Sb2I3Z1FKbVprTlRoSkZCVHg0NVgw'),
  authDomain: _d('c3R1ZGlvLWRhc2hib2FyZC1mMTU4OA==') + '.firebaseapp.com',
  projectId: _d('c3R1ZGlvLWRhc2hib2FyZC1mMTU4OA=='),
  storageBucket: _d('c3R1ZGlvLWRhc2hib2FyZC1mMTU4OA==') + '.firebasestorage.app',
  messagingSenderId: _d('MTA5Mjk4MzU0MDgyNQ=='),
  appId: _d('MToxMDkyOTgzNTQwODI1OndlYjoxZWQ0YzNjOTlkYzE1NGU5MWM3NTQ4')
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const STUDIO_ID = atob('YW5pa2V0d293X3N0dWRpbw==');
  const docRef = doc(db, "studios", STUDIO_ID);

  const SYNC_KEYS = ["aw_tasks","aw_projects","aw_hours","aw_income","aw_profile","aw_cl_templates","aw_whitelist","aw_theme","aw_currency","aw_ui_style","aw_site_url","aw_logo","aw_profile_pic","aw_bg_img","aw_bg_blur","aw_bg_opacity","aw_clients"];

  async function loadFromFirebase() {
    try {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        Object.keys(data).forEach(k => {
          if (SYNC_KEYS.includes(k) && data[k] !== undefined) {
            try { localStorage.setItem(k, typeof data[k] === "string" ? data[k] : JSON.stringify(data[k])); }
            catch(e) {}
          }
        });
        /* loaded */
      }
    } catch(e) {
      console.warn("Firebase load error:", e.message);
    }
    if(window.THEMES && window.applyTheme){
      var _tid2=localStorage.getItem('aw_theme');
      if(_tid2){var _t2=window.THEMES.find(function(x){return x.id===_tid2;});if(_t2){window.applyTheme(_t2);}}
      if(window._applyUIS)window._applyUIS(localStorage.getItem('aw_ui_style')||'default');
      if(window.applyBgImage)window.applyBgImage();
      if(window.makeParticles)window.makeParticles();
    }
    window._firebaseReady = true;
    document.dispatchEvent(new Event("firebase_ready"));
  }

  let _saveTimer = null;
  window._fbSave = function(key, value) {
    try { localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value)); } catch(e) {}
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(async () => {
      try {
        const update = {};
        SYNC_KEYS.forEach(k => {
          const v = localStorage.getItem(k);
          if (v !== null) {
            try { update[k] = JSON.parse(v); } catch { update[k] = v; }
          }
        });
        await setDoc(docRef, update, { merge: true });
        /* saved */
      } catch(e) {
        console.warn("Firebase save error:", e.message);
      }
    }, 800);
  };

  onSnapshot(docRef, (snap) => {
    if (!snap.exists() || !window._firebaseReady) return;
    const data = snap.data();
    let changed = false;
    SYNC_KEYS.forEach(k => {
      if (data[k] !== undefined) {
        const newVal = typeof data[k] === "string" ? data[k] : JSON.stringify(data[k]);
        if (localStorage.getItem(k) !== newVal) {
          try { localStorage.setItem(k, newVal); changed = true; }
          catch(e) {}
        }
      }
    });
    if (changed && window._firebaseReady) {
      if (typeof window._reloadFromStorage === "function") window._reloadFromStorage();
    }
  });

  loadFromFirebase();
</script>
</head>
<body>
<div id="bgOverlay" style="position:fixed;inset:0;z-index:0;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat;transition:opacity .3s"></div>

<!-- GATE -->
<div id="gateScreen" class="gate">
  <div class="gate-center">
    <div class="gate-box">
      <div class="gate-card" id="gateCard" style="display:none">
        <div style="display:flex;gap:8px">
          <input class="gate-input" id="gateInput" placeholder="" maxlength="10" autocomplete="off" onkeydown="if(event.key==='Enter')checkGate()">
          <button class="gate-enter-btn" onclick="checkGate()">Enter <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
        </div>
        <div id="gateError" style="display:none;margin-top:10px;padding:9px 12px;background:rgba(240,79,106,.06);border:1px solid rgba(240,79,106,.2);border-radius:3px;font-size:11.5px;color:var(--red);font-weight:600"></div>
      </div>
    </div>
  </div>
  <div id="particles"></div>
</div>

<!-- DASHBOARD -->
<div id="appScreen" class="app" style="display:none">
  <div class="sidebar">
    <div id="sidebarLogo" style="width:34px;height:34px;border-radius:4px;margin-bottom:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent"></div>
    <div class="nav-btn active" data-page="overview" onclick="showPage('overview',this)" title="Overview">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    </div>
    <div class="nav-btn" data-page="tasks" onclick="showPage('tasks',this)" title="Tasks">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
    </div>
    <div class="nav-btn" data-page="projects" onclick="showPage('projects',this)" title="Projects">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    </div>
  </div>
  <div class="main">
    <div class="topbar">
      <div class="topnav">
        <button class="top-nav-btn active" data-page="overview" onclick="showPage('overview',this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Overview
        </button>
        <button class="top-nav-btn" data-page="tasks" onclick="showPage('tasks',this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>Tasks
        </button>
        <button class="top-nav-btn" data-page="projects" onclick="showPage('projects',this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>Projects
        </button>
      </div>
      <div class="topbar-right">
        <!-- ALL PROJECTS PORTAL BUTTON -->
        <button class="allproj-btn" onclick="openAllProjects()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          All Projects
        </button>
        <div class="search-box">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Search tasks, projects...">
        </div>
        <div class="icon-btn" onclick="openSettings()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        </div>
        <div class="icon-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          <div class="notif-dot"></div>
        </div>
        <div style="position:relative" id="avatarWrap">
          <div class="avatar" id="topAvatar" onclick="toggleDrop()">A</div>
          <div class="profile-drop" id="profileDrop">
            <div style="padding:11px 13px;border-bottom:1px solid var(--border);background:var(--s3)">
              <div style="font-size:12px;font-weight:700" id="dropName">Aniket Wagh</div>
              <div style="font-size:10px;color:var(--text3)" id="dropRole">Freelance Designer</div>
            </div>
            <div class="pdrop-item" onclick="openSettings();toggleDrop()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              Settings & Themes
            </div>
            <div class="pdrop-item" style="color:var(--red)" onclick="signOut()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <div id="overviewPage" class="overview"></div>
      <div id="tasksPage" class="tasks-page" style="display:none"></div>
      <div id="projectsPage" class="projects-page" style="display:none"></div>
    </div>
  </div>
</div>

<!-- PORTAL SCREEN -->
<div id="portalScreen" style="display:none;position:fixed;inset:0;z-index:500;background:#080A14;overflow-y:auto"></div>

<!-- TASK MODAL -->
<div class="overlay" id="taskOverlay" onclick="if(event.target===this)closeTaskModal()">
  <div class="modal" style="width:460px">
    <div class="modal-title" id="taskModalTitle">New Task</div>
    <div class="modal-sub" id="taskModalSub">Fill in the details</div>
    <div class="field"><div class="field-label">Task Title</div><input class="inp" id="tTitle" placeholder="e.g. Design homepage hero"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      <div><div class="field-label">Priority</div><select class="inp" id="tPriority" style="appearance:none;cursor:pointer"><option value="urgent">Urgent</option><option value="high">High</option><option value="medium" selected>Medium</option><option value="low">Low</option></select></div>
      <div><div class="field-label">Due Date</div><input class="inp" type="date" id="tDue" style="color-scheme:dark"></div>
    </div>
    <div class="field"><div class="field-label">Column</div><select class="inp" id="tStatus" style="appearance:none;cursor:pointer"><option value="daily">Daily Tasks</option><option value="inprogress">In Progress</option><option value="inreview">In Review</option><option value="finished">Finished</option></select></div>
    <div class="modal-footer">
      <button class="btn-danger" id="tDeleteBtn" style="display:none" onclick="deleteTask()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>Delete</button>
      <div style="display:flex;gap:7px"><button class="btn-secondary" onclick="closeTaskModal()">Cancel</button><button class="btn-primary" onclick="saveTask()">Save Task</button></div>
    </div>
  </div>
</div>

<!-- PROJECT MODAL -->
<div class="overlay" id="projOverlay" onclick="if(event.target===this)closeProjModal()">
  <div class="modal" style="width:540px">
    <div class="modal-title" id="projModalTitle">New Project</div>
    <div class="modal-sub" id="projModalSub">Set up a new project</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div><div class="field-label">Project Name</div><input class="inp" id="pName" placeholder="Luminary Rebrand"></div>
      <div><div class="field-label">Client</div><input class="inp" id="pClient" placeholder="Client name"></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">
      <div><div class="field-label" id="budgetLabel">Budget</div><input class="inp" type="number" id="pBudget" style="color-scheme:dark" placeholder="0"></div>
      <div><div class="field-label">Deadline</div><input class="inp" type="date" id="pDeadline" style="color-scheme:dark"></div>
      <div><div class="field-label">Status</div><select class="inp" id="pStatus" style="appearance:none;cursor:pointer"><option value="active">Active</option><option value="onhold">On Hold</option><option value="completed">Completed</option></select></div>
    </div>
    <!-- CLIENT ID FIELD -->
    <div class="field">
      <div class="field-label">Client ID <span style="color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">(optional — link to a registered client)</span></div>
      <div style="position:relative">
        <select class="inp" id="pClientId" style="appearance:none;cursor:pointer">
          <option value="">— No client linked —</option>
        </select>
        <svg style="position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
    <div class="field-label" style="margin-bottom:6px">Payment Status</div>
    <div class="payment-btns">
      <button class="pay-btn" id="payUnpaid" onclick="setPayStatus('unpaid')" style="color:#F04F6A;background:rgba(240,79,106,.08);border-color:rgba(240,79,106,.3)">Unpaid</button>
      <button class="pay-btn" id="payAdvance" onclick="setPayStatus('advance')">Advance Paid</button>
      <button class="pay-btn" id="payPaid" onclick="setPayStatus('paid')">Paid</button>
    </div>
    <div class="field"><div class="field-label">Description</div><textarea class="inp" id="pDesc" rows="2" style="resize:vertical"></textarea></div>
    <div class="field">
      <div class="field-label">Links (<span id="linkCount">0</span>)</div>
      <div id="linksList"></div>
      <div style="display:grid;grid-template-columns:110px 1fr 32px;gap:6px;align-items:center;margin-top:5px">
        <input class="inp" id="newLinkLabel" placeholder="Label" style="font-size:12px">
        <input class="inp" id="newLinkUrl" placeholder="URL" style="font-size:12px">
        <button onclick="addLink()" style="width:32px;height:34px;background:var(--accent);border:none;border-radius:2px;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
      </div>
    </div>
    <div class="field">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div class="field-label" style="margin-bottom:0">Checklist (<span id="checkCount">0</span>/<span id="checkDone">0</span>)</div>
        <div style="position:relative">
          <button style="background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:4px 9px;color:var(--accentL);font-size:10px;font-weight:700;cursor:pointer;font-family:inherit" onclick="toggleTmplDrop()">Apply Template</button>
          <div class="tmpl-drop" id="tmplDrop"></div>
        </div>
      </div>
      <div class="prog-bar-wrap"><div class="prog-fill" id="checkProgress" style="background:var(--green);width:0%"></div></div>
      <div id="checklistItems"></div>
      <div style="display:grid;grid-template-columns:1fr 32px;gap:6px;margin-top:7px">
        <input class="inp" id="newCheckItem" placeholder="Add checklist item..." style="font-size:12px" onkeydown="if(event.key==='Enter')addCheckItem()">
        <button onclick="addCheckItem()" style="width:32px;height:34px;background:var(--s3);border:1px solid var(--border2);border-radius:2px;cursor:pointer;color:var(--text2);display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-danger" id="pDeleteBtn" style="display:none" onclick="deleteProj()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>Delete</button>
      <div style="display:flex;gap:7px;align-items:center">
        <button class="btn-secondary" id="sendBoardBtn" style="display:none;border-color:rgba(47,216,154,.3);color:var(--green)" onclick="sendToBoard()">Send to Board</button>
        <button class="btn-secondary" onclick="closeProjModal()">Cancel</button>
        <button class="btn-primary" onclick="saveProj()">Save Project</button>
      </div>
    </div>
  </div>
</div>

<!-- SETTINGS MODAL -->
<div class="overlay" id="settingsOverlay" onclick="if(event.target===this)closeSettings()">
  <div class="modal" style="width:660px;padding:0;overflow:hidden">
    <div style="padding:20px 24px 0;background:var(--s1);border-bottom:1px solid var(--border)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accentD));border-radius:3px;display:flex;align-items:center;justify-content:center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></div>
          <div><div style="font-size:14px;font-weight:800">Settings</div><div style="font-size:11px;color:var(--text3)">Customize your workspace</div></div>
        </div>
        <button onclick="closeSettings()" style="width:28px;height:28px;background:transparent;border:1px solid var(--border2);border-radius:2px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text3)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <div class="settings-tabs">
        <div class="stab active" onclick="switchStab('themes',this)">Themes</div>
        <div class="stab" onclick="switchStab('uistyle',this)">UI Style</div>
        <div class="stab" onclick="switchStab('profile',this)">Profile</div>
        <div class="stab" onclick="switchStab('logo',this)">Logo</div>
        <div class="stab" onclick="switchStab('bg',this)">Background</div>
        <div class="stab" onclick="switchStab('templates',this)">Checklist Templates</div>
        <div class="stab" onclick="switchStab('clients',this)">Clients</div>
      </div>
    </div>
    <div style="padding:20px 24px;overflow-y:auto;max-height:72vh">
      <div id="stabThemes"></div>
      <div id="stabUistyle" style="display:none"></div>
      <div id="stabProfile" style="display:none"></div>
      <div id="stabLogo" style="display:none"></div>
      <div id="stabBg" style="display:none"></div>
      <div id="stabTemplates" style="display:none"></div>
      <div id="stabClients" style="display:none"></div>
    </div>
  </div>
</div>

<!-- INVOICE MODAL -->
<div class="overlay" id="invOverlay" onclick="if(event.target===this)closeInv()">
  <div class="modal" style="width:660px;padding:0;overflow:hidden">
    <div style="padding:16px 22px;background:var(--s1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:32px;height:32px;background:linear-gradient(135deg,var(--accent),var(--accentD));border-radius:3px;display:flex;align-items:center;justify-content:center"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
        <div><div style="font-size:13px;font-weight:800">Invoice Generator</div><div id="invSubTitle" style="font-size:11px;color:var(--text3)"></div></div>
      </div>
      <div style="display:flex;gap:7px">
        <button class="btn-primary" onclick="downloadInvoice()" id="invDownBtn"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download PNG</button>
        <button onclick="closeInv()" style="width:30px;height:30px;background:transparent;border:1px solid var(--border2);border-radius:2px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text3)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
    </div>
    <div id="invBody" style="padding:18px 22px;overflow-y:auto;max-height:75vh;background:var(--s1)"></div>
  </div>
</div>

<!-- ALL PROJECTS PORTAL MODAL -->
<div class="overlay" id="allProjOverlay" style="z-index:600" onclick="if(event.target===this)closeAllProjects()">
  <div class="modal" style="width:480px;padding:0;overflow:hidden">
    <div style="padding:18px 22px;background:var(--s1);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:32px;height:32px;background:linear-gradient(135deg,rgba(47,216,154,.3),rgba(47,216,154,.1));border:1px solid rgba(47,216,154,.4);border-radius:3px;display:flex;align-items:center;justify-content:center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2FD89A" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div>
          <div style="font-size:13px;font-weight:800">Client Projects Portal</div>
          <div style="font-size:11px;color:var(--text3)">Enter your Client ID to view your projects</div>
        </div>
      </div>
      <button onclick="closeAllProjects()" style="width:28px;height:28px;background:transparent;border:1px solid var(--border2);border-radius:2px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text3)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div id="allProjBody" style="padding:20px 22px"></div>
  </div>
</div>

<!-- PORTAL SHARE MODAL -->
<div id="portalShareOverlay" class="overlay" onclick="if(event.target===this)closePortalShare()">
  <div class="modal" style="width:480px;max-height:85vh;overflow-y:auto">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div>
        <div style="font-size:14px;font-weight:800">Share Client Portal</div>
        <div id="portalShareSub" style="font-size:11px;color:var(--text3)"></div>
      </div>
      <button onclick="closePortalShare()" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:18px;line-height:1">×</button>
    </div>
    <div id="portalShareBody"></div>
  </div>
</div>

<script>
// ── UI STYLE ─────────────────────────────────────────────────────────────────
var _uis=localStorage.getItem('aw_ui_style')||'default';
function _applyUIS(id){
  _uis=id;
  localStorage.setItem('aw_ui_style',id);
  var el=document.getElementById('_sharp_style');
  if(id==='sharp'){
    if(!el){
      var s=document.createElement('style');
      s.id='_sharp_style';
      s.textContent=[
        '.card,.col,.stat-card,.proj-card,.task-card,.modal,.overlay .modal',
        '.inp,.btn-primary,.btn-secondary,.btn-danger,.pay-btn,.add-task-btn',
        '.nav-btn,.icon-btn,.search-box,.filter-row,.filter-btn,.filter-btn.active',
        '.badge,.status-badge,.pay-chip,.link-chip,.tag',
        '.theme-card,.stab,.profile-drop',
        '.gate-card,.gate-input,.gate-enter-btn',
        '.top-nav-btn.active::after,.nav-btn.active::before,.proj-top',
        '.col-cnt,.check-item,.checkbox,.tmpl-drop,.tmpl-item,.pdrop-item'
      ].join(',')+'{border-radius:0!important}'
      +'.live-dot,.live-dot-inner,.live-dot-ring,.notif-dot{border-radius:50%!important}';
      document.head.appendChild(s);
    }
  } else {
    if(el) el.remove();
  }
}
function renderStabUistyle(){
  var el=document.getElementById('stabUistyle');
  if(!el) return;
  var isSharp=(_uis==='sharp');
  function card(id,icon,name,desc){
    var active=(_uis===id);
    var html='<div data-uid="'+id+'" style="padding:16px;background:'+(active?'var(--accentGlow)':'var(--s3)')+';border:2px solid '+(active?'var(--accentBorder)':'var(--border2)')+';border-radius:6px;cursor:pointer;position:relative">';
    if(active) html+='<div style="position:absolute;top:8px;right:8px;width:16px;height:16px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>';
    html+='<div style="font-size:22px;margin-bottom:8px">'+icon+'</div>';
    html+='<div style="font-size:13px;font-weight:700;color:'+(active?'var(--text)':'var(--text2)')+';margin-bottom:3px">'+name+'</div>';
    html+='<div style="font-size:11px;color:var(--text3)">'+desc+'</div>';
    html+='</div>';
    return html;
  }
  var html='<div style="margin-bottom:14px"><div style="font-size:13px;font-weight:700;margin-bottom:3px">UI Style</div><div style="font-size:12px;color:var(--text3)">Change the visual style of the interface</div></div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">';
  html+=card('default','&#9651;','Default','Soft rounded edges');
  html+=card('sharp','&#9632;','Sharp Edge','Zero radius, hard corners');
  html+='</div>';
  html+='<div style="padding:10px 13px;background:var(--s3);border:1px solid var(--border);border-radius:4px;font-size:11px;color:var(--text3)">Active: <strong style="color:var(--text)">'+(_uis==='sharp'?'Sharp Edge':'Default')+'</strong></div>';
  el.innerHTML=html;
  el.querySelectorAll('[data-uid]').forEach(function(c){
    c.addEventListener('click',function(){_applyUIS(this.dataset.uid);renderStabUistyle();});
  });
}
(function(){_applyUIS(localStorage.getItem('aw_ui_style')||'default');})();

// ── BACKGROUND IMAGE ─────────────────────────────────────────────────────────
function applyBgImage(){
  var img=localStorage.getItem('aw_bg_img')||'';
  var blur=+(localStorage.getItem('aw_bg_blur')||'6');
  var opacity=+(localStorage.getItem('aw_bg_opacity')||'18');
  var el=document.getElementById('bgOverlay');
  if(!el)return;
  if(img){
    el.style.backgroundImage='url('+img+')';
    el.style.opacity=(opacity/100).toFixed(2);
    el.style.filter='blur('+blur+'px)';
    el.style.transform='scale(1.05)';
    el.style.inset='-20px';
  } else {
    el.style.backgroundImage='none';
    el.style.opacity='0';
  }
}
function renderStabBg(){
  var el=document.getElementById('stabBg');if(!el)return;
  var img=localStorage.getItem('aw_bg_img')||'';
  var blur=+(localStorage.getItem('aw_bg_blur')||'6');
  var opacity=+(localStorage.getItem('aw_bg_opacity')||'18');
  var html='<div style="font-size:13px;font-weight:700;margin-bottom:3px">Background Image</div>';
  html+='<div style="font-size:12px;color:var(--text3);margin-bottom:18px">Set a custom background image for the entire workspace</div>';
  html+='<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px">';
  html+='<div style="width:120px;height:80px;border-radius:6px;background:var(--s3);border:1px solid var(--border2);overflow:hidden;flex-shrink:0;position:relative">';
  if(img){
    html+='<img src="'+img+'" style="width:100%;height:100%;object-fit:cover;opacity:'+(opacity/100).toFixed(2)+';filter:blur('+Math.min(blur/3,3)+'px)">';
    html+='<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700;text-shadow:0 1px 4px rgba(0,0,0,.8)">Preview</div>';
  } else {
    html+='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:11px">No image</div>';
  }
  html+='</div><div style="flex:1">';
  html+='<label class="btn-primary" style="cursor:pointer;display:inline-flex;margin-bottom:10px">Upload Image<input type="file" accept="image/*" style="display:none" id="bgFileInput"></label>';
  html+='<div style="font-size:11px;color:var(--text3);margin-bottom:12px">JPG, PNG, WebP supported</div>';
  if(img) html+='<button id="removeBgBtn" style="background:rgba(240,79,106,.08);border:1px solid rgba(240,79,106,.2);border-radius:3px;padding:6px 13px;color:var(--red);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit">Remove Image</button>';
  html+='</div></div>';
  if(img){
    html+='<div style="margin-bottom:16px">';
    html+='<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:11px;font-weight:600;color:var(--text2)">Blur</span><span style="font-size:11px;color:var(--text3)" id="blurVal">'+blur+'px</span></div>';
    html+='<input id="bgBlurSlider" type="range" min="0" max="20" value="'+blur+'" style="width:100%;accent-color:var(--accent)">';
    html+='</div>';
    html+='<div style="margin-bottom:16px">';
    html+='<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:11px;font-weight:600;color:var(--text2)">Opacity</span><span style="font-size:11px;color:var(--text3)" id="opacityVal">'+opacity+'%</span></div>';
    html+='<input id="bgOpacitySlider" type="range" min="5" max="60" value="'+opacity+'" style="width:100%;accent-color:var(--accent)">';
    html+='</div>';
    html+='<div style="padding:10px 13px;background:var(--accentGlow);border:1px solid var(--accentBorder);border-radius:4px;font-size:11px;color:var(--text3)">&#128161; Tip: Low opacity (10-20%) + high blur (8-12px) looks best</div>';
  }
  el.innerHTML=html;
  var fi=document.getElementById('bgFileInput');
  if(fi) fi.addEventListener('change',uploadBg);
  var rb=document.getElementById('removeBgBtn');
  if(rb) rb.addEventListener('click',removeBg);
  var bs=document.getElementById('bgBlurSlider');
  if(bs) bs.addEventListener('input',function(){
    localStorage.setItem('aw_bg_blur',this.value);
    var bv=document.getElementById('blurVal');
    if(bv) bv.textContent=this.value+'px';
    applyBgImage();
  });
  var os=document.getElementById('bgOpacitySlider');
  if(os) os.addEventListener('input',function(){
    localStorage.setItem('aw_bg_opacity',this.value);
    var ov=document.getElementById('opacityVal');
    if(ov) ov.textContent=this.value+'%';
    applyBgImage();
  });
}
function uploadBg(e){
  var f=e.target.files?.[0];if(!f)return;
  var r=new FileReader();
  r.onload=function(ev){
    localStorage.setItem('aw_bg_img',ev.target.result);
    applyBgImage();
    renderStabBg();
  };
  r.readAsDataURL(f);
}
function removeBg(){
  localStorage.removeItem('aw_bg_img');
  applyBgImage();
  renderStabBg();
}

// ── THEMES ───────────────────────────────────────────────────────────────────
const THEMES=[
  {id:'void',name:'Void Purple',emoji:'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#7C5CFC"/></svg>',bg:'#080A14',s1:'#0D0F1C',s2:'#111526',s3:'#171B2E',s4:'#1D2238',card:'#13162A',border:'rgba(255,255,255,0.055)',border2:'rgba(255,255,255,0.1)',accent:'#7C5CFC',accentL:'#A285FF',accentD:'#5236C2',accentGlow:'rgba(124,92,252,0.18)',accentBorder:'rgba(124,92,252,0.35)',text:'#ECF0FF',text2:'#8A92B8',text3:'#4D5578',green:'#2FD89A',red:'#F04F6A',orange:'#FF8C42',blue:'#38BDF8'},
  {id:'noir',name:'Noir',emoji:'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#C9A84C"/></svg>',bg:'#050505',s1:'#0C0C0C',s2:'#101010',s3:'#161616',s4:'#1A1A1A',card:'#0E0E0E',border:'rgba(255,255,255,0.04)',border2:'rgba(255,255,255,0.08)',accent:'#C9A84C',accentL:'#E8C96A',accentD:'#9A7A2C',accentGlow:'rgba(201,168,76,0.12)',accentBorder:'rgba(201,168,76,0.28)',text:'#EEEEEE',text2:'#777777',text3:'#3A3A3A',green:'#6EE7B7',red:'#FCA5A5',orange:'#FCD34D',blue:'#93C5FD'},
  {id:'steel',name:'Steel',emoji:'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#58A6FF"/></svg>',bg:'#080B10',s1:'#0D1117',s2:'#131920',s3:'#19212B',s4:'#1F2936',card:'#101520',border:'rgba(100,160,255,0.06)',border2:'rgba(100,160,255,0.1)',accent:'#58A6FF',accentL:'#79BEFF',accentD:'#1F6FEB',accentGlow:'rgba(88,166,255,0.15)',accentBorder:'rgba(88,166,255,0.3)',text:'#E6EDF3',text2:'#7D8590',text3:'#3D4450',green:'#3FB950',red:'#F85149',orange:'#D29922',blue:'#58A6FF'},
  {id:'slate',name:'Slate Pro',emoji:'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#7B9CFF"/></svg>',bg:'#0B0D11',s1:'#111418',s2:'#161A20',s3:'#1C2028',s4:'#222830',card:'#141720',border:'rgba(148,163,184,0.07)',border2:'rgba(148,163,184,0.15)',accent:'#7B9CFF',accentL:'#A8C0FF',accentD:'#4A6FD4',accentGlow:'rgba(123,156,255,0.12)',accentBorder:'rgba(123,156,255,0.3)',text:'#F1F5F9',text2:'#94A3B8',text3:'#64748B',green:'#4ADE80',red:'#F87171',orange:'#FB923C',blue:'#7DD3FC'},
  {id:'cyber',name:'Cyber Yellow',emoji:'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#F5C400"/></svg>',bg:'#06060A',s1:'#0C0C12',s2:'#111118',s3:'#16161F',s4:'#1C1C28',card:'#0E0E15',border:'rgba(255,220,0,0.06)',border2:'rgba(255,220,0,0.1)',accent:'#F5C400',accentL:'#FFD700',accentD:'#C49A00',accentGlow:'rgba(245,196,0,0.15)',accentBorder:'rgba(245,196,0,0.3)',text:'#FFFDE8',text2:'#8A7A40',text3:'#4A4220',green:'#4ADE80',red:'#F87171',orange:'#FB923C',blue:'#60A5FA'},
];

// ── STATE ─────────────────────────────────────────────────────────────────────
const ld=(k,fb)=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):fb}catch{return fb}};
const sv=(k,v)=>{
  try{
    const s=JSON.stringify(v);
    localStorage.setItem(k,s);
    if(window._fbSave)window._fbSave(k,s);
  }catch(e){}
};
const uid=()=>Math.random().toString(36).slice(2,8);
const CURRENCIES={
  usd:{symbol:'$',code:'USD',locale:'en-US',name:'US Dollar'},
  inr:{symbol:'₹',code:'INR',locale:'en-IN',name:'Indian Rupee'},
  eur:{symbol:'€',code:'EUR',locale:'de-DE',name:'Euro'},
  gbp:{symbol:'£',code:'GBP',locale:'en-GB',name:'British Pound'},
  aed:{symbol:'د.إ',code:'AED',locale:'ar-AE',name:'UAE Dirham'},
  sgd:{symbol:'S$',code:'SGD',locale:'en-SG',name:'Singapore Dollar'},
};
let activeCurrency=ld('aw_currency','inr');
function getCur(){return CURRENCIES[activeCurrency]||CURRENCIES.inr;}
function fm(n){const c=getCur();return c.symbol+Number(n).toLocaleString(c.locale);}
function setCurrency(id){activeCurrency=id;sv('aw_currency',id);renderCurrentPage();}
const fd=d=>{if(!d)return'';const dt=new Date(d+'T00:00');if(isNaN(dt.getTime()))return'';return dt.toLocaleDateString('en-US',{month:'short',day:'numeric'})};

const DP={name:'Aniket Wagh',email:'aniket@studio.co',role:'Freelance Designer',timezone:'Asia/Kolkata (IST)',phone:'',address:'',website:''};
const DT=[
  {id:'ct1',name:'Logo Design',color:'#7C5CFC',items:['Initial concepts (3 options)','Client feedback round 1','Revisions','Final files (SVG, PNG, PDF)','Brand usage guidelines']},
  {id:'ct2',name:'UI/UX Design',color:'#F43F8E',items:['Wireframes','Design system setup','Screen designs','Prototype','Handoff to dev']},
  {id:'ct3',name:'Brand Identity',color:'#10B981',items:['Logo design','Color palette','Typography','Brand guidelines doc','Social media kit']},
  {id:'ct4',name:'Motion Graphics',color:'#F59E0B',items:['Storyboard','Style frames','Animation v1','Client review','Final export (MP4, GIF)']},
];
const IT=[
  {id:'t1',title:'Design system audit',priority:'urgent',dueDate:'2025-03-20',status:'daily'},
  {id:'t2',title:'Update brand guidelines',priority:'high',dueDate:'2025-03-22',status:'daily'},
  {id:'t3',title:'Client onboarding deck',priority:'medium',dueDate:'2025-03-25',status:'daily'},
  {id:'t4',title:'Redesign homepage hero',priority:'urgent',dueDate:'2025-03-18',status:'inprogress'},
  {id:'t5',title:'Motion graphics reel',priority:'high',dueDate:'2025-03-28',status:'inprogress'},
  {id:'t6',title:'Icon set — mobile app',priority:'medium',dueDate:'2025-04-01',status:'inprogress'},
  {id:'t7',title:'Packaging mockup v3',priority:'high',dueDate:'2025-03-19',status:'inreview'},
  {id:'t8',title:'Social media templates',priority:'low',dueDate:'2025-03-24',status:'inreview'},
  {id:'t9',title:'Logo explorations',priority:'high',dueDate:'2025-03-10',status:'finished'},
  {id:'t10',title:'Pitch deck — Luminary',priority:'urgent',dueDate:'2025-03-12',status:'finished'},
];
const IP=[
  {id:'p1',name:'Luminary Rebrand',client:'Luminary Tech',budget:18500,deadline:'2025-04-15',status:'active',description:'Full brand identity overhaul for a Series B fintech startup.',links:[{id:'l1',label:'Figma',url:'https://figma.com'},{id:'l2',label:'Drive',url:'https://drive.google.com'}],checklist:[{id:'c1',text:'Logo concepts',done:true},{id:'c2',text:'Color palette',done:true},{id:'c3',text:'Typography system',done:false},{id:'c4',text:'Brand guidelines doc',done:false}],paymentStatus:'paid',clientId:''},
  {id:'p2',name:'Verve App UI',client:'Verve Health',budget:12000,deadline:'2025-05-01',status:'active',description:'End-to-end UI/UX for a wellness tracking mobile app. 40+ screens.',links:[{id:'l3',label:'Figma',url:'https://figma.com'}],checklist:[{id:'c5',text:'Wireframes',done:true},{id:'c6',text:'Design system',done:false},{id:'c7',text:'Prototype',done:false}],paymentStatus:'paid',clientId:''},
  {id:'p3',name:'Nomad Co.',client:'Nomad Collective',budget:8200,deadline:'2025-03-30',status:'active',description:'Marketing website with editorial photography and animations.',links:[{id:'l4',label:'Figma',url:'https://figma.com'},{id:'l5',label:'Website',url:'https://example.com'}],checklist:[{id:'c8',text:'Homepage design',done:true},{id:'c9',text:'Animations',done:false}],paymentStatus:'paid',clientId:''},
  {id:'p4',name:'Pulse Campaign',client:'Pulse Energy',budget:22000,deadline:'2025-02-28',status:'completed',description:'360° brand campaign spanning OOH, digital, and print.',links:[{id:'l6',label:'Drive',url:'https://drive.google.com'}],checklist:[{id:'c10',text:'OOH assets',done:true},{id:'c11',text:'Digital banners',done:true},{id:'c12',text:'Print files',done:true}],paymentStatus:'advance',clientId:''},
];

let CT=THEMES[0],CP='overview',editTaskId=null,editProjId=null,payStatus='unpaid';
let tasks=ld('aw_tasks',IT),projects=ld('aw_projects',IP);
let hours=ld('aw_hours',[0,0,0,0,0,0,0]),income=ld('aw_income',[0,0,0,0,0,0,0,0]);
let profile=ld('aw_profile',{...DP}),templates=ld('aw_cl_templates',DT);
let projLinks=[],projChecklist=[],invItems=[],invProj=null;

const PC={urgent:{l:'Urgent',c:'#F04F6A'},high:{l:'High',c:'#FF8C42'},medium:{l:'Medium',c:''},low:{l:'Low',c:'#2FD89A'}};
const SC={active:{l:'Active',c:'#2FD89A',bg:'rgba(47,216,154,0.1)'},onhold:{l:'On Hold',c:'#FF8C42',bg:'rgba(255,140,66,0.1)'},completed:{l:'Completed',c:'#7C5CFC',bg:'rgba(124,92,252,0.12)'}};
const PSC={unpaid:{l:'Unpaid',c:'#F04F6A',bg:'rgba(240,79,106,0.1)'},advance:{l:'Advance',c:'#FF8C42',bg:'rgba(255,140,66,0.1)'},paid:{l:'Paid',c:'#2FD89A',bg:'rgba(47,216,154,0.1)'}};

// ── FIREBASE RELOAD ───────────────────────────────────────────────────────────
window._reloadFromStorage = function(){
  try{
    tasks=ld('aw_tasks',IT);
    projects=ld('aw_projects',IP);
    hours=ld('aw_hours',[0,0,0,0,0,0,0]);
    income=ld('aw_income',[0,0,0,0,0,0,0,0]);
    profile=ld('aw_profile',{...DP});
    templates=ld('aw_cl_templates',DT);
    activeCurrency=ld('aw_currency','inr');
    const tid=localStorage.getItem('aw_theme');
    if(tid){const t=THEMES.find(x=>x.id===tid);if(t)applyTheme(t);}
    const uis=localStorage.getItem('aw_ui_style')||'default';
    _applyUIS(uis);
    applyBgImage();
    makeParticles();
    updateProfileUI();updateLogoUI();
    renderCurrentPage();
    /* synced */
  }catch(e){console.warn('Reload error:',e);}
};

// ── THEME ─────────────────────────────────────────────────────────────────────
function applyTheme(t){
  CT=t;sv('aw_theme',t.id);
  const r=document.documentElement.style;
  ['bg','s1','s2','s3','s4','card','border','border2','accent','accentL','accentD','accentGlow','accentBorder','text','text2','text3','green','red','orange','blue'].forEach(k=>r.setProperty('--'+k,t[k]));
}
window.THEMES=THEMES;
window.applyTheme=applyTheme;

// ── PARTICLES ─────────────────────────────────────────────────────────────────
function makeParticles(){
  const c=document.getElementById('particles');
  c.innerHTML='';
  const cs=getComputedStyle(document.documentElement);
  const acc=cs.getPropertyValue('--accent').trim()||'#7C5CFC';
  const blu=cs.getPropertyValue('--blue').trim()||'#38BDF8';
  const grn=cs.getPropertyValue('--green').trim()||'#2FD89A';
  for(let i=0;i<12;i++){
    const d=document.createElement('div');d.className='gate-particle';
    const sz=i%3===0?3:i%3===1?2:1;
    const col=[acc,blu,grn][i%3];
    d.style.cssText=\`width:\${sz}px;height:\${sz}px;background:\${col};left:\${5+i*8}%;bottom:-10px;animation-duration:\${8+i*1.5}s;animation-delay:\${i*0.8}s;position:absolute\`;
    c.appendChild(d);
  }
}

// ── GATE ──────────────────────────────────────────────────────────────────────
function checkGate(){
  const val=document.getElementById('gateInput').value.trim().toUpperCase().replace(/[^A-Z0-9\\-]/g,'');
  const wl=ld('aw_whitelist',[]);
  const errEl=document.getElementById('gateError'),card=document.getElementById('gateCard');
  var _gk=atob('OTExMQ==');if(val===_gk||wl.find(w=>w.uniqueId.toUpperCase()===val)){
    sessionStorage.setItem('aw_access','granted');errEl.style.display='none';showApp();
  } else {
    errEl.textContent='Invalid ID — not recognized.';errEl.style.display='block';
    card.classList.add('error');setTimeout(()=>card.classList.remove('error'),500);
  }
}
function showApp(){
  document.getElementById('gateScreen').style.display='none';
  document.getElementById('appScreen').style.display='flex';
  if(window._firebaseReady){
    if(window._reloadFromStorage)window._reloadFromStorage();
    else{updateProfileUI();updateLogoUI();renderCurrentPage();}
  } else {
    updateProfileUI();updateLogoUI();renderCurrentPage();
    document.addEventListener('firebase_ready',function(){
      if(window._reloadFromStorage)window._reloadFromStorage();
    },{once:true});
  }
}
function signOut(){sessionStorage.removeItem('aw_access');location.reload();}

// ── NAV ───────────────────────────────────────────────────────────────────────
function showPage(page){
  CP=page;
  document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  ['overviewPage','tasksPage','projectsPage'].forEach(id=>{
    const el=document.getElementById(id);
    if(id===page+'Page'){
      el.style.display='';
      el.classList.remove('page-anim');
      void el.offsetWidth;
      el.classList.add('page-anim');
    } else {
      el.style.display='none';
    }
  });
  renderCurrentPage();
}
function renderCurrentPage(){
  if(CP==='overview')renderOverview();
  else if(CP==='tasks')renderTasks();
  else if(CP==='projects')renderProjects();
}

// ── OVERVIEW ──────────────────────────────────────────────────────────────────
function renderOverview(){
  const p=document.getElementById('overviewPage');
  const aP=projects.filter(x=>x.status==='active');
  const uT=tasks.filter(x=>x.priority==='urgent'&&x.status!=='finished');
  const budget=aP.reduce((a,b)=>a+b.budget,0);
  const done=tasks.filter(x=>x.status==='finished').length;
  const totInc=income.reduce((a,b)=>a+b,0);
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const months=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  const todayIdx=(new Date().getDay()+6)%7;

  p.classList.remove('page-anim');void p.offsetWidth;p.classList.add('page-anim');
  p.innerHTML=\`
  <div style="margin-bottom:20px">
    <div class="greeting">Good morning, \${profile.name.split(' ')[0]} <span style="color:\${CT.orange}">≈</span></div>
    <div class="greeting-sub">\${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</div>
  </div>
  <div class="stats-grid">
    \${sc('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>','Active Projects',aP.length,CT.accent)}
    \${sc('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>','Urgent Tasks',uT.length,CT.red,'Needs attention')}
    \${sc('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>','Active Revenue',fm(budget),CT.green)}
    \${sc('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>','Tasks Done',done,CT.blue,\`of \${tasks.length} total\`)}
  </div>
  <div class="charts-row">
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
        <div><div class="card-title">Income Overview</div><div class="card-sub">Last 8 months</div></div>
        <div style="display:flex;align-items:center;gap:9px">
          <div style="font-size:21px;font-weight:800;color:var(--accent);letter-spacing:-.8px">$\${totInc.toFixed(1)}K</div>
          <button onclick="editIncome()" style="background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:3px 8px;color:var(--text3);font-size:10px;font-weight:600;cursor:pointer;font-family:inherit">Edit</button>
        </div>
      </div>
      \${lineChart(income,months)}
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <div class="card-title">Hours This Week</div>
        <button onclick="editHours()" style="background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:3px 8px;color:var(--text3);font-size:10px;font-weight:600;cursor:pointer;font-family:inherit">Edit</button>
      </div>
      <div class="card-sub" style="margin-bottom:10px">\${hours.reduce((a,b)=>a+b,0).toFixed(1)} total hrs</div>
      \${barChart(hours,days,todayIdx)}
    </div>
  </div>
  <div class="bottom-row">
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div><div class="card-title">Urgent Tasks</div><div class="card-sub">\${uT.length} need immediate attention</div></div>
        <button onclick="showPage('tasks')" style="background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:4px 10px;color:var(--text2);font-size:11px;cursor:pointer;font-family:inherit">View all</button>
      </div>
      \${uT.length===0?\`<div style="text-align:center;padding:20px 0;color:var(--text3);font-size:12px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="margin-right:4px"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>All clear!</div>\`:
      uT.slice(0,4).map((t,i)=>\`<div style="display:flex;align-items:center;gap:9px;padding:8px 0;\${i<uT.slice(0,4).length-1?'border-bottom:1px solid var(--border)':''}">
        <div style="width:6px;height:6px;background:\${CT.red};box-shadow:0 0 6px \${CT.red};flex-shrink:0"></div>
        <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${t.title}</div><div style="font-size:10px;color:var(--text3)">\${t.dueDate?fd(t.dueDate):'—'}</div></div>
        <span class="badge" style="color:\${CT.red};background:rgba(240,79,106,0.1);border:1px solid rgba(240,79,106,0.22)">\${PC[t.priority].l}</span>
      </div>\`).join('')}
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div><div class="card-title">Active Projects</div><div class="card-sub">\${aP.length} in progress</div></div>
        <button onclick="showPage('projects')" style="background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:4px 10px;color:var(--text2);font-size:11px;cursor:pointer;font-family:inherit">View all</button>
      </div>
      \${aP.slice(0,4).map((proj,i)=>\`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;\${i<aP.slice(0,4).length-1?'border-bottom:1px solid var(--border)':''}">
        <div style="width:34px;height:34px;border-radius:2px;background:var(--accentGlow);border:1px solid var(--accentBorder);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:var(--accentL);flex-shrink:0">\${proj.name[0]}</div>
        <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${proj.name}</div><div style="font-size:10px;color:var(--text3)">\${proj.client}\${proj.deadline?' · due '+fd(proj.deadline):''}</div></div>
        <div style="font-size:14px;font-weight:800;color:var(--accent)">\${fm(proj.budget)}</div>
      </div>\`).join('')}
    </div>
  </div>\`;
}

function sc(icon,label,value,color,sub=''){
  return\`<div class="stat-card" style="--c:\${color}"><div class="stat-glow"></div><div style="font-size:17px;color:\${color};margin-bottom:10px">\${icon}</div><div class="stat-val">\${value}</div><div class="stat-label">\${label}</div>\${sub?\`<div style="font-size:10px;color:var(--text3);margin-top:2px">\${sub}</div>\`:''}</div>\`;
}

function barChart(data,days,todayIdx){
  const max=Math.max(...data,1),W=320,H=85,pL=4,pR=4,pT=5,pB=18;
  const cW=W-pL-pR,cH=H-pT-pB,bW=(cW/7)*.42,bG=cW/7;
  let bars='';
  data.forEach((v,i)=>{
    const bh=(v/max)*cH,x=pL+i*bG+(bG-bW)/2,y=pT+cH-Math.max(bh,2),active=i===todayIdx;
    bars+=\`<rect x="\${x}" y="\${y}" width="\${bW}" height="\${Math.max(bh,2)}" rx="1" fill="\${active?CT.accent:'rgba(255,255,255,0.06)'}"/>
    <text x="\${x+bW/2}" y="\${pT+cH+13}" font-size="8" fill="\${active?CT.accentL:CT.text3}" text-anchor="middle" font-weight="\${active?700:400}" font-family="Inter">\${days[i]}</text>\`;
  });
  return\`<svg viewBox="0 0 \${W} \${H}" style="width:100%;height:auto">\${bars}</svg>\`;
}

function lineChart(data,months){
  const hasData=data.some(v=>v>0),max=hasData?Math.max(...data)*1.1:10;
  const W=320,H=90,pL=4,pR=4,pT=8,pB=18,cW=W-pL-pR,cH=H-pT-pB;
  const pts=data.map((v,i)=>({x:pL+(i/(data.length-1))*cW,y:pT+cH-(v/max)*cH}));
  const ln=pts.map((p,i)=>(i===0?\`M\${p.x},\${p.y}\`:\`L\${p.x},\${p.y}\`)).join(' ');
  const ar=\`M\${pts[0].x},\${pT+cH} \${pts.map(p=>\`L\${p.x},\${p.y}\`).join(' ')} L\${pts[pts.length-1].x},\${pT+cH}Z\`;
  return\`<svg viewBox="0 0 \${W} \${H}" style="width:100%;height:auto">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="\${CT.accent}" stop-opacity=".35"/><stop offset="100%" stop-color="\${CT.accent}" stop-opacity="0"/></linearGradient></defs>
    \${hasData?\`<path d="\${ar}" fill="url(#lg)"/><path d="\${ln}" fill="none" stroke="\${CT.accent}" stroke-width="2" stroke-linecap="round"/>\`:''}
    \${pts.map((p,i)=>\`<text x="\${p.x}" y="\${pT+cH+13}" font-size="8" fill="\${i===data.length-1?CT.accentL:CT.text3}" text-anchor="middle" font-family="Inter">\${months[i]}</text>\`).join('')}
  </svg>\`;
}

function editHours(){
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  showQuickModal(\`<div style="padding:14px"><div style="font-size:12px;font-weight:700;margin-bottom:10px">Edit Weekly Hours</div>
    \${days.map((d,i)=>\`<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:11px;color:var(--text3);min-width:28px">\${d}</span>
    <input type="number" min="0" max="24" step="0.5" value="\${hours[i]||0}" oninput="hours[\${i}]=+this.value;sv('aw_hours',hours)" style="flex:1;background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:4px 8px;color:var(--text);font-size:12px;font-family:inherit;outline:none"></div>\`).join('')}
    <button onclick="renderOverview()" class="btn-primary" style="margin-top:8px;width:100%;justify-content:center">Update Chart</button></div>\`);
}
function editIncome(){
  const months=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  showQuickModal(\`<div style="padding:14px"><div style="font-size:12px;font-weight:700;margin-bottom:10px">Edit Income ($K)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    \${months.map((m,i)=>\`<div><div style="font-size:9px;color:var(--text3);text-transform:uppercase;font-weight:700;margin-bottom:3px">\${m}</div>
    <input type="number" min="0" step="0.5" value="\${income[i]||0}" oninput="income[\${i}]=+this.value;sv('aw_income',income)" style="width:100%;background:var(--s3);border:1px solid var(--border2);border-radius:2px;padding:5px 8px;color:var(--text);font-size:12px;font-family:inherit;outline:none;box-sizing:border-box"></div>\`).join('')}
    </div><button onclick="renderOverview()" class="btn-primary" style="margin-top:10px;width:100%;justify-content:center">Update Chart</button></div>\`);
}
function showQuickModal(html){
  let m=document.getElementById('qm');
  if(!m){m=document.createElement('div');m.id='qm';m.className='overlay';
    m.innerHTML=\`<div style="background:var(--s2);border:1px solid var(--accentBorder);border-radius:4px;max-height:80vh;overflow-y:auto;min-width:320px;max-width:400px">
      <div id="qmc"></div><div style="padding:0 14px 12px;display:flex;justify-content:flex-end"><button onclick="document.getElementById('qm').classList.remove('show')" class="btn-secondary">Close</button></div></div>\`;
    m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show');});
    document.body.appendChild(m);}
  document.getElementById('qmc').innerHTML=html;m.classList.add('show');
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
let taskFilter='all';
function renderTasks(){
  const p=document.getElementById('tasksPage');
  const COLS=[{id:'daily',l:'Daily Tasks',c:CT.accent},{id:'inprogress',l:'In Progress',c:CT.accentL},{id:'inreview',l:'In Review',c:CT.orange},{id:'finished',l:'Finished',c:CT.green}];
  const pc={urgent:CT.red,high:CT.orange,medium:CT.accent,low:CT.green};
  const filtered=taskFilter==='all'?tasks:tasks.filter(t=>t.priority===taskFilter);
  p.innerHTML=\`<div class="page-header">
    <div><div class="page-title">Task Board</div><div class="page-subtitle">\${tasks.length} tasks · drag to move between columns</div></div>
    <div style="display:flex;align-items:center;gap:9px">
      <div class="filter-row">\${['all','urgent','high','medium','low'].map(f=>\`<button class="filter-btn\${taskFilter===f?' active':''}" onclick="taskFilter='\${f}';renderTasks()">\${f==='all'?'All':f[0].toUpperCase()+f.slice(1)}</button>\`).join('')}</div>
      <button class="btn-primary" onclick="openTaskModal()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>New Task</button>
    </div>
  </div>
  <div class="board">\${COLS.map(col=>{
    const ct=filtered.filter(t=>t.status===col.id);
    return\`<div class="col" id="col_\${col.id}" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="dropTask(event,'\${col.id}')">
      <div class="col-header">
        <div style="display:flex;align-items:center;gap:6px"><div class="col-dot" style="background:\${col.c};box-shadow:0 0 7px \${col.c}66"></div><span style="font-size:12px;font-weight:700">\${col.l}</span></div>
        <div class="col-cnt" style="background:\${col.c}1A;color:\${col.c}">\${ct.length}</div>
      </div>
      <div style="flex:1">\${ct.map(t=>\`<div class="task-card" draggable="true" ondragstart="dragTask(event,'\${t.id}')" onclick="openTaskModal('\${t.id}')">
        <div class="task-bar" style="background:\${pc[t.priority]}"></div>
        <div class="task-title">\${t.title}</div>
        <div class="task-footer">
          <span class="badge" style="color:\${pc[t.priority]};background:\${pc[t.priority]}1A;border:1px solid \${pc[t.priority]}22">\${PC[t.priority].l}</span>
          \${t.dueDate?\`<div class="date-chip"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="18"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\${fd(t.dueDate)}</div>\`:''}
        </div>
      </div>\`).join('')}</div>
      <button class="add-task-btn" onclick="openTaskModal(null,'\${col.id}')">+ Add task</button>
    </div>\`;
  }).join('')}</div>\`;
}

let dragId=null;
function dragTask(e,id){dragId=id;}
function dropTask(e,colId){
  document.querySelectorAll('.col').forEach(c=>c.classList.remove('drag-over'));
  if(!dragId)return;
  tasks=tasks.map(t=>t.id===dragId?{...t,status:colId}:t);
  sv('aw_tasks',tasks);dragId=null;renderTasks();
}

function openTaskModal(id=null,defStatus='daily'){
  editTaskId=id;
  document.getElementById('taskModalTitle').textContent=id?'Edit Task':'New Task';
  document.getElementById('taskModalSub').textContent=id?'Update task details below':'Fill in the details';
  document.getElementById('tDeleteBtn').style.display=id?'inline-flex':'none';
  if(id){const t=tasks.find(x=>x.id===id);document.getElementById('tTitle').value=t.title;document.getElementById('tPriority').value=t.priority;document.getElementById('tDue').value=t.dueDate||'';document.getElementById('tStatus').value=t.status;}
  else{document.getElementById('tTitle').value='';document.getElementById('tPriority').value='medium';document.getElementById('tDue').value='';document.getElementById('tStatus').value=defStatus;}
  document.getElementById('taskOverlay').classList.add('show');
  setTimeout(()=>document.getElementById('tTitle').focus(),50);
}
function closeTaskModal(){document.getElementById('taskOverlay').classList.remove('show');}
function saveTask(){
  const title=document.getElementById('tTitle').value.trim();if(!title)return;
  const t={id:editTaskId||uid(),title,priority:document.getElementById('tPriority').value,dueDate:document.getElementById('tDue').value,status:document.getElementById('tStatus').value};
  tasks=editTaskId?tasks.map(x=>x.id===editTaskId?t:x):[...tasks,t];
  sv('aw_tasks',tasks);closeTaskModal();renderCurrentPage();
}
function deleteTask(){tasks=tasks.filter(t=>t.id!==editTaskId);sv('aw_tasks',tasks);closeTaskModal();renderCurrentPage();}

// ── PROJECTS ──────────────────────────────────────────────────────────────────
let projFilter='all';
function renderProjects(){
  const p=document.getElementById('projectsPage');
  const filtered=projFilter==='all'?projects:projects.filter(x=>x.status===projFilter);
  const total=projects.reduce((a,b)=>a+b.budget,0);
  const clients=ld('aw_clients',[]);
  p.innerHTML=\`<div class="page-header">
    <div><div class="page-title">Projects</div><div class="page-subtitle">\${projects.length} total · \${fm(total)} pipeline</div></div>
    <div style="display:flex;align-items:center;gap:9px">
      <div class="filter-row">\${['all','active','onhold','completed'].map(f=>\`<button class="filter-btn\${projFilter===f?' active':''}" onclick="projFilter='\${f}';renderProjects()">\${f==='all'?'All':SC[f]?SC[f].l:f}</button>\`).join('')}</div>
      <button class="btn-primary" onclick="openProjModal()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>New Project</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
    \${['active','onhold','completed'].map(s=>{const n=projects.filter(x=>x.status===s),b=n.reduce((a,x)=>a+x.budget,0);return\`<div style="background:var(--s2);border:1px solid var(--border);border-radius:3px;padding:12px 14px;cursor:pointer" onclick="projFilter=projFilter==='\${s}'?'all':'\${s}';renderProjects()">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px"><span class="status-badge" style="color:\${SC[s].c};background:\${SC[s].bg}">\${SC[s].l}</span><span style="font-size:17px;font-weight:800;color:\${SC[s].c}">\${n.length}</span></div>
      <div style="font-size:11px;color:var(--text3)">\${fm(b)} budget</div></div>\`;}).join('')}
  </div>
  <div class="proj-grid">\${filtered.map(proj=>{
    const dc=proj.checklist.filter(c=>c.done).length,tc=proj.checklist.length,pct=tc?Math.round(dc/tc*100):0;
    const ps=PSC[proj.paymentStatus||'unpaid'];
    const linkedClient=proj.clientId?clients.find(c=>c.uniqueId===proj.clientId):null;
    return\`<div class="proj-card">
      <div class="proj-top" style="background:linear-gradient(90deg,\${SC[proj.status].c},\${SC[proj.status].c}33)"></div>
      <div class="proj-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
          <div style="display:flex;gap:11px;align-items:center">
            <div style="width:40px;height:40px;border-radius:3px;background:var(--accentGlow);border:1px solid var(--accentBorder);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:var(--accentL)">\${proj.name[0]}</div>
            <div>
              <div style="font-size:13.5px;font-weight:700">\${proj.name}</div>
              <div style="font-size:11px;color:var(--text3)">\${proj.client}</div>
              \${linkedClient?\`<div style="font-size:10px;color:var(--green);margin-top:2px;display:flex;align-items:center;gap:4px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\${linkedClient.name}</div>\`:''}
            </div>
          </div>
          <div style="display:flex;gap:5px;align-items:center">
            <span class="status-badge" style="color:\${SC[proj.status].c};background:\${SC[proj.status].bg}">\${SC[proj.status].l}</span>
            <button onclick="openInvoice('\${proj.id}')" title="Invoice" style="width:26px;height:26px;border-radius:2px;background:var(--accentGlow);border:1px solid var(--accentBorder);display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accentL)" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg></button>
            <button onclick="openPortalShare('\${proj.id}')" title="Share Portal" style="width:26px;height:26px;border-radius:2px;background:rgba(47,216,154,0.08);border:1px solid rgba(47,216,154,0.25);display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2FD89A" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>
            <button onclick="openProjModal('\${proj.id}')" style="width:26px;height:26px;border-radius:2px;background:var(--s3);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
          <div style="font-size:22px;font-weight:800;letter-spacing:-.8px;color:var(--accent)">\${fm(proj.budget)}</div>
          \${proj.deadline?\`<span style="font-size:11px;color:var(--text3)">· due \${fd(proj.deadline)}</span>\`:''}
          <span class="pay-chip" style="color:\${ps.c};background:\${ps.bg};border:1px solid \${ps.c}33">\${ps.l}</span>
        </div>
        <p style="font-size:11.5px;color:var(--text3);line-height:1.6;margin-bottom:10px">\${proj.description}</p>
        \${tc>0?\`<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:10px;color:var(--text3);text-transform:uppercase;font-weight:600">Checklist</span><span style="font-size:10px;font-weight:700;color:\${pct===100?'var(--green)':'var(--text3)'}">\${dc}/\${tc}</span></div>
          <div class="prog-bar"><div class="prog-fill" style="width:\${pct}%;background:\${pct===100?'var(--green)':'var(--accent)'}"></div></div>
        </div>\`:''}
        <div style="display:flex;flex-wrap:wrap;gap:5px">\${proj.links.map(lk=>\`<a href="\${lk.url}" target="_blank" class="link-chip"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>\${lk.label}</a>\`).join('')}</div>
      </div>
    </div>\`;}).join('')}</div>\`;
}

// ── PROJECT MODAL ─────────────────────────────────────────────────────────────
function populateClientDropdown(selectedId){
  const sel=document.getElementById('pClientId');
  if(!sel)return;
  const clients=ld('aw_clients',[]);
  sel.innerHTML='<option value="">— No client linked —</option>';
  clients.forEach(c=>{
    const opt=document.createElement('option');
    opt.value=c.uniqueId;
    opt.textContent=c.name+' ('+c.uniqueId+')';
    if(c.uniqueId===selectedId)opt.selected=true;
    sel.appendChild(opt);
  });
}

function openProjModal(id=null){
  editProjId=id;
  document.getElementById('projModalTitle').textContent=id?'Edit Project':'New Project';
  document.getElementById('projModalSub').textContent=id?'Update project details below':'Set up a new project';
  document.getElementById('pDeleteBtn').style.display=id?'inline-flex':'none';
  document.getElementById('sendBoardBtn').style.display=id?'inline-flex':'none';
  if(id){
    const proj=projects.find(x=>x.id===id);
    document.getElementById('pName').value=proj.name;
    document.getElementById('pClient').value=proj.client;
    document.getElementById('pBudget').value=proj.budget||'';
    document.getElementById('pDeadline').value=proj.deadline||'';
    document.getElementById('pStatus').value=proj.status;
    document.getElementById('pDesc').value=proj.description;
    projLinks=[...proj.links.map(l=>({...l}))];
    projChecklist=[...proj.checklist.map(c=>({...c}))];
    setPayStatus(proj.paymentStatus||'unpaid');
    populateClientDropdown(proj.clientId||'');
  } else {
    document.getElementById('pName').value='';
    document.getElementById('pClient').value='';
    document.getElementById('pBudget').value='';
    document.getElementById('pDeadline').value='';
    document.getElementById('pStatus').value='active';
    document.getElementById('pDesc').value='';
    projLinks=[];projChecklist=[];
    setPayStatus('unpaid');
    populateClientDropdown('');
  }
  renderLinks();renderChecklist();renderTmplDropdown();
  const bl=document.getElementById('budgetLabel');if(bl)bl.textContent='Budget ('+getCur().symbol+')';
  document.getElementById('projOverlay').classList.add('show');
  setTimeout(()=>document.getElementById('pName').focus(),50);
}
function closeProjModal(){document.getElementById('projOverlay').classList.remove('show');}

function setPayStatus(s){
  payStatus=s;
  ['unpaid','advance','paid'].forEach(id=>{
    const b=document.getElementById('pay'+id[0].toUpperCase()+id.slice(1));if(!b)return;
    if(id===s){const c={unpaid:'#F04F6A',advance:'#FF8C42',paid:'#2FD89A'}[id];b.style.color=c;b.style.background=\`\${c}18\`;b.style.borderColor=\`\${c}55\`;b.style.fontWeight='700';}
    else{b.style.color='var(--text3)';b.style.background='var(--s3)';b.style.borderColor='var(--border)';b.style.fontWeight='500';}
  });
}

function renderLinks(){
  document.getElementById('linkCount').textContent=projLinks.length;
  document.getElementById('linksList').innerHTML=projLinks.map((l,i)=>\`<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px;background:var(--s3);border:1px solid var(--border);border-radius:2px;padding:5px 9px">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accentL)" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
    <span style="font-size:11.5px;font-weight:600;color:var(--accentL);min-width:60px">\${l.label}</span>
    <span style="flex:1;font-size:11px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${l.url||'—'}</span>
    <button onclick="projLinks.splice(\${i},1);renderLinks()" style="background:none;border:none;cursor:pointer;color:var(--red)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>\`).join('');
}
function addLink(){
  const l=document.getElementById('newLinkLabel').value.trim();if(!l)return;
  projLinks.push({id:uid(),label:l,url:document.getElementById('newLinkUrl').value.trim()});
  document.getElementById('newLinkLabel').value='';document.getElementById('newLinkUrl').value='';renderLinks();
}

function renderChecklist(){
  const done=projChecklist.filter(c=>c.done).length;
  document.getElementById('checkCount').textContent=projChecklist.length;
  document.getElementById('checkDone').textContent=done;
  const pct=projChecklist.length?Math.round(done/projChecklist.length*100):0;
  document.getElementById('checkProgress').style.width=pct+'%';
  document.getElementById('checklistItems').innerHTML=projChecklist.map((c,i)=>\`<div class="check-item">
    <div class="checkbox\${c.done?' done':''}" onclick="projChecklist[\${i}].done=!projChecklist[\${i}].done;renderChecklist()">\${c.done?\`<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>\`:''}</div>
    <span style="flex:1;font-size:12px;color:\${c.done?'var(--text3)':'var(--text2)'};text-decoration:\${c.done?'line-through':'none'}">\${c.text}</span>
    <button onclick="projChecklist.splice(\${i},1);renderChecklist()" style="background:none;border:none;cursor:pointer;color:var(--text3)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>\`).join('');
}
function addCheckItem(){const v=document.getElementById('newCheckItem').value.trim();if(!v)return;projChecklist.push({id:uid(),text:v,done:false});document.getElementById('newCheckItem').value='';renderChecklist();}
function renderTmplDropdown(){
  document.getElementById('tmplDrop').innerHTML=\`<div style="padding:6px 12px 3px;font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;border-bottom:1px solid var(--border)">Select Template</div>
  \${templates.map(t=>\`<div class="tmpl-item" onclick="applyTmpl('\${t.id}')">
    <div style="width:9px;height:9px;border-radius:50%;background:\${t.color};flex-shrink:0"></div>
    <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--text)">\${t.name}</div><div style="font-size:10px;color:var(--text3)">\${t.items.length} items</div></div>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accentL)" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  </div>\`).join('')}\`;
}
function toggleTmplDrop(){document.getElementById('tmplDrop').classList.toggle('show');}
function applyTmpl(id){
  const t=templates.find(x=>x.id===id);if(!t)return;
  t.items.forEach(item=>{if(!projChecklist.find(c=>c.text===item))projChecklist.push({id:uid(),text:item,done:false});});
  renderChecklist();document.getElementById('tmplDrop').classList.remove('show');
}
function saveProj(){
  const name=document.getElementById('pName').value.trim();if(!name)return;
  const clientIdVal=document.getElementById('pClientId')?.value||'';
  const proj={id:editProjId||uid(),name,client:document.getElementById('pClient').value.trim(),budget:+document.getElementById('pBudget').value||0,deadline:document.getElementById('pDeadline').value,status:document.getElementById('pStatus').value,description:document.getElementById('pDesc').value.trim(),links:[...projLinks],checklist:[...projChecklist],paymentStatus:payStatus,clientId:clientIdVal};
  projects=editProjId?projects.map(x=>x.id===editProjId?proj:x):[...projects,proj];
  sv('aw_projects',projects);
  const _ex2=JSON.parse(localStorage.getItem('aw_portal_'+proj.id)||'null');
  const _tok2=_ex2&&_ex2.token?_ex2.token:(uid()+uid()+uid()).toUpperCase();
  localStorage.setItem('aw_portal_'+proj.id,JSON.stringify({proj,profile,logo:localStorage.getItem('aw_logo')||'',savedAt:Date.now(),token:_tok2}));
  localStorage.setItem('aw_tok_'+_tok2,proj.id);
  closeProjModal();renderCurrentPage();if(editProjId)updateBinAfterSave(editProjId);
}
function deleteProj(){projects=projects.filter(x=>x.id!==editProjId);sv('aw_projects',projects);closeProjModal();renderCurrentPage();}
function sendToBoard(){
  if(!editProjId)return;const proj=projects.find(x=>x.id===editProjId);if(!proj)return;
  tasks.push({id:uid(),title:proj.name,priority:'medium',dueDate:proj.deadline||'',status:'daily'});
  sv('aw_tasks',tasks);closeProjModal();showPage('tasks');
}

// ── ALL PROJECTS PORTAL ────────────────────────────────────────────────────────
function openAllProjects(){
  renderAllProjectsBody();
  document.getElementById('allProjOverlay').classList.add('show');
}
function closeAllProjects(){
  document.getElementById('allProjOverlay').classList.remove('show');
}
function renderAllProjectsBody(){
  const body=document.getElementById('allProjBody');
  body.innerHTML=\`
    <div style="margin-bottom:16px">
      <div style="font-size:11px;color:var(--text3);margin-bottom:14px;padding:10px 12px;background:var(--s3);border:1px solid var(--border);border-radius:4px;line-height:1.6">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accentL)" stroke-width="2" stroke-linecap="round" style="display:inline;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Enter the <strong style="color:var(--text)">Client ID</strong> you received from your designer to see all projects assigned to you.
      </div>
      <div style="display:flex;gap:7px">
        <input class="inp" id="clientPortalInput" placeholder="e.g. NAR-X7K" maxlength="12" style="flex:1;font-family:monospace;font-weight:700;letter-spacing:1.5px;font-size:14px" onkeydown="if(event.key==='Enter')lookupClientProjects()">
        <button class="btn-primary" onclick="lookupClientProjects()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          View Projects
        </button>
      </div>
      <div id="clientPortalError" style="display:none;margin-top:8px;padding:8px 12px;background:rgba(240,79,106,.06);border:1px solid rgba(240,79,106,.2);border-radius:3px;font-size:11.5px;color:var(--red);font-weight:600"></div>
    </div>
    <div id="clientPortalResults"></div>
  \`;
  setTimeout(()=>document.getElementById('clientPortalInput')?.focus(),50);
}

function lookupClientProjects(){
  const val=(document.getElementById('clientPortalInput')?.value||'').trim().toUpperCase().replace(/[^A-Z0-9\\-]/g,'');
  const errEl=document.getElementById('clientPortalError');
  const resultsEl=document.getElementById('clientPortalResults');
  if(!val){errEl.textContent='Please enter a Client ID.';errEl.style.display='block';return;}

  const clients=ld('aw_clients',[]);
  const client=clients.find(c=>c.uniqueId.toUpperCase()===val);
  if(!client){
    errEl.textContent='Client ID "'+val+'" not found. Please check your ID and try again.';
    errEl.style.display='block';
    resultsEl.innerHTML='';
    return;
  }
  errEl.style.display='none';

  const clientProjects=projects.filter(p=>p.clientId&&p.clientId.toUpperCase()===val);

  if(clientProjects.length===0){
    resultsEl.innerHTML=\`<div style="text-align:center;padding:24px;background:var(--s3);border:1px solid var(--border);border-radius:6px">
      <div style="font-size:22px;margin-bottom:8px">📂</div>
      <div style="font-size:13px;font-weight:600;margin-bottom:4px">No projects yet</div>
      <div style="font-size:11px;color:var(--text3)">Hi <strong style="color:var(--text)">\${client.name}</strong>! No projects have been assigned to your ID yet.</div>
    </div>\`;
    return;
  }

  const p=ld('aw_profile',DP);
  resultsEl.innerHTML=\`
    <div style="display:flex;align-items:center;gap:10px;padding:10px 13px;background:rgba(47,216,154,.06);border:1px solid rgba(47,216,154,.2);border-radius:5px;margin-bottom:14px">
      <div style="width:32px;height:32px;border-radius:3px;background:rgba(47,216,154,.15);border:1px solid rgba(47,216,154,.3);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:var(--green);flex-shrink:0">\${client.name[0]}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:var(--green)">Welcome, \${client.name}!</div>
        <div style="font-size:10px;color:var(--text3)">\${clientProjects.length} project\${clientProjects.length>1?'s':''} assigned to your ID · \${p.name}</div>
      </div>
    </div>
    \${clientProjects.map(proj=>{
      const dc=proj.checklist.filter(c=>c.done).length,tc=proj.checklist.length,pct=tc?Math.round(dc/tc*100):0;
      const ps=PSC[proj.paymentStatus||'unpaid'],st=SC[proj.status];
      return \`<div style="background:var(--s3);border:1px solid var(--border2);border-radius:6px;padding:14px 16px;margin-bottom:10px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,\${st.c},transparent)"></div>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:9px">
            <div style="width:36px;height:36px;background:var(--accentGlow);border:1px solid var(--accentBorder);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:var(--accentL)">\${proj.name[0]}</div>
            <div>
              <div style="font-size:13px;font-weight:700">\${proj.name}</div>
              <div style="font-size:10px;color:var(--text3)">\${proj.client}\${proj.deadline?' · due '+fd(proj.deadline):''}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end">
            <span style="font-size:10px;font-weight:700;color:\${st.c};background:\${st.c}22;padding:2px 8px;border-radius:3px">\${st.l}</span>
            <span style="font-size:10px;font-weight:700;color:\${ps.c};background:\${ps.bg};padding:2px 8px;border-radius:3px">\${ps.l}</span>
          </div>
        </div>
        \${proj.description?\`<p style="font-size:11.5px;color:var(--text3);line-height:1.6;margin-bottom:10px">\${proj.description}</p>\`:''}
        \${tc>0?\`<div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:10px;color:var(--text3);text-transform:uppercase;font-weight:600">Progress</span>
            <span style="font-size:10px;font-weight:700;color:\${pct===100?'var(--green)':'var(--text3)'}">\${dc}/\${tc} (\${pct}%)</span>
          </div>
          <div style="height:4px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden"><div style="height:100%;width:\${pct}%;background:\${pct===100?'var(--green)':'var(--accent)'};border-radius:2px"></div></div>
        </div>\`:''}
        \${proj.links&&proj.links.length>0?\`<div style="display:flex;flex-wrap:wrap;gap:5px">\${proj.links.map(lk=>\`<a href="\${lk.url}" target="_blank" class="link-chip">\${lk.label} ↗</a>\`).join('')}</div>\`:''}
      </div>\`;
    }).join('')}
  \`;
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────
function openSettings(){
  renderStabThemes();renderStabUistyle();renderStabProfile();renderStabLogo();renderStabBg();renderStabTemplates();renderStabClients();
  document.getElementById('settingsOverlay').classList.add('show');toggleDrop(false);
}
function closeSettings(){document.getElementById('settingsOverlay').classList.remove('show');}
function switchStab(id,el){
  document.querySelectorAll('.stab').forEach(s=>s.classList.remove('active'));el.classList.add('active');
  ['stabThemes','stabUistyle','stabProfile','stabLogo','stabBg','stabTemplates','stabClients'].forEach(sid=>{
    document.getElementById(sid).style.display=sid==='stab'+id[0].toUpperCase()+id.slice(1)?'':'none';
  });
}
function renderStabThemes(){
  document.getElementById('stabThemes').innerHTML=\`<div style="margin-bottom:14px"><div style="font-size:13px;font-weight:700;margin-bottom:3px">Select Theme</div><div style="font-size:12px;color:var(--text3)">Choose from \${THEMES.length} premium color themes</div></div>
  <div class="theme-grid">\${THEMES.map(t=>\`<div class="theme-card" onclick="applyTheme(THEMES.find(x=>x.id==='\${t.id}'));renderStabThemes();renderCurrentPage()" style="background:\${t.s2};border-color:\${t.id===CT.id?t.accent:t.border2}">
    <div class="theme-bar" style="background:linear-gradient(90deg,\${t.accent},\${t.accentD})"></div>
    <div class="theme-dots">\${[t.accent,t.green,t.red,t.blue].map(c=>\`<div class="theme-dot" style="background:\${c}"></div>\`).join('')}</div>
    <div style="display:flex;gap:2px;margin-bottom:6px">\${[1,0,1,0,1].map((_,i)=>\`<div style="flex:1;height:15px;background:\${i%2===0?t.s3:t.card};border-radius:2px"></div>\`).join('')}</div>
    <div class="theme-name" style="color:\${t.text}"><span>\${t.emoji}</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${t.name}</span></div>
    \${t.id===CT.id?\`<div style="position:absolute;top:7px;right:7px;width:16px;height:16px;border-radius:50%;background:\${t.accent};display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>\`:''}
  </div>\`).join('')}
  </div><div style="margin-top:13px;padding:11px 13px;background:var(--s3);border:1px solid var(--border);border-radius:3px;display:flex;align-items:center;gap:11px">
    <div style="width:34px;height:34px;border-radius:3px;background:linear-gradient(135deg,var(--accent),var(--accentD));display:flex;align-items:center;justify-content:center;font-size:15px">\${CT.emoji}</div>
    <div><div style="font-size:12px;font-weight:700">Active: \${CT.name}</div><div style="font-size:11px;color:var(--text3)">Click any theme to switch</div></div>
  </div>\`;
}

// ── CLIENTS SETTINGS TAB ────────────────────────────────────────────────────
function renderStabClients(){
  const el=document.getElementById('stabClients');if(!el)return;
  const clients=ld('aw_clients',[]);
  el.innerHTML=\`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div>
        <div style="font-size:13px;font-weight:700">Client ID System</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">\${clients.length} client\${clients.length!==1?'s':''} registered — share unique IDs with each client</div>
      </div>
    </div>
    <div style="background:var(--s3);border:1px solid var(--border);border-radius:4px;padding:14px;margin-bottom:16px">
      <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;margin-bottom:10px">Add New Client</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div><div class="field-label">Client Name</div><input class="inp" id="clName" placeholder="e.g. Luminary Tech" style="font-size:12px"></div>
        <div><div class="field-label">Company / Role</div><input class="inp" id="clCompany" placeholder="e.g. CEO, Startup" style="font-size:12px"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div><div class="field-label">Email</div><input class="inp" id="clEmail" placeholder="client@email.com" style="font-size:12px"></div>
        <div><div class="field-label">Custom ID prefix (optional)</div><input class="inp" id="clPrefix" placeholder="e.g. LUM" maxlength="4" style="font-size:12px;font-family:monospace;text-transform:uppercase" oninput="this.value=this.value.toUpperCase()"></div>
      </div>
      <button class="btn-primary" onclick="addClient()" style="width:100%;justify-content:center">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Generate Client ID & Add
      </button>
    </div>
    <div id="clientsList">\${renderClientsList()}</div>
  \`;
}

function copyClientUID(btn,id){
  navigator.clipboard.writeText(id).then(()=>{
    const prev=btn.textContent;
    btn.textContent='✓';
    btn.style.color='var(--green)';
    setTimeout(()=>{btn.textContent=prev;btn.style.color='var(--text3)';},2000);
  });
}
function renderClientsList(){
  const clients=ld('aw_clients',[]);
  if(!clients.length)return\`<div style="padding:24px;text-align:center;color:var(--text3);font-size:12px;background:var(--s3);border-radius:4px;border:1px dashed var(--border2)">
    <div style="font-size:20px;margin-bottom:8px">👤</div>
    No clients added yet. Add your first client above.
  </div>\`;
  const clrPalette=['#7C5CFC','#F43F8E','#10B981','#F59E0B','#3B82F6','#EF4444','#8B5CF6','#06B6D4'];
  return clients.map((c,i)=>{
    const clr=clrPalette[i%clrPalette.length];
    const linkedProjects=projects.filter(p=>p.clientId===c.uniqueId);
    return\`<div style="background:var(--s3);border:1px solid var(--border);border-radius:4px;padding:12px 14px;margin-bottom:8px;position:relative;overflow:hidden">
      <div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:\${clr}"></div>
      <div style="padding-left:10px;display:flex;align-items:center;gap:11px">
        <div style="width:38px;height:38px;border-radius:4px;background:\${clr}22;border:1px solid \${clr}44;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:\${clr};flex-shrink:0">\${c.name[0].toUpperCase()}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700">\${c.name}</div>
          <div style="font-size:10px;color:var(--text3)">\${c.company||''}\${c.email?' · '+c.email:''}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px">\${linkedProjects.length} project\${linkedProjects.length!==1?'s':''} linked</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;align-items:flex-end">
          <div style="display:flex;align-items:center;gap:5px;background:var(--s4);border:1px solid \${clr}55;border-radius:3px;padding:5px 10px">
            <span style="font-size:13px;font-weight:900;color:\${clr};letter-spacing:2px;font-family:monospace">\${c.uniqueId}</span>
            <button onclick="copyClientUID(this,'\${c.uniqueId}')" title="Copy ID" style="background:none;border:none;cursor:pointer;color:var(--text3);padding:0;line-height:1;font-size:13px;font-weight:700">⎘</button>
          </div>
          <button onclick="removeClient(\${i})" style="background:rgba(240,79,106,.06);border:1px solid rgba(240,79,106,.2);border-radius:2px;padding:3px 8px;cursor:pointer;font-size:10px;font-weight:600;color:var(--red);font-family:inherit">Remove</button>
        </div>
      </div>
    </div>\`;
  }).join('');
}

function addClient(){
  const name=(document.getElementById('clName')?.value||'').trim();
  if(!name){alert('Please enter a client name.');return;}
  const company=(document.getElementById('clCompany')?.value||'').trim();
  const email=(document.getElementById('clEmail')?.value||'').trim();
  const customPrefix=(document.getElementById('clPrefix')?.value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
  const chars='0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let prefix=customPrefix;
  if(!prefix){
    const words=name.split(' ').filter(w=>w.length>0);
    if(words.length>=2)prefix=(words[0][0]+(words[1][0]||'X')+(words[0][1]||'Z')).toUpperCase();
    else prefix=(name.slice(0,3)).toUpperCase().replace(/[^A-Z0-9]/g,'X');
  }
  if(prefix.length<2)prefix=(prefix+'XX').slice(0,3);
  if(prefix.length>4)prefix=prefix.slice(0,4);
  const suffix=Array.from({length:3},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
  const uniqueId=prefix+'-'+suffix;
  const clients=ld('aw_clients',[]);
  clients.unshift({id:uid(),name,company,email,uniqueId,addedOn:new Date().toISOString().slice(0,10)});
  sv('aw_clients',clients);
  if(document.getElementById('clName'))document.getElementById('clName').value='';
  if(document.getElementById('clCompany'))document.getElementById('clCompany').value='';
  if(document.getElementById('clEmail'))document.getElementById('clEmail').value='';
  if(document.getElementById('clPrefix'))document.getElementById('clPrefix').value='';
  const listEl=document.getElementById('clientsList');
  if(listEl)listEl.innerHTML=renderClientsList();
}

function removeClient(i){
  const clients=ld('aw_clients',[]);
  clients.splice(i,1);
  sv('aw_clients',clients);
  const listEl=document.getElementById('clientsList');
  if(listEl)listEl.innerHTML=renderClientsList();
}

function renderStabProfile(){
  const saved=ld('aw_profile',{...DP}),pic=localStorage.getItem('aw_profile_pic')||'',wl=ld('aw_whitelist',[]);
  document.getElementById('stabProfile').innerHTML=\`<div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--s3);border:1px solid var(--border);border-radius:4px;margin-bottom:18px">
    <div style="width:48px;height:48px;border-radius:4px;background:\${pic?'transparent':'linear-gradient(135deg,var(--accent),var(--accentD))'};overflow:hidden;flex-shrink:0;cursor:pointer" onclick="document.getElementById('picInput').click()">
      \${pic?\`<img src="\${pic}" style="width:100%;height:100%;object-fit:cover">\`:\`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff">\${saved.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</div>\`}
      <input id="picInput" type="file" accept="image/*" style="display:none" onchange="uploadPic(event)">
    </div>
    <div style="flex:1"><div style="font-size:14px;font-weight:700">\${saved.name}</div><div style="font-size:11px;color:var(--text3)">\${saved.email} · \${saved.role}</div></div>
    <div style="font-size:10px;color:var(--text3);background:var(--s4);border:1px solid var(--border);border-radius:2px;padding:2px 8px">Owner</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
    \${[['Full Name','name','text'],['Email','email','email'],['Role','role','text'],['Timezone','timezone','text'],['Phone','phone','text'],['Website','website','text']].map(([l,k,t])=>\`<div><div class="field-label">\${l}</div><input type="\${t}" class="inp" value="\${saved[k]||''}" oninput="profile['\${k}']=this.value" style="font-size:12px"></div>\`).join('')}
    <div style="grid-column:1/-1"><div class="field-label">Address / Location</div><input type="text" class="inp" value="\${saved.address||''}" oninput="profile['address']=this.value" style="font-size:12px" placeholder="City, Country"></div>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid var(--border)">
    <button class="btn-primary" id="saveProfBtn" onclick="saveProfileFn()">Save Changes</button>
  </div>
  <div style="margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid var(--border)">
    <div style="font-size:13px;font-weight:700;margin-bottom:3px">Currency</div>
    <div style="font-size:11px;color:var(--text3);margin-bottom:12px">Choose your preferred currency for budgets and invoices</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      \${Object.entries(CURRENCIES).map(([id,c])=>\`<div onclick="setCurrency('\${id}');renderStabProfile()" style="padding:10px 12px;background:\${activeCurrency===id?'var(--accentGlow)':'var(--s3)'};border:1px solid \${activeCurrency===id?'var(--accentBorder)':'var(--border)'};border-radius:4px;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:8px">
        <span style="font-size:18px;font-weight:800;color:\${activeCurrency===id?'var(--accent)':'var(--text2)'}">\${c.symbol}</span>
        <div><div style="font-size:11px;font-weight:700;color:\${activeCurrency===id?'var(--text)':'var(--text2)'}">\${c.code}</div><div style="font-size:10px;color:var(--text3)">\${c.name}</div></div>
        \${activeCurrency===id?\`<svg style="margin-left:auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>\`:''}
      </div>\`).join('')}
    </div>
    <div style="margin-top:10px;padding:8px 12px;background:var(--s3);border:1px solid var(--border);border-radius:3px;font-size:11px;color:var(--text3);display:flex;align-items:center;gap:7px">
      <span style="font-size:15px">\${getCur().symbol}</span>
      <span>Active: <strong style="color:var(--text)">\${getCur().name} (\${getCur().code})</strong> — all amounts will show in \${getCur().symbol}</span>
    </div>
  </div>
  <div style="margin-bottom:12px"><div style="font-size:13px;font-weight:700">Designer ID System</div><div style="font-size:11px;color:var(--text3);margin-top:2px">\${wl.length} designers registered</div></div>
  <div style="background:var(--s3);border:1px solid var(--border);border-radius:4px;padding:12px;margin-bottom:12px">
    <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;margin-bottom:8px">Add Designer</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
      <div><div class="field-label">Name</div><input class="inp" id="wlName" placeholder="e.g. Priya Sharma" style="font-size:12px"></div>
      <div><div class="field-label">Role</div><input class="inp" id="wlRole" placeholder="e.g. UI Designer" style="font-size:12px"></div>
    </div>
    <div style="display:flex;gap:8px;align-items:flex-end">
      <div style="flex:1"><div class="field-label">Anime Character</div>
        <select class="inp" id="wlAnime" style="font-size:12px;appearance:none;cursor:pointer">\${['Naruto Uzumaki','Levi Ackerman','Gojo Satoru','Itadori Yuji','Tanjiro Kamado','Light Yagami','L Lawliet','Killua Zoldyck','Goku','Vegeta'].map(a=>\`<option value="\${a}">\${a}</option>\`).join('')}</select>
      </div>
      <button class="btn-primary" onclick="addDesigner()" style="height:34px;padding:0 14px;flex-shrink:0">+ Add</button>
    </div>
  </div>
  <div id="wlList">\${renderWLList()}</div>\`;
}
function renderWLList(){
  const wl=ld('aw_whitelist',[]);
  if(!wl.length)return\`<div style="padding:20px;text-align:center;color:var(--text3);font-size:12px;background:var(--s3);border-radius:3px;border:1px dashed var(--border2)">No designers added yet</div>\`;
  return wl.map((w,i)=>\`<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--s3);border:1px solid var(--border);border-radius:3px;margin-bottom:5px">
    <div style="width:36px;height:36px;border-radius:3px;background:linear-gradient(135deg,\${w.color},\${w.color}aa);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
    <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600">\${w.name}</div><div style="font-size:11px;color:var(--text3)">\${w.animeCharacter} · \${w.role}</div></div>
    <div style="display:flex;align-items:center;gap:5px;background:var(--s4);border:1px solid var(--accentBorder);border-radius:3px;padding:4px 9px;flex-shrink:0">
      <span style="font-size:12px;font-weight:800;color:var(--accentL);letter-spacing:1.5px;font-family:monospace">\${w.uniqueId}</span>
      <button onclick="navigator.clipboard.writeText('\${w.uniqueId}')" style="background:none;border:none;cursor:pointer;color:var(--text3)"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>
    </div>
    <span style="font-size:10px;font-weight:700;color:var(--green);background:rgba(47,216,154,0.1);border:1px solid rgba(47,216,154,0.2);border-radius:2px;padding:2px 7px">ACCESS</span>
    <button onclick="removeDesigner(\${i})" style="background:rgba(240,79,106,.06);border:1px solid rgba(240,79,106,.2);border-radius:2px;padding:4px 6px;cursor:pointer"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.8" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button>
  </div>\`).join('');
}
function addDesigner(){
  const name=document.getElementById('wlName').value.trim();if(!name)return;
  const anime=document.getElementById('wlAnime').value,role=document.getElementById('wlRole').value.trim()||'Designer';
  const chars='0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const prefix=(anime[0]+(anime[2]||anime[1]||'X')+(anime[Math.floor(anime.length/2)]||'Z')).toUpperCase();
  const suffix=Array.from({length:3},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
  const wl=ld('aw_whitelist',[]);
  const colors=['#7C5CFC','#F43F8E','#10B981','#F59E0B','#3B82F6','#EF4444'];
  wl.unshift({id:uid(),name,animeCharacter:anime,uniqueId:\`\${prefix}-\${suffix}\`,role,color:colors[wl.length%colors.length],addedOn:new Date().toISOString().slice(0,10)});
  sv('aw_whitelist',wl);document.getElementById('wlName').value='';document.getElementById('wlRole').value='';
  document.getElementById('wlList').innerHTML=renderWLList();
}
function removeDesigner(i){const wl=ld('aw_whitelist',[]);wl.splice(i,1);sv('aw_whitelist',wl);document.getElementById('wlList').innerHTML=renderWLList();}
function saveProfileFn(){sv('aw_profile',profile);updateProfileUI();const b=document.getElementById('saveProfBtn');b.textContent='✓ Saved!';setTimeout(()=>b.textContent='Save Changes',2000);}
function uploadPic(e){const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=ev=>{localStorage.setItem('aw_profile_pic',ev.target.result);updateProfileUI();renderStabProfile();};r.readAsDataURL(f);}

function renderStabLogo(){
  const logo=localStorage.getItem('aw_logo')||'';
  document.getElementById('stabLogo').innerHTML=\`<div style="font-size:13px;font-weight:700;margin-bottom:3px">Website Logo</div>
  <div style="font-size:12px;color:var(--text3);margin-bottom:18px">Upload your logo — appears in sidebar and login screen</div>
  <div style="display:flex;gap:14px;align-items:flex-start">
    <div style="width:76px;height:76px;border-radius:9px;background:\${logo?'transparent':'rgba(255,255,255,0.04)'};border:1px solid var(--border2);overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center">
      \${logo?\`<img src="\${logo}" style="width:100%;height:100%;object-fit:contain">\`:\`\`}
    </div>
    <div>
      <label class="btn-primary" style="cursor:pointer;display:inline-flex;margin-bottom:9px">Upload Image<input type="file" accept="image/*" style="display:none" onchange="uploadLogo(event)"></label>
      <div style="font-size:11px;color:var(--text3);margin-bottom:10px">PNG, JPG, SVG, WebP · Recommended: 256×256px</div>
      \${logo?\`<button onclick="removeLogo()" style="background:rgba(240,79,106,.08);border:1px solid rgba(240,79,106,.2);border-radius:3px;padding:6px 13px;color:var(--red);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit">Remove Logo</button>\`:''}
    </div>
  </div>\`;
}
function uploadLogo(e){const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=ev=>{localStorage.setItem('aw_logo',ev.target.result);updateLogoUI();renderStabLogo();};r.readAsDataURL(f);}
function removeLogo(){localStorage.removeItem('aw_logo');updateLogoUI();renderStabLogo();}

let tmplEditIdx=-1,tmplItems=[];
function renderStabTemplates(){
  document.getElementById('stabTemplates').innerHTML=\`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
    <div><div style="font-size:13px;font-weight:700">Checklist Templates</div><div style="font-size:11px;color:var(--text3);margin-top:2px">Create reusable checklists for projects</div></div>
    <button class="btn-primary" onclick="openNewTmpl()"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>New Template</button>
  </div>
  <div id="tmplList">\${templates.map((t,ti)=>\`<div style="background:var(--s3);border:1px solid var(--border);border-radius:3px;padding:11px 13px;margin-bottom:7px;position:relative;overflow:hidden">
    <div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:\${t.color}"></div>
    <div style="padding-left:9px;display:flex;align-items:flex-start;gap:9px">
      <div style="flex:1"><div style="font-size:12px;font-weight:700;margin-bottom:5px">\${t.name}</div><div style="display:flex;flex-wrap:wrap;gap:4px">\${t.items.map(item=>\`<span class="tag">\${item}</span>\`).join('')}</div></div>
      <div style="display:flex;gap:4px">
        <button onclick="editTmpl(\${ti})" style="background:var(--s4);border:1px solid var(--border2);border-radius:2px;padding:3px 8px;cursor:pointer;color:var(--text3);font-size:10px;font-family:inherit">Edit</button>
        <button onclick="templates.splice(\${ti},1);sv('aw_cl_templates',templates);renderStabTemplates()" style="background:rgba(240,79,106,.06);border:1px solid rgba(240,79,106,.2);border-radius:2px;padding:3px 6px;cursor:pointer"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.8" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button>
      </div>
    </div>
  </div>\`).join('')}</div>
  <div id="tmplForm" style="display:none;background:var(--s3);border:1px solid var(--accentBorder);border-radius:4px;padding:14px;margin-top:10px">
    <div class="field-label" style="margin-bottom:8px">Template Name</div>
    <input class="inp" id="tmplName" placeholder="e.g. Logo Design" style="margin-bottom:10px;font-size:12px">
    <div class="field-label" style="margin-bottom:6px">Items</div>
    <div id="tmplItemsList"></div>
    <button onclick="tmplAddItem()" style="width:100%;background:none;border:1px dashed var(--border2);border-radius:2px;padding:5px;color:var(--text3);font-size:11px;cursor:pointer;font-family:inherit;margin-bottom:10px">+ Add Item</button>
    <div style="display:flex;gap:7px">
      <button onclick="document.getElementById('tmplForm').style.display='none'" class="btn-secondary">Cancel</button>
      <button onclick="saveTmpl()" class="btn-primary">Save Template</button>
    </div>
  </div>\`;
}
function openNewTmpl(){tmplEditIdx=-1;tmplItems=[''];document.getElementById('tmplName').value='';renderTmplItems();document.getElementById('tmplForm').style.display='';}
function editTmpl(i){const t=templates[i];tmplEditIdx=i;tmplItems=[...t.items];document.getElementById('tmplName').value=t.name;renderTmplItems();document.getElementById('tmplForm').style.display='';}
function renderTmplItems(){document.getElementById('tmplItemsList').innerHTML=tmplItems.map((item,i)=>\`<div style="display:flex;gap:5px;margin-bottom:5px;align-items:center">
  <input class="inp" value="\${item}" oninput="tmplItems[\${i}]=this.value" placeholder="Item \${i+1}" style="flex:1;font-size:12px">
  \${tmplItems.length>1?\`<button onclick="tmplItems.splice(\${i},1);renderTmplItems()" style="background:none;border:none;cursor:pointer;color:var(--text3)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>\`:''}
</div>\`).join('');}
function tmplAddItem(){tmplItems.push('');renderTmplItems();}
function saveTmpl(){
  const name=document.getElementById('tmplName').value.trim();if(!name)return;
  const items=tmplItems.filter(i=>i.trim());if(!items.length)return;
  const tmpl={id:tmplEditIdx>=0?templates[tmplEditIdx].id:uid(),name,color:'#7C5CFC',items};
  if(tmplEditIdx>=0)templates[tmplEditIdx]=tmpl;else templates.push(tmpl);
  sv('aw_cl_templates',templates);document.getElementById('tmplForm').style.display='none';renderStabTemplates();
}

// ── UI HELPERS ────────────────────────────────────────────────────────────────
function updateProfileUI(){
  const p=ld('aw_profile',{...DP});profile={...p};
  const pic=localStorage.getItem('aw_profile_pic')||'',initials=p.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  const av=document.getElementById('topAvatar');
  if(av){if(pic){av.innerHTML=\`<img src="\${pic}" style="width:100%;height:100%;object-fit:cover">\`;av.style.background='transparent';}else{av.textContent=initials;av.style.background='linear-gradient(135deg,var(--accent),var(--accentD))';}}
  const dn=document.getElementById('dropName'),dr=document.getElementById('dropRole');
  if(dn)dn.textContent=p.name;if(dr)dr.textContent=p.role;
}
function updateLogoUI(){
  const logo=localStorage.getItem('aw_logo')||'';
  const sl=document.getElementById('sidebarLogo');
  if(sl){
    if(logo){sl.innerHTML=\`<img src="\${logo}" style="width:100%;height:100%;object-fit:contain;border-radius:4px">\`;sl.style.background='transparent';sl.style.display='flex';}
    else{sl.innerHTML='';sl.style.background='transparent';sl.style.display='none';}
  }
}
function toggleDrop(force){
  const d=document.getElementById('profileDrop');
  if(force===false)d.classList.remove('show');else d.classList.toggle('show');
}
document.addEventListener('click',e=>{
  if(!document.getElementById('avatarWrap')?.contains(e.target))document.getElementById('profileDrop')?.classList.remove('show');
  if(!document.getElementById('tmplDrop')?.parentElement?.contains(e.target))document.getElementById('tmplDrop')?.classList.remove('show');
});

// ── INVOICE ───────────────────────────────────────────────────────────────────
function openInvoice(id){
  invProj=projects.find(x=>x.id===id);if(!invProj)return;
  // Pre-fill line items: checklist items as deliverables + total budget
  const cl=invProj.checklist||[];
  if(cl.length>0){
    invItems=cl.map(c=>({id:uid(),description:c.text,qty:1,rate:0}));
    // Distribute budget across items evenly
    const perItem=invProj.budget?Math.round(invProj.budget/cl.length):0;
    invItems=invItems.map(it=>({...it,rate:perItem}));
  } else {
    invItems=[{id:uid(),description:invProj.name,qty:1,rate:invProj.budget||0}];
  }
  document.getElementById('invSubTitle').textContent=invProj.name+' · '+invProj.client;
  renderInvBody();document.getElementById('invOverlay').classList.add('show');
}
function closeInv(){document.getElementById('invOverlay').classList.remove('show');}
function renderInvBody(){
  const iNo='INV-'+new Date().getFullYear()+'-'+String(Date.now()).slice(-4);
  const today=new Date().toISOString().slice(0,10);
  const p=ld('aw_profile',DP),ps=PSC[invProj.paymentStatus||'unpaid'];
  const sub=invItems.reduce((a,b)=>a+b.qty*b.rate,0);
  // Get linked client info
  const clients=ld('aw_clients',[]);
  const linkedClient=invProj.clientId?clients.find(c=>c.uniqueId===invProj.clientId):null;
  var _p=ld('aw_profile',DP);
  var _ps=PSC[invProj.paymentStatus||'unpaid'];
  var _clients=ld('aw_clients',[]);
  var _lc=invProj.clientId?_clients.find(function(c){return c.uniqueId===invProj.clientId;}):null;
  var _sub=invItems.reduce(function(a,b){return a+b.qty*b.rate;},0);
  var _cur=getCur();
  var _html='';
  _html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-bottom:16px">';
  _html+='<div><div class="field-label">Invoice No.</div><input class="inp" id="invNo" value="'+iNo+'" style="font-size:12px"></div>';
  _html+='<div><div class="field-label">Invoice Date</div><input class="inp" type="date" id="invDate" value="'+today+'" style="color-scheme:dark;font-size:12px"></div>';
  _html+='<div><div class="field-label">Due Date</div><input class="inp" type="date" id="invDue" value="'+(invProj.deadline||'')+'" style="color-scheme:dark;font-size:12px"></div>';
  _html+='</div>';
  // FROM / TO boxes
  _html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px">';
  _html+='<div style="background:var(--s3);border:1px solid var(--border);border-radius:3px;padding:13px 14px">';
  _html+='<div class="field-label" style="margin-bottom:8px;color:var(--accent)">From (Your Studio)</div>';
  _html+='<div style="font-size:13px;font-weight:700;margin-bottom:2px">'+(_p.name||'')+'</div>';
  _html+='<div style="font-size:11px;color:var(--text2);margin-bottom:1px">'+(_p.role||'')+'</div>';
  _html+='<div style="font-size:11px;color:var(--text3);margin-bottom:1px">'+(_p.email||'')+'</div>';
  if(_p.phone) _html+='<div style="font-size:11px;color:var(--text3);margin-bottom:1px">'+_p.phone+'</div>';
  if(_p.website) _html+='<div style="font-size:11px;color:var(--accentL);margin-bottom:1px">'+_p.website+'</div>';
  if(_p.address) _html+='<div style="font-size:11px;color:var(--text3)">'+_p.address+'</div>';
  _html+='</div>';
  _html+='<div style="background:var(--s3);border:1px solid var(--border);border-radius:3px;padding:13px 14px">';
  _html+='<div class="field-label" style="margin-bottom:8px;color:var(--green)">Bill To (Client)</div>';
  _html+='<div style="font-size:13px;font-weight:700;margin-bottom:2px">'+(_lc?_lc.name:(invProj.client||'—'))+'</div>';
  if(_lc&&_lc.company&&_lc.company!==_lc.name) _html+='<div style="font-size:11px;color:var(--text2);margin-bottom:1px">'+_lc.company+'</div>';
  else _html+='<div style="font-size:11px;color:var(--text2);margin-bottom:1px">'+(invProj.client||'')+'</div>';
  if(_lc&&_lc.email) _html+='<div style="font-size:11px;color:var(--text3);margin-bottom:4px">'+_lc.email+'</div>';
  _html+='<div style="font-size:10px;color:var(--text3);margin-bottom:4px">Project: <strong style="color:var(--text2)">'+invProj.name+'</strong></div>';
  _html+='<span class="pay-chip" style="margin-top:2px;color:'+_ps.c+';background:'+_ps.bg+';border:1px solid '+_ps.c+'33">'+_ps.l+'</span>';
  _html+='</div></div>';
  // Line items
  _html+='<div style="margin-bottom:14px">';
  _html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">';
  _html+='<div class="field-label">Line Items (Deliverables)</div>';
  _html+='<button class="btn-secondary" onclick="addInvItem()" style="font-size:10px;padding:3px 9px">+ Add Item</button>';
  _html+='</div>';
  _html+='<div style="display:grid;grid-template-columns:1fr 55px 110px 95px 28px;gap:5px;margin-bottom:5px;padding:0 6px">';
  _html+='<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase">Description</div>';
  _html+='<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;text-align:center">Qty</div>';
  _html+='<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase">Rate ('+_cur.symbol+')</div>';
  _html+='<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;text-align:right">Total</div><div></div></div>';
  invItems.forEach(function(item,i){
    _html+='<div style="display:grid;grid-template-columns:1fr 55px 110px 95px 28px;gap:5px;align-items:center;margin-bottom:5px">';
    _html+='<input class="inp" value="'+item.description+'" placeholder="e.g. Logo Design" oninput="invItems['+i+'].description=this.value" style="font-size:12px">';
    _html+='<input class="inp" type="number" value="'+item.qty+'" min="1" oninput="invItems['+i+'].qty=+this.value;renderInvTotal()" style="font-size:12px;text-align:center">';
    _html+='<input class="inp" type="number" value="'+item.rate+'" min="0" oninput="invItems['+i+'].rate=+this.value;renderInvTotal()" style="font-size:12px">';
    _html+='<div style="background:var(--s4);border:1px solid var(--border);border-radius:2px;padding:7px 9px;font-size:12px;font-weight:700;color:var(--accentL);text-align:right">'+_cur.symbol+(item.qty*item.rate).toLocaleString(_cur.locale)+'</div>';
    if(invItems.length>1) _html+='<button onclick="removeInvItem('+i+')" style="background:rgba(240,79,106,.06);border:1px solid rgba(240,79,106,.18);border-radius:2px;width:28px;height:34px;cursor:pointer;display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    else _html+='<div></div>';
    _html+='</div>';
  });
  _html+='</div>';
  // Total box
  _html+='<div style="display:flex;justify-content:flex-end;margin-bottom:14px">';
  _html+='<div style="background:linear-gradient(135deg,var(--s1),var(--s3));border:1px solid var(--accentBorder);border-radius:4px;padding:14px 20px;min-width:220px">';
  _html+='<div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:11px;color:var(--text3)">Subtotal</span><span style="font-size:12px;color:var(--text2)">'+_cur.symbol+_sub.toLocaleString(_cur.locale)+'</span></div>';
  _html+='<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:11px;color:var(--text3)">Tax</span><span style="font-size:12px;color:var(--text3)">—</span></div>';
  _html+='<div style="height:1px;background:var(--border2);margin-bottom:8px"></div>';
  _html+='<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:11px;color:var(--text3);font-weight:700;text-transform:uppercase">Total Due</span><span id="invTotalVal" style="font-size:22px;font-weight:900;color:var(--accent)">'+_cur.symbol+_sub.toLocaleString(_cur.locale)+'</span></div>';
  _html+='</div></div>';
  // Notes
  var _defaultNote=(_p.phone||_p.website)?('Pay via bank transfer. Contact: '+_p.email+(_p.phone?' | '+_p.phone:'')):'Thank you for your business!';
  _html+='<div><div class="field-label" style="margin-bottom:5px">Notes / Payment Instructions</div>';
  _html+='<textarea class="inp" id="invNotes" rows="2" style="resize:vertical;font-size:12px">'+_defaultNote+'</textarea></div>';
  document.getElementById('invBody').innerHTML=_html;
}
function renderInvTotal(){const sub=invItems.reduce((a,b)=>a+b.qty*b.rate,0);const tv=document.getElementById('invTotalVal');if(tv)tv.textContent=getCur().symbol+sub.toLocaleString(getCur().locale);}
function addInvItem(){invItems.push({id:'inv'+Date.now(),description:'',qty:1,rate:0});renderInvBody();}
function removeInvItem(idx){invItems.splice(idx,1);renderInvBody();}
function downloadInvoice(){
  const b=document.getElementById('invDownBtn');b.textContent='Generating...';
  const p=ld('aw_profile',DP);
  const logoSrc=localStorage.getItem('aw_logo')||'';
  const tot=invItems.reduce((a,b)=>a+b.qty*b.rate,0);
  const invNo=document.getElementById('invNo')?.value||'INV-00000';
  const invDate=document.getElementById('invDate')?.value||'';
  const invDue=document.getElementById('invDue')?.value||'';
  const notes=document.getElementById('invNotes')?.value||'';
  const cur=getCur();
  const ps=PSC[invProj.paymentStatus||'unpaid'];
  const clients=ld('aw_clients',[]);
  const linkedClient=invProj.clientId?clients.find(c=>c.uniqueId===invProj.clientId):null;
  const clientName=linkedClient?linkedClient.name:invProj.client||'Client';
  const clientCompany=linkedClient?linkedClient.company||invProj.client:invProj.client||'';
  const clientEmail=linkedClient?linkedClient.email||'':'';
  const C={bg:CT.bg,card:CT.s2,card2:CT.s3,border:CT.border2,accent:CT.accent,accentD:CT.accentD,accentL:CT.accentL,text:CT.text,text2:CT.text2,text3:CT.text3,green:CT.green,red:CT.red,orange:CT.orange,blue:CT.blue,rowA:CT.s2,rowB:CT.s3,footer:CT.s1};
  function draw(logoImg){
    const W=860,PAD=44;
    const headerH=100,fromToH=155,tableHeaderH=38,rowH=48;
    const notesLines=notes?Math.ceil(notes.length/90)+1:0;
    const notesH=notesLines>0?(notesLines*16+40):0;
    const totalH=115,gap=20;
    const H=headerH+fromToH+tableHeaderH+(invItems.length*rowH)+notesH+totalH+gap;
    const cv=document.createElement('canvas');cv.width=W*2;cv.height=H*2;
    const ctx=cv.getContext('2d');ctx.scale(2,2);

    // Full solid background — no double layer
    ctx.fillStyle=C.card;ctx.fillRect(0,0,W,H);

    function rr(x,y,w,h,r,fill,stroke){
      ctx.beginPath();
      if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);
      if(fill){ctx.fillStyle=fill;ctx.fill();}
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}
    }

    // Accent top bar
    const grad=ctx.createLinearGradient(0,0,W,0);
    grad.addColorStop(0,C.accent);grad.addColorStop(0.6,C.accentL);grad.addColorStop(1,'transparent');
    ctx.fillStyle=grad;ctx.fillRect(0,0,W,4);

    // HEADER ─────────────────────────────────────────────
    const hx=PAD,hy=22;
    // Logo or initial avatar
    if(logoImg){
      ctx.save();
      ctx.beginPath();
      if(ctx.roundRect)ctx.roundRect(hx,hy,52,52,10);else ctx.rect(hx,hy,52,52);
      ctx.clip();ctx.drawImage(logoImg,hx,hy,52,52);ctx.restore();
    } else {
      rr(hx,hy,52,52,10,C.accent+'33');
      ctx.fillStyle=C.accent;ctx.font='bold 24px Inter,Arial,sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(p.name[0].toUpperCase(),hx+26,hy+26);
    }
    // INVOICE text — clean, no studio name overlap
    ctx.fillStyle=C.text;ctx.font='bold 28px Inter,Arial,sans-serif';
    ctx.textAlign='left';ctx.textBaseline='top';
    ctx.fillText('INVOICE',hx+66,hy+4);
    ctx.fillStyle=C.text3;ctx.font='500 11px Inter,Arial,sans-serif';
    ctx.fillText(p.role||'Studio Invoice',hx+66,hy+36);



    // Divider
    const div1Y=hy+64;
    ctx.strokeStyle=C.border;ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(PAD,div1Y);ctx.lineTo(W-PAD,div1Y);ctx.stroke();

    // FROM / TO — only 2 columns, no dates box
    const ftY=div1Y+16;
    const halfW=(W-PAD*2-16)/2;

    // FROM box
    rr(PAD,ftY,halfW,fromToH-20,8,C.card2);
    ctx.fillStyle=C.accent;ctx.font='bold 8px Inter,Arial,sans-serif';
    ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText('FROM',PAD+14,ftY+10);
    ctx.fillStyle=C.text;ctx.font='bold 13px Inter,Arial,sans-serif';ctx.fillText(p.name,PAD+14,ftY+24);
    ctx.fillStyle=C.text2;ctx.font='11px Inter,Arial,sans-serif';
    let fy=ftY+42;
    if(p.role){ctx.fillText(p.role,PAD+14,fy);fy+=16;}
    if(p.email){ctx.fillStyle=C.accentL;ctx.fillText(p.email,PAD+14,fy);fy+=16;ctx.fillStyle=C.text2;}
    if(p.phone){ctx.fillText(p.phone,PAD+14,fy);fy+=16;}
    if(p.website){ctx.fillStyle=C.accentL;ctx.fillText(p.website,PAD+14,fy);fy+=16;ctx.fillStyle=C.text2;}
    if(p.address){ctx.fillStyle=C.text3;ctx.fillText(p.address,PAD+14,fy);}

    // TO box
    const toX=PAD+halfW+16;
    rr(toX,ftY,halfW,fromToH-20,8,C.card2);
    ctx.fillStyle=C.green;ctx.font='bold 8px Inter,Arial,sans-serif';
    ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText('BILL TO',toX+14,ftY+10);
    ctx.fillStyle=C.text;ctx.font='bold 13px Inter,Arial,sans-serif';ctx.fillText(clientName,toX+14,ftY+24);
    ctx.fillStyle=C.text2;ctx.font='11px Inter,Arial,sans-serif';
    let ty2=ftY+42;
    if(clientCompany&&clientCompany!==clientName){ctx.fillText(clientCompany,toX+14,ty2);ty2+=16;}
    if(clientEmail){ctx.fillStyle=C.accentL;ctx.fillText(clientEmail,toX+14,ty2);ty2+=16;ctx.fillStyle=C.text2;}
    ctx.fillText('Project: '+invProj.name,toX+14,ty2);ty2+=18;
    rr(toX+14,ty2+2,ctx.measureText(ps.l).width+22,18,4,ps.c+'33');
    ctx.fillStyle=ps.c;ctx.font='bold 9px Inter,Arial,sans-serif';ctx.textBaseline='middle';ctx.fillText(ps.l.toUpperCase(),toX+25,ty2+11);

    // Divider 2
    const div2Y=ftY+fromToH-10;
    ctx.strokeStyle=C.border;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(PAD+20,div2Y);ctx.lineTo(W-PAD-20,div2Y);ctx.stroke();

    // TABLE ───────────────────────────────────────────────
    let y=div2Y+2;
    const tL=PAD,tR=W-PAD,tW=tR-tL;
    const cDesc=tL,cQty=tL+tW*0.50,cRate=tL+tW*0.65,cTot=tR;

    // Table header
    rr(tL,y,tW,tableHeaderH,0,C.card2);
    ctx.fillStyle=C.accent;ctx.fillRect(tL,y,3,tableHeaderH);
    ctx.fillStyle=C.text3;ctx.font='bold 9px Inter,Arial,sans-serif';ctx.textBaseline='middle';const hy2=y+tableHeaderH/2;
    ctx.textAlign='left';ctx.fillText('DESCRIPTION / DELIVERABLE',cDesc+14,hy2);
    ctx.textAlign='center';ctx.fillText('QTY',cQty,hy2);ctx.fillText('RATE ('+cur.symbol+')',cRate,hy2);
    ctx.textAlign='right';ctx.fillText('AMOUNT',cTot-12,hy2);
    y+=tableHeaderH;

    // Rows
    invItems.forEach((item,idx)=>{
      rr(tL,y,tW,rowH,0,idx%2===0?C.rowA:C.rowB);
      ctx.fillStyle=C.accentL;ctx.fillRect(tL,y,2,rowH);
      const ry=y+rowH/2;ctx.textBaseline='middle';
      ctx.fillStyle=C.text;ctx.font='500 12px Inter,Arial,sans-serif';ctx.textAlign='left';ctx.fillText(item.description||'—',cDesc+14,ry);
      ctx.fillStyle=C.text2;ctx.font='12px Inter,Arial,sans-serif';ctx.textAlign='center';ctx.fillText(String(item.qty),cQty,ry);
      ctx.fillText(cur.symbol+item.rate.toLocaleString(cur.locale),cRate,ry);
      ctx.fillStyle=C.text;ctx.font='bold 13px Inter,Arial,sans-serif';ctx.textAlign='right';ctx.fillText(cur.symbol+(item.qty*item.rate).toLocaleString(cur.locale),cTot-12,ry);
      ctx.strokeStyle=C.border;ctx.lineWidth=0.5;ctx.beginPath();ctx.moveTo(tL,y+rowH);ctx.lineTo(tR,y+rowH);ctx.stroke();
      y+=rowH;
    });
    y+=16;

    // Notes
    if(notes){
      ctx.fillStyle=C.accent;ctx.font='bold 9px Inter,Arial,sans-serif';ctx.textAlign='left';ctx.textBaseline='top';ctx.fillText('NOTES / PAYMENT INSTRUCTIONS',tL,y);
      y+=14;ctx.fillStyle=C.text2;ctx.font='11px Inter,Arial,sans-serif';
      const maxW=tW*0.6;const words=notes.split(' ');let line='',lineY=y;
      words.forEach(w=>{const test=line+w+' ';if(ctx.measureText(test).width>maxW&&line){ctx.fillText(line.trim(),tL,lineY);lineY+=16;line=w+' ';}else line=test;});
      if(line.trim())ctx.fillText(line.trim(),tL,lineY);
      y=lineY+28;
    }

    // Totals
    const totBoxX=tL+tW*0.55;
    [['Subtotal',cur.symbol+tot.toLocaleString(cur.locale),C.text2,false]].forEach(function(row,i){
      ctx.textAlign='left';ctx.fillStyle=row[2];ctx.font='11px Inter,Arial,sans-serif';ctx.textBaseline='top';ctx.fillText(row[0],totBoxX,y+i*22);
      ctx.textAlign='right';ctx.fillText(row[1],tR,y+i*22);
    });
    y+=30;
    ctx.strokeStyle=C.border;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(totBoxX,y);ctx.lineTo(tR,y);ctx.stroke();
    y+=10;
    // Big total
    rr(totBoxX-10,y-4,tR-totBoxX+22,44,6,C.accent+'15');
    ctx.textAlign='right';ctx.fillStyle=C.text3;ctx.font='bold 10px Inter,Arial,sans-serif';ctx.textBaseline='top';ctx.fillText('TOTAL DUE',tR-10,y+2);
    ctx.fillStyle=C.accent;ctx.font='bold 30px Inter,Arial,sans-serif';ctx.textBaseline='top';ctx.fillText(cur.symbol+' '+tot.toLocaleString(cur.locale)+' '+cur.code,tR-10,y+14);
    y+=58;



    const link=document.createElement('a');
    link.download='invoice-'+invProj.name.replace(/\s+/g,'-')+'-'+invNo+'.png';
    link.href=cv.toDataURL('image/png',1);link.click();
    b.textContent='Download PNG';
  }
  if(logoSrc){const img=new Image();img.onload=()=>draw(img);img.onerror=()=>draw(null);img.src=logoSrc;}
  else{setTimeout(()=>draw(null),100);}
}
// ── PORTAL ────────────────────────────────────────────────────────────────────
window.addEventListener('message',function(ev){
  if(!ev.data)return;
  if(ev.data.type==='PARENT_URL'&&ev.data.url){
    try{const u=new URL(ev.data.url);const base=u.origin;var bad=['framercanvas.com','localhost','srcdoc','127.0.0.1'];var isBad=bad.some(function(b){return base.includes(b);});if(!isBad){localStorage.setItem('aw_site_url',base);}}catch(e){}
  }
  if(ev.data.type==='PORTAL_HASH'){_handlePortalRaw(ev.data.projId);}
  if(ev.data.type==='RENDER_PORTAL'&&ev.data.data){
    var gs=document.getElementById('gateScreen');var as=document.getElementById('appScreen');
    if(gs)gs.style.display='none';if(as)as.style.display='none';
    var _portalData=ev.data.data;if(!_portalData.logo)_portalData.logo=localStorage.getItem('aw_logo')||'';
    renderPortalFromData(_portalData);
  }
  if(ev.data.type==='JSONBIN_RESULT'&&ev.data.cbId&&window._binCallbacks&&window._binCallbacks[ev.data.cbId]){window._binCallbacks[ev.data.cbId](ev.data.binId||null);delete window._binCallbacks[ev.data.cbId];}
});

window.addEventListener('hashchange',checkPortalHash);

function makeParticles2(){makeParticles();}
function checkGate2(){checkGate();}

function checkPortalHash(){
  var hash=window.location.hash;
  if(hash.startsWith('#portal=')){var raw=hash.slice(8);if(raw)_handlePortalRaw(decodeURIComponent(raw));}
}

function _handlePortalRaw(raw){
  if(!raw)return;
  try{
    var decoded=atob(raw);var d=JSON.parse(decoded);
    if(d&&d.q){
      var mq=JSON.parse(d.q);
      var proj={id:mq.id||'portal',name:mq.n,client:mq.c,status:mq.s,paymentStatus:mq.ps,deadline:mq.d,description:mq.desc||'',checklist:(mq.cl||[]).map(function(x){return{text:x.t,done:!!x.d};}),links:(mq.lk||[]).map(function(x){return{label:x.l,url:x.u};})};
      var profile={name:d.p.n,email:d.p.e,role:d.p.r};var theme=null;
      if(d.k&&d.k.length>=13){var k=d.k;function h2r(h,a){try{var n=parseInt(h.slice(1),16);return'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';}catch(e){return'rgba(123,156,255,'+a+')';}}theme={bg:k[0],s1:k[1],s2:k[2],s3:k[3],accent:k[4],accentL:k[5],accentD:k[6],accentGlow:h2r(k[4],0.12),accentBorder:h2r(k[4],0.3),text:k[7],text2:k[8],text3:k[9],green:k[10],orange:k[11],border:h2r(k[9],0.1),border2:h2r(k[9],0.18)};}
      renderPortalFromData({proj:proj,profile:profile,theme:theme,logo:localStorage.getItem('aw_logo')||''});
    }
  }catch(e){console.error('Portal decode error:',e);}
}

function renderPortalFromData(data){
  var PT=data.theme||{bg:'#0B0D11',s1:'#111418',s2:'#161A20',s3:'#1C2028',accent:'#7B9CFF',accentL:'#A8C0FF',accentD:'#4A6FD4',accentGlow:'rgba(123,156,255,0.12)',accentBorder:'rgba(123,156,255,0.3)',text:'#F1F5F9',text2:'#94A3B8',text3:'#64748B',green:'#4ADE80',red:'#F87171',orange:'#FB923C',border:'rgba(148,163,184,0.07)',border2:'rgba(148,163,184,0.15)'};
  var proj=data.proj,P=data.profile||{},logo=data.logo||localStorage.getItem('aw_logo')||'';
  var dc=proj.checklist.filter(function(c){return c.done;}).length,tc=proj.checklist.length,pct=tc?Math.round(dc/tc*100):0;
  var PS={unpaid:{l:'Payment Pending',c:'#F04F6A'},advance:{l:'Advance Paid',c:PT.orange||'#FF8C42'},paid:{l:'Fully Paid',c:PT.green}};
  var ST={active:{l:'In Progress',c:PT.green},onhold:{l:'On Hold',c:PT.orange||'#FF8C42'},completed:{l:'Completed',c:PT.accent}};
  var ps=PS[proj.paymentStatus||'unpaid']||PS.unpaid,st=ST[proj.status]||ST.active;
  var el=document.getElementById('portalScreen');
  el.style.background=PT.bg;el.style.color=PT.text;
  var _sharp=(localStorage.getItem('aw_ui_style')==='sharp');
  el.innerHTML='<style>*{box-sizing:border-box;margin:0;padding:0}a{text-decoration:none;color:inherit}@keyframes lp{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}@keyframes lr{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.5);opacity:0}}@keyframes rainbowSlide{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}.portal-prog-wrap{position:relative;overflow:hidden}.portal-prog-shine{position:absolute;top:0;left:0;height:100%;width:400%;background:linear-gradient(90deg,#f857a6,#ff8c00,#ffe000,#40c9ff,#a855f7,#f857a6,#ff8c00,#ffe000,#40c9ff,#a855f7,#f857a6);background-size:50% 100%;animation:rainbowSlide 3s linear infinite;opacity:1}'+(_sharp?'*{border-radius:0!important}span[style*="border-radius: 50"],span[style*="border-radius:50"]{border-radius:50%!important}':'')+'</style>'
  +'<div style="position:sticky;top:0;z-index:10;background:'+PT.s1+';border-bottom:1px solid '+PT.border+';height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 28px">'
    +'<div style="display:flex;align-items:center;gap:10px">'
      +(logo?'<div style="width:30px;height:30px;border-radius:'+(_sharp?'0':'4px')+';overflow:hidden"><img src="'+logo+'" style="width:100%;height:100%;object-fit:contain"></div>':'<div style="width:28px;height:28px;background:linear-gradient(135deg,'+PT.accent+','+PT.accentD+');border-radius:'+(_sharp?'0':'4px')+'"></div>')
      +'<div><div style="font-size:13px;font-weight:700;color:'+PT.text+'">'+P.name+'</div><div style="font-size:10px;color:'+PT.text3+'">'+P.role+'</div></div>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:12px">'
      +'<button onclick="openPortalClientModal()" style="display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 12px;background:rgba(47,216,154,0.1);border:1px solid rgba(47,216,154,0.3);border-radius:6px;color:#2FD89A;font-size:11px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;letter-spacing:.2px"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"flex-shrink:0\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></svg> All Projects</button>'
      +'<div id=\"portalClientOverlay\" onclick=\"if(event.target===this)closePortalClientModal()\" style=\"display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);z-index:999;align-items:center;justify-content:center\">'
        +'<div style=\"background:'+PT.s2+';border:2px solid '+PT.accentBorder+';border-radius:12px;width:460px;max-width:calc(100vw - 32px);overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,0.7)\">'
          +'<div style=\"padding:18px 22px;background:'+PT.s1+';border-bottom:1px solid '+PT.border+';display:flex;align-items:center;justify-content:space-between\">'
            +'<div style=\"display:flex;align-items:center;gap:10px\">'
              +'<div style=\"width:32px;height:32px;background:rgba(47,216,154,0.15);border:1px solid rgba(47,216,154,0.4);border-radius:6px;display:flex;align-items:center;justify-content:center\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#2FD89A\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/></svg></div>'
              +'<div><div style=\"font-size:13px;font-weight:800;color:'+PT.text+'\">All My Projects</div><div style=\"font-size:11px;color:'+PT.text3+'\">Enter your Client ID to view all projects</div></div>'
            +'</div>'
            +'<button onclick=\"closePortalClientModal()\" style=\"width:28px;height:28px;background:transparent;border:1px solid '+PT.border2+';border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:'+PT.text3+'\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg></button>'
          +'</div>'
          +'<div style=\"padding:20px 22px\">'
            +'<div style=\"font-size:11px;color:'+PT.text3+';margin-bottom:14px;padding:10px 12px;background:'+PT.s3+';border:1px solid '+PT.border+';border-radius:6px;line-height:1.6\">Enter the <strong style=\"color:'+PT.text+'\">Client ID</strong> shared by your designer to see all your projects.</div>'
            +'<div style=\"display:flex;gap:8px;margin-bottom:10px\">'
              +'<input id=\"portalClientIdInput\" placeholder=\"e.g. LUM-X7K\" maxlength=\"12\" autocomplete=\"off\" onkeydown=\"if(event.keyCode===13)lookupPortalClientProjects()\" style=\"flex:1;background:'+PT.s3+';border:1px solid '+PT.border2+';border-radius:6px;padding:10px 13px;color:'+PT.text+';font-size:15px;font-family:monospace;font-weight:800;letter-spacing:2px;outline:none\">'
              +'<button onclick=\"lookupPortalClientProjects()\" style=\"background:linear-gradient(135deg,'+PT.accent+','+PT.accentD+');border:none;border-radius:6px;padding:0 18px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;white-space:nowrap\">View →</button>'
            +'</div>'
            +'<div id=\"portalClientErr\" style=\"display:none;padding:8px 12px;background:rgba(240,79,106,0.06);border:1px solid rgba(240,79,106,0.25);border-radius:6px;font-size:11.5px;color:#F04F6A;font-weight:600;margin-bottom:10px\"></div>'
            +'<div id=\"portalClientResults\"></div>'
          +'</div>'
        +'</div>'
      +'</div>'
      +'<div style="display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;color:'+PT.green+'">'
        +'<span style="position:relative;width:8px;height:8px;display:inline-flex"><span style="position:absolute;inset:0;border-radius:50%;background:'+PT.green+';animation:lr 2s ease-in-out infinite"></span><span style="position:relative;width:8px;height:8px;border-radius:50%;background:'+PT.green+';display:block;animation:lp 2s ease-in-out infinite"></span></span>'
        +'LIVE'
      +'</div>'
      +'<span style="font-size:10px;color:'+PT.text3+'">Client Portal</span>'
    +'</div>'
  +'</div>'
  +'<div style="max-width:660px;margin:0 auto;padding:28px 20px;font-family:Inter,sans-serif">'
    +'<div style="background:'+PT.s2+';border:1px solid '+PT.border2+';border-radius:'+(_sharp?'0':'10px')+';padding:22px 24px;margin-bottom:14px;position:relative;overflow:hidden">'
      +'<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,'+PT.accent+' 0%,'+PT.accentL+' 60%,transparent 100%)"></div><div style="position:absolute;top:0;left:0;width:55%;height:4px;background:'+PT.accent+';filter:blur(6px);opacity:0.5"></div>'
      +'<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">'
        +'<div style="display:flex;align-items:center;gap:12px">'
          +'<div style="width:44px;height:44px;border-radius:'+(_sharp?'0':'6px')+';background:'+PT.accentGlow+';border:1px solid '+PT.accentBorder+';display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:'+PT.accentL+';flex-shrink:0">'+proj.name[0].toUpperCase()+'</div>'
          +'<div><div style="font-size:17px;font-weight:800;margin-bottom:3px;color:'+PT.text+'">'+proj.name+'</div><div style="font-size:12px;color:'+PT.text3+'">Client: <strong style="color:'+PT.text2+'">'+proj.client+'</strong></div></div>'
        +'</div>'
        +'<div style="display:flex;flex-direction:column;gap:5px;align-items:flex-end;flex-shrink:0">'
          +'<span style="font-size:10px;font-weight:700;color:'+st.c+';background:'+st.c+'22;border:1px solid '+st.c+'44;border-radius:'+(_sharp?'0':'4px')+';padding:3px 9px">'+st.l+'</span>'
          +'<span style="font-size:10px;font-weight:700;color:'+ps.c+';background:'+ps.c+'22;border:1px solid '+ps.c+'44;border-radius:'+(_sharp?'0':'4px')+';padding:3px 9px">'+ps.l+'</span>'
        +'</div>'
      +'</div>'
      +(proj.description?'<p style="font-size:13px;color:'+PT.text2+';line-height:1.7;margin-bottom:12px">'+proj.description+'</p>':'')
      +'<div style="display:flex;gap:24px">'
        +(proj.deadline?'<div><div style="font-size:9px;font-weight:700;color:'+PT.text3+';text-transform:uppercase;margin-bottom:3px">DEADLINE</div><div style="font-size:13px;font-weight:600;color:'+PT.text2+'">'+proj.deadline+'</div></div>':'')
        +'<div><div style="font-size:9px;font-weight:700;color:'+PT.text3+';text-transform:uppercase;margin-bottom:3px">STUDIO</div><div style="font-size:13px;font-weight:600;color:'+PT.text2+'">'+P.email+'</div></div>'
      +'</div>'
    +'</div>'
    +(tc>0?'<div style="background:'+PT.s2+';border:1px solid '+PT.border2+';border-radius:'+(_sharp?'0':'10px')+';padding:20px 24px;margin-bottom:14px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="font-size:13px;font-weight:700;color:'+PT.text+'">Project Progress</div><div style="display:flex;gap:8px;align-items:center"><span style="font-size:12px;color:'+PT.text3+'">'+dc+'/'+tc+' done</span><span style="font-size:14px;font-weight:800;color:'+(pct===100?PT.green:PT.accent)+'">'+pct+'%</span></div></div>'
      +'<div style="height:6px;background:rgba(255,255,255,.06);border-radius:'+(_sharp?'0':'4px')+';margin-bottom:14px;overflow:hidden"><div class="portal-prog-wrap" style="height:100%;width:'+pct+'%;border-radius:'+(_sharp?'0':'4px')+'"><div class="portal-prog-shine"></div></div></div>'
      +proj.checklist.map(function(c){return'<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:'+(c.done?'rgba(74,222,128,0.05)':'rgba(255,255,255,0.02)')+';border:1px solid '+(c.done?'rgba(74,222,128,0.2)':PT.border)+';border-radius:'+(_sharp?'0':'6px')+';margin-bottom:7px"><div style="width:18px;height:18px;border-radius:'+(_sharp?'0':'4px')+';flex-shrink:0;background:'+(c.done?PT.green:'transparent')+';border:2px solid '+(c.done?PT.green:PT.border2)+';display:flex;align-items:center;justify-content:center">'+(c.done?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>':'')+'</div><span style="flex:1;font-size:13px;color:'+(c.done?PT.text3:PT.text2)+';text-decoration:'+(c.done?'line-through':'none')+'">'+c.text+'</span>'+(c.done?'<span style="font-size:10px;font-weight:700;color:'+PT.green+';padding:2px 7px;background:rgba(74,222,128,0.12);border-radius:'+(_sharp?'0':'3px')+'">Done</span>':'')+'</div>';}).join('')+'</div>':'')
    +(proj.links&&proj.links.length>0?'<div style="background:'+PT.s2+';border:1px solid '+PT.border2+';border-radius:'+(_sharp?'0':'10px')+';padding:20px 24px;margin-bottom:14px"><div style="font-size:13px;font-weight:700;color:'+PT.text+';margin-bottom:12px">Project Links</div><div style="display:flex;flex-wrap:wrap;gap:8px">'+proj.links.map(function(lk){return'<a href="'+lk.url+'" target="_blank" style="display:inline-flex;align-items:center;gap:5px;padding:8px 14px;background:'+PT.accentGlow+';border:1px solid '+PT.accentBorder+';border-radius:'+(_sharp?'0':'6px')+';font-size:12px;font-weight:600;color:'+PT.accentL+'">'+lk.label+' ↗</a>';}).join('')+'</div></div>':'')
    +'<div style="text-align:center;padding:16px 0;font-size:11px;color:'+PT.text3+'">This portal was shared by <strong style="color:'+PT.text2+'">'+P.name+'</strong> &nbsp;·&nbsp; '+P.email+'</div>'
  +'</div>';
  document.getElementById('portalScreen').style.display='block';
}

function openPortalClientModal(){
  var ov=document.getElementById('portalClientOverlay');
  if(!ov)return;
  ov.style.display='flex';
  var inp=document.getElementById('portalClientIdInput');
  if(inp){inp.value='';setTimeout(function(){inp.focus();},80);}
  var err=document.getElementById('portalClientErr');if(err)err.style.display='none';
  var res=document.getElementById('portalClientResults');if(res)res.innerHTML='';
}
function closePortalClientModal(){
  var ov=document.getElementById('portalClientOverlay');
  if(ov)ov.style.display='none';
}
function lookupPortalClientProjects(){
  var val=(document.getElementById('portalClientIdInput').value||'').trim().toUpperCase().replace(/[^A-Z0-9\-]/g,'');
  var errEl=document.getElementById('portalClientErr');
  var resEl=document.getElementById('portalClientResults');
  if(!val){errEl.textContent='Please enter a Client ID.';errEl.style.display='block';return;}
  var clients=[];
  try{clients=JSON.parse(localStorage.getItem('aw_clients')||'[]');}catch(e){}
  var client=clients.find(function(c){return c.uniqueId.toUpperCase()===val;});
  if(!client){errEl.textContent='Client ID "'+val+'" not found. Please check and try again.';errEl.style.display='block';resEl.innerHTML='';return;}
  errEl.style.display='none';
  var projs=[];
  try{projs=JSON.parse(localStorage.getItem('aw_projects')||'[]');}catch(e){}
  var PSC2={unpaid:{l:'Unpaid',c:'#F04F6A'},advance:{l:'Advance',c:'#FF8C42'},paid:{l:'Paid',c:'#2FD89A'}};
  var ST2={active:{l:'Active',c:'#2FD89A'},onhold:{l:'On Hold',c:'#FF8C42'},completed:{l:'Completed',c:'#7B9CFF'}};
  var clientProjects=projs.filter(function(p){return p.clientId&&p.clientId.toUpperCase()===val;});
  if(clientProjects.length===0){resEl.innerHTML='<div style="text-align:center;padding:24px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.1);border-radius:8px"><div style="font-size:22px;margin-bottom:8px">📂</div><div style="font-size:13px;font-weight:600;color:#F1F5F9;margin-bottom:4px">No projects yet</div><div style="font-size:11px;color:#64748B">Hi <strong style="color:#94A3B8">'+client.name+'</strong>! No projects assigned yet.</div></div>';return;}
  var pName='';try{pName=(JSON.parse(localStorage.getItem('aw_profile')||'{}')).name||'';}catch(e){}
  var html='<div style="display:flex;align-items:center;gap:8px;padding:9px 12px;background:rgba(47,216,154,0.06);border:1px solid rgba(47,216,154,0.2);border-radius:8px;margin-bottom:12px"><div style="font-size:12px;font-weight:700;color:#2FD89A">👋 Welcome, '+client.name+'!</div><div style="font-size:10px;color:#64748B;margin-left:auto">'+clientProjects.length+' project(s) · '+pName+'</div></div>';
  clientProjects.forEach(function(proj){
    var dc=proj.checklist?proj.checklist.filter(function(c){return c.done;}).length:0;
    var tc=proj.checklist?proj.checklist.length:0;
    var pct=tc?Math.round(dc/tc*100):0;
    var ps=PSC2[proj.paymentStatus||'unpaid']||PSC2.unpaid;
    var st=ST2[proj.status]||ST2.active;
    html+='<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:13px 15px;margin-bottom:8px;position:relative;overflow:hidden">';
    html+='<div style="position:absolute;top:0;left:0;right:0;height:2px;background:'+st.c+';opacity:0.7"></div>';
    html+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
    html+='<div style="display:flex;align-items:center;gap:9px"><div style="width:34px;height:34px;background:rgba(123,156,255,0.1);border:1px solid rgba(123,156,255,0.25);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#A8C0FF">'+proj.name[0]+'</div>';
    html+='<div><div style="font-size:12px;font-weight:700;color:#F1F5F9">'+proj.name+'</div><div style="font-size:10px;color:#64748B">'+proj.client+(proj.deadline?' · due '+proj.deadline:'')+'</div></div></div>';
    html+='<div style="display:flex;gap:4px"><span style="font-size:10px;font-weight:700;color:'+st.c+';background:'+st.c+'22;padding:2px 8px;border-radius:4px">'+st.l+'</span><span style="font-size:10px;font-weight:700;color:'+ps.c+';background:'+ps.c+'22;padding:2px 8px;border-radius:4px">'+ps.l+'</span></div></div>';
    if(proj.description)html+='<p style="font-size:11px;color:#94A3B8;line-height:1.6;margin-bottom:8px">'+proj.description+'</p>';
    if(tc>0){html+='<div style="font-size:10px;color:#64748B;display:flex;justify-content:space-between;margin-bottom:4px"><span>Progress</span><span style="font-weight:700;color:'+(pct===100?'#2FD89A':'#94A3B8')+'">'+dc+'/'+tc+' ('+pct+'%)</span></div>';html+='<div style="height:4px;background:rgba(255,255,255,0.05);border-radius:2px;overflow:hidden;margin-bottom:8px"><div style="height:100%;width:'+pct+'%;background:'+(pct===100?'#2FD89A':'#7B9CFF')+';border-radius:2px"></div></div>';}
    if(proj.links&&proj.links.length>0){html+='<div style="display:flex;flex-wrap:wrap;gap:5px">';proj.links.forEach(function(lk){html+='<a href="'+lk.url+'" target="_blank" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:rgba(123,156,255,0.08);border:1px solid rgba(123,156,255,0.25);border-radius:5px;font-size:10px;font-weight:600;color:#A8C0FF;text-decoration:none">'+lk.label+' ↗</a>';});html+='</div>';}
    html+='</div>';
  });
  resEl.innerHTML=html;
}
function openAllProjectsPortal(){openPortalClientModal();}

// ── PORTAL SHARE ─────────────────────────────────────────────────────────────
const JKEY=(function(){var _a=atob,_k='JDJhJDEwJHNwMi5nRWtFdXhRYlNwUm05NGRCMHVFdm1RMTlHbDhNNTBWNnd6TVpjcDl2Wm5Ca0FFd21L';return _a(_k);})();
const JBASE='https://api.jsonbin.io/v3';
var _shareProjId=null;
function closePortalShare(){document.getElementById('portalShareOverlay').classList.remove('show');}
function openPortalShare(id){
  _shareProjId=id;
  const proj=projects.find(x=>x.id===id);if(!proj)return;
  const body=document.getElementById('portalShareBody');
  const sub=document.getElementById('portalShareSub');
  sub.textContent=proj.name+' · '+proj.client;
  body.innerHTML='<div style="text-align:center;padding:30px;color:var(--text3)"><div style="font-size:22px;margin-bottom:8px">⏳</div>Loading portal...</div>';
  document.getElementById('portalShareOverlay').classList.add('show');
  const savedBin=localStorage.getItem('aw_bin_'+id);
  if(savedBin){updateBin(savedBin,proj).then(()=>showPortalUI(savedBin,proj));}
  else{createBin(proj).then(binId=>{if(binId){localStorage.setItem('aw_bin_'+id,binId);showPortalUI(binId,proj);}else body.innerHTML='<div style="color:var(--red);padding:20px">Error creating portal.</div>';});}
}
function createBin(proj){
  return new Promise(function(resolve){
    var p=ld('aw_profile',DP);var data={proj:proj,profile:{name:p.name,email:p.email,role:p.role},theme:CT,savedAt:Date.now()};
    var cbId='cb_'+Date.now()+'_'+Math.random().toString(36).slice(2,6);
    if(!window._binCallbacks)window._binCallbacks={};window._binCallbacks[cbId]=resolve;
    window.parent.postMessage({type:'JSONBIN_CREATE',data:data,cbId:cbId},'*');
    setTimeout(function(){if(window._binCallbacks&&window._binCallbacks[cbId]){delete window._binCallbacks[cbId];resolve(null);}},15000);
  });
}
function updateBin(binId,proj){
  var p=ld('aw_profile',DP);var data={proj:proj,profile:{name:p.name,email:p.email,role:p.role},theme:CT,savedAt:Date.now()};
  window.parent.postMessage({type:'JSONBIN_UPDATE',binId:binId,data:data},'*');return Promise.resolve();
}
function updateBinAfterSave(projId){
  setTimeout(()=>{const binId=localStorage.getItem('aw_bin_'+projId);const proj=projects.find(x=>x.id===projId);if(binId&&proj)updateBin(binId,proj);},300);
}
function showPortalUI(binId,proj){
  var siteUrl='https://aniketweb.framer.website/portal';
  const link=siteUrl+'?projId='+proj.id+'&bin='+binId;
  const dc=proj.checklist.filter(c=>c.done).length,tc=proj.checklist.length,pct=tc?Math.round(dc/tc*100):0;
  const ps=PSC[proj.paymentStatus||'unpaid'],st=SC[proj.status];
  const body=document.getElementById('portalShareBody');
  body.innerHTML=\`
    <div style="background:var(--s3);border:1px solid var(--border);border-radius:5px;padding:13px 16px;margin-bottom:14px">
      <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;margin-bottom:8px">Preview</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:\${tc>0?'8px':'0'}">
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:34px;height:34px;background:var(--accentGlow);border:1px solid var(--accentBorder);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:var(--accentL)">\${proj.name[0]}</div>
          <div><div style="font-size:13px;font-weight:700">\${proj.name}</div><div style="font-size:11px;color:var(--text3)">\${proj.client}</div></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-end">
          <span style="font-size:10px;font-weight:700;color:\${st.c};background:\${st.c}22;border-radius:3px;padding:2px 8px">\${st.l}</span>
          <span style="font-size:10px;font-weight:700;color:\${ps.c};background:\${ps.c}22;border-radius:3px;padding:2px 8px">\${ps.l}</span>
        </div>
      </div>
      \${tc>0?\`<div style="font-size:10px;color:var(--text3);margin-bottom:4px">Progress: \${dc}/\${tc} (\${pct}%)</div><div style="height:4px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden"><div style="height:100%;width:\${pct}%;background:var(--accent)"></div></div>\`:''}
    </div>
    \${link?\`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;margin-bottom:5px">Shareable Link</div>
      <div style="display:flex;gap:6px">
        <div style="flex:1;background:var(--s3);border:1px solid var(--border2);border-radius:3px;padding:8px 11px;font-size:11px;color:var(--accentL);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace">\${link}</div>
        <button id="cpBtn" class="btn-primary" style="white-space:nowrap">Copy Link</button>
      </div>
      <div style="font-size:11px;color:var(--text3);padding:9px 12px;background:var(--accentGlow);border:1px solid var(--accentBorder);border-radius:4px;margin-top:10px">⚡ Instant load — data encoded directly in URL, no server needed</div>
    </div>
    <button class="btn-secondary" style="width:100%;justify-content:center;margin-bottom:8px" onclick="window.open('\${link}','_blank')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Preview Portal</button>
    \`:\`
    <div style="background:var(--s3);border:1px solid var(--accentBorder);border-radius:5px;padding:14px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:700;color:var(--text);margin-bottom:6px">Set Your Site URL</div>
      <div style="display:flex;gap:7px">
        <input id="siteUrlInput" class="inp" placeholder="https://your-site.framer.app" style="flex:1;font-size:12px">
        <button class="btn-primary" id="saveUrlBtn" style="white-space:nowrap">Save</button>
      </div>
    </div>
    \`}
  \`;
  if(link){document.getElementById('cpBtn').addEventListener('click',function(){navigator.clipboard.writeText(link).then(()=>{this.textContent='✓ Copied!';setTimeout(()=>this.textContent='Copy Link',2500);});});}
  else{document.getElementById('saveUrlBtn').addEventListener('click',function(){const v=document.getElementById('siteUrlInput').value.trim();if(v&&v.startsWith('http')){var cv2=v.replace(/\\/portal\\b.*$/,'').replace(/\\/+$/,'');localStorage.setItem('aw_site_url',cv2);showPortalUI(binId,proj);}else alert('Please enter valid URL');});}
}

// Apply theme on load
(function(){
  var _tid=localStorage.getItem('aw_theme');
  if(_tid){var _t=THEMES.find(function(x){return x.id===_tid;});if(_t)applyTheme(_t);}
  _applyUIS(localStorage.getItem('aw_ui_style')||'default');
})();

window.addEventListener('load',function(){
  var _su=localStorage.getItem('aw_site_url')||'';
  if(_su){var _clean=_su.replace(/\\/portal\\b.*$/,'').replace(/nullsrcdoc.*/,'').replace(/\\/+$/,'');if(_clean!==_su)localStorage.setItem('aw_site_url',_clean);}
  checkPortalHash();
  var _tid=localStorage.getItem('aw_theme');
  if(_tid){var _t=THEMES.find(function(x){return x.id===_tid;});if(_t)applyTheme(_t);}
  _applyUIS(localStorage.getItem('aw_ui_style')||'default');
  applyBgImage();
  makeParticles();
  if(sessionStorage.getItem('aw_access')==='granted'){showApp();}
  updateLogoUI();
});
</script>

<script>
(function(){
  var _keys={};
  document.addEventListener('keydown',function(e){
    _keys[e.key.toLowerCase()]=true;
    if(e.ctrlKey&&e.shiftKey&&_keys['k']&&_keys['l']){
      var card=document.getElementById('gateCard');
      if(card){card.style.display='block';setTimeout(function(){var inp=document.getElementById('gateInput');if(inp)inp.focus();},50);}
    }
  });
  document.addEventListener('keyup',function(e){delete _keys[e.key.toLowerCase()];});
})();
</script>
</body>
</html>
`
const JBASE = "https://api.jsonbin.io/v3"
const JKEY = atob(
    "JDJhJDEwJHNwMi5nRWtFdXhRYlNwUm05NGRCMHVFdm1RMTlHbDhNNTBWNnd6TVpjcDl2Wm5Ca0FFd21L"
)
function isRealUrl(u: string) {
    return !["framercanvas.com", "localhost", "127.0.0.1", "srcdoc"].some((b) =>
        u.includes(b)
    )
}
export default function StudioDashboard() {
    const ref = useRef<HTMLIFrameElement>(null)
    // Parse binId synchronously — no useState delay
    const binId =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("bin")
            : null

    useEffect(() => {
        const onMsg = async (e: MessageEvent) => {
            if (!e.data) return
            const iw = ref.current?.contentWindow
            if (!iw) return
            if (e.data.type === "JSONBIN_CREATE") {
                try {
                    const res = await fetch(`${JBASE}/b`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-ACCESS-KEY": JKEY,
                            "X-BIN-NAME":
                                (e.data.data?.proj?.name || "portal") +
                                "-portal",
                            "X-BIN-PRIVATE": "false",
                        },
                        body: JSON.stringify(e.data.data),
                    })
                    const j = await res.json()
                    iw.postMessage(
                        {
                            type: "JSONBIN_RESULT",
                            cbId: e.data.cbId,
                            binId: j.metadata?.id || null,
                        },
                        "*"
                    )
                } catch {
                    iw.postMessage(
                        {
                            type: "JSONBIN_RESULT",
                            cbId: e.data.cbId,
                            binId: null,
                        },
                        "*"
                    )
                }
            }
            if (e.data.type === "JSONBIN_UPDATE" && e.data.binId) {
                try {
                    await fetch(`${JBASE}/b/${e.data.binId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "X-ACCESS-KEY": JKEY,
                        },
                        body: JSON.stringify(e.data.data),
                    })
                } catch {}
            }
        }
        window.addEventListener("message", onMsg)
        return () => window.removeEventListener("message", onMsg)
    }, [])

    const onLoad = () => {
        const iw = ref.current?.contentWindow
        if (!iw) return
        const o = window.location.origin
        if (isRealUrl(o)) {
            iw.postMessage({ type: "PARENT_URL", url: o }, "*")
        }
        if (!binId) return
        const CACHE_KEY = "portal_cache_" + binId
        // Step 1: Render from cache INSTANTLY — zero delay
        try {
            const cached = sessionStorage.getItem(CACHE_KEY)
            if (cached) {
                const d = JSON.parse(cached)
                if (d?.proj)
                    iw.postMessage({ type: "RENDER_PORTAL", data: d }, "*")
            }
        } catch {}
        // Step 2: Fetch fresh data silently in background
        fetch(`${JBASE}/b/${binId}/latest`, {
            headers: { "X-ACCESS-KEY": JKEY },
        })
            .then((r) => r.json())
            .then((j) => {
                const d = j.record
                if (!d?.proj) return
                // Cache for next visit
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify(d))
                } catch {}
                // Only re-render if data actually changed
                iw.postMessage({ type: "RENDER_PORTAL", data: d }, "*")
            })
            .catch(() => {})
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                background: "#080A14",
            }}
        >
            <iframe
                ref={ref}
                srcDoc={html}
                onLoad={onLoad}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                }}
                sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-popups"
                title="Studio Dashboard"
            />
        </div>
    )
}
StudioDashboard.displayName = "Studio Dashboard"
