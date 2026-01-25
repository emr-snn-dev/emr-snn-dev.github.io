(function() { const firebaseConfig = { apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg", authDomain: "shinonoi-gizyutu.firebaseapp.com", projectId: "shinonoi-gizyutu", storageBucket: "shinonoi-gizyutu.firebasestorage.app", messagingSenderId: "650750036178", appId: "1:650750036178:web:f50da8d54383510b6dc50b", databaseURL: "https://shinonoi-gizyutu-default-rtdb.asia-southeast1.firebasedatabase.app" };

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const navContainer = document.getElementById('nav-container');
if (navContainer) {
    navContainer.innerHTML = `
        <nav class="global-nav">
            <div class="nav-brand" style="font-family:'Orbitron'; font-weight:900; user-select:none;">
                SHINONO<span id="secret-gate" style="cursor:default; color:inherit;">I</span>
            </div>
            <div id="auth-status-area" class="auth-status"></div>
            <button class="menu-toggle" id="menu-toggle">
                <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </button>
            <ul class="nav-links" id="nav-menu">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/portfolio.html">PORTFOLIO</a></li>
                <li><a href="/team/index.html">MEMBER</a></li>
                <li style="position:relative;">
                    <a href="/activity-log.html">LOG</a>
                    <span id="log-new-badge" style="display:none; position:absolute; top:0; right:-5px; width:8px; height:8px; background:#ff4d4d; border-radius:50%;"></span>
                </li>
                <li id="auth-status-mobile"></li>
            </ul>
        </nav>
        <div id="mobile-bottom-bar" style="display:none; position:fixed; bottom:0; left:0; width:100%; height:60px; background:rgba(255,255,255,0.98); backdrop-filter:blur(10px); border-top:3px solid #00aeef; z-index:10005; justify-content:space-around; align-items:center; box-shadow:0 -2px 15px rgba(0,0,0,0.1);">
            <div style="font-family:'Orbitron'; font-weight:900; font-size:0.9rem; color:#102a43; margin-left:20px;">SHINONO-I</div>
            <button id="mobile-popup-trigger" style="background:#00aeef; color:#fff; border:none; padding:10px 25px; border-radius:30px; font-weight:900; font-size:0.9rem; margin-right:15px; cursor:pointer; outline:none; -webkit-tap-highlight-color:transparent;">MENU</button>
        </div>`;
    
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const bottomBar = document.getElementById('mobile-bottom-bar');
    const popupTrigger = document.getElementById('mobile-popup-trigger');

    const toggleMenu = (e) => {
        e.stopPropagation();
        const isActive = navMenu.classList.toggle('active');
        if (toggleBtn) toggleBtn.classList.toggle('active');
        
        if(isActive) {
            document.body.style.overflow = 'hidden';
            navMenu.style.bottom = '60px'; // ボトムバーの高さ分上げる
        } else {
            document.body.style.overflow = '';
            navMenu.style.bottom = '-120%';
        }
    };

    if (toggleBtn) toggleBtn.onclick = toggleMenu;
    if (popupTrigger) popupTrigger.onclick = toggleMenu;

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            if (bottomBar) bottomBar.style.display = 'flex';
            if (toggleBtn) toggleBtn.style.display = 'none';
            navMenu.style.position = 'fixed';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            if (!navMenu.classList.contains('active')) {
                navMenu.style.bottom = '-120%';
            } else {
                navMenu.style.bottom = '60px';
            }
        } else {
            if (bottomBar) bottomBar.style.display = 'none';
            if (toggleBtn) toggleBtn.style.display = 'flex';
            navMenu.style.position = '';
            navMenu.style.bottom = '';
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let tapCount = 0;
    let tapTimer;
    const gate = document.getElementById('secret-gate');
    if (gate) {
        gate.onclick = (e) => {
            e.stopPropagation();
            tapCount++;
            clearTimeout(tapTimer);
            if (tapCount >= 5) {
                window.location.href = "/team/login.html?code=SNN_2026";
                tapCount = 0;
            }
            tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
        };
    }

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !popupTrigger.contains(e.target)) {
            navMenu.classList.remove('active');
            if (toggleBtn) toggleBtn.classList.remove('active');
            navMenu.style.bottom = '-120%';
            document.body.style.overflow = '';
        }
    });
}

firebase.auth().onAuthStateChanged((user) => {
    const area = document.getElementById('auth-status-area');
    const mob = document.getElementById('auth-status-mobile');
    const statusText = document.getElementById('log-status-text');

    if (user) {
        const name = user.displayName || "メンバー";
        const userDisplay = `<span style="color:#00aeef; font-weight:900;">${name}</span>`;
        if (area) area.innerHTML = userDisplay;
        if (mob) mob.innerHTML = `<a href="/team/index.html">MY PAGE</a>`;
        if (statusText) statusText.innerText = "AUTHENTICATED: " + name.toUpperCase();
        
        createWatermark(name);
        if (document.getElementById('auto-gallery')) loadGithubImages(true);
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const isSecret = (urlParams.get('code') === 'SNN_2026');
        
        const loginBtn = isSecret ? 
            `<a href="/team/login.html?code=SNN_2026" style="background:#00aeef; color:#fff; padding:5px 15px; border-radius:50px; text-decoration:none; font-size:0.8rem; font-weight:bold;">LOGIN</a>` :
            `<span style="color:#486581; font-size:0.7rem;">GUEST MODE</span>`;
        
        if (area) area.innerHTML = loginBtn;
        if (mob) mob.innerHTML = loginBtn;
        if (statusText) statusText.innerText = "GUEST MODE (LOW-RES PREVIEW)";
        
        const oldWm = document.getElementById('dynamic-watermark');
        if (oldWm) oldWm.remove();
        if (document.getElementById('auto-gallery')) loadGithubImages(false);
    }
});

async function loadGithubImages(isHighRes) {
    try {
        const res = await fetch(`https://api.github.com/repos/emr-snn-dev/emr-snn-dev.github.io/contents/images`);
        const files = await res.json();
        const badge = document.getElementById('log-new-badge');
        if (badge && files.length > 0) badge.style.display = "block"; 
        if (typeof renderGallery === "function") renderGallery(files, isHighRes);
    } catch (e) { console.error(e); }
}

function createWatermark(name) {
    const old = document.getElementById('dynamic-watermark');
    if (old) old.remove();
    const wm = document.createElement('div');
    wm.id = 'dynamic-watermark';
    wm.style = "position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:99999; opacity:0.1; overflow:hidden; display:flex; flex-wrap:wrap; justify-content:space-around;";
    for (let i = 0; i < 40; i++) {
        const s = document.createElement('span');
        s.innerText = name + " 閲覧中 ";
        s.style = "font-size:12px; margin:20px; transform:rotate(-25deg); white-space:nowrap; color:#00aeef; font-weight:bold;";
        wm.appendChild(s);
    }
    document.body.appendChild(wm);
}
})();
