(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg",
        authDomain: "shinonoi-gizyutu.firebaseapp.com",
        projectId: "shinonoi-gizyutu",
        storageBucket: "shinonoi-gizyutu.firebasestorage.app",
        messagingSenderId: "650750036178",
        appId: "1:650750036178:web:f50da8d54383510b6dc50b",
        databaseURL: "https://shinonoi-gizyutu-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

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
            <div id="mobile-line-menu" style="display:none; position:fixed; bottom:0; left:0; width:100%; height:70px; background:#ffffff; border-top:1px solid #e0e0e0; z-index:10006; overflow-x:auto; white-space:nowrap; padding:10px 0; -webkit-overflow-scrolling:touch; box-shadow:0 -2px 10px rgba(0,0,0,0.05);">
                <div style="display:inline-flex; gap:12px; padding:0 20px; align-items:center; height:100%;">
                    <a href="/index.html" style="display:inline-block; padding:10px 22px; background:#f0f2f5; color:#4b5563; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; -webkit-tap-highlight-color:transparent;">Home</a>
                    <a href="/about.html" style="display:inline-block; padding:10px 22px; background:#f0f2f5; color:#4b5563; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; -webkit-tap-highlight-color:transparent;">About</a>
                    <a href="/portfolio.html" style="display:inline-block; padding:10px 22px; background:#f0f2f5; color:#4b5563; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; -webkit-tap-highlight-color:transparent;">Portfolio</a>
                    <a href="/team/index.html" style="display:inline-block; padding:10px 22px; background:#f0f2f5; color:#4b5563; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; -webkit-tap-highlight-color:transparent;">Member</a>
                    <a href="/activity-log.html" style="display:inline-block; padding:10px 22px; background:#f0f2f5; color:#4b5563; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; -webkit-tap-highlight-color:transparent;">Log</a>
                </div>
            </div>`;
        
        const lineMenu = document.getElementById('mobile-line-menu');
        const navMenu = document.getElementById('nav-menu');
        const toggleBtn = document.getElementById('menu-toggle');

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                if (lineMenu) lineMenu.style.display = 'block';
                if (toggleBtn) toggleBtn.style.display = 'none';
                if (navMenu) {
                    navMenu.style.display = 'none';
                }
                document.body.style.paddingBottom = '70px';
            } else {
                if (lineMenu) lineMenu.style.display = 'none';
                if (toggleBtn) toggleBtn.style.display = 'none'; 
                if (navMenu) {
                    navMenu.style.display = 'flex';
                    navMenu.style.position = 'static';
                }
                document.body.style.paddingBottom = '0';
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
            if (!res.ok) return;
            const files = await res.json();
            const badge = document.getElementById('log-new-badge');
            if (badge && Array.isArray(files) && files.length > 0) {
                badge.style.display = "block";
            }
            if (typeof renderGallery === "function") renderGallery(files, isHighRes);
        } catch (e) { 
            console.error("Github Load Error:", e); 
        }
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
