(function() {
    // 1. Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg",
        authDomain: "shinonoi-gizyutu.firebaseapp.com",
        projectId: "shinonoi-gizyutu",
        storageBucket: "shinonoi-gizyutu.firebasestorage.app",
        messagingSenderId: "650750036178",
        appId: "1:650750036178:web:f50da8d54383510b6dc50b",
        databaseURL: "https://shinonoi-gizyutu-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

    // 2. Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    // 3. UI Generator (Navigation & Mobile Line Menu)
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = `
            <nav class="global-nav">
                <div class="nav-brand" style="font-family:'Orbitron'; font-weight:900; user-select:none;">
                    SHINONO<span id="secret-gate" style="cursor:default; color:inherit;">I</span>
                </div>
                <div id="auth-status-area" class="auth-status"></div>
                <button class="menu-toggle" id="menu-toggle" style="display:none;">
                    <span class="bar"></span><span class="bar"></span><span class="bar"></span>
                </button>
                <ul class="nav-links" id="nav-menu">
                    <li><a href="/index.html">HOME</a></li>
                    <li><a href="/about.html">ABOUT</a></li>
                    <li><a href="/portfolio.html">PORTFOLIO</a></li>
                    <li><a href="/blog/index.html">BLOG</a></li>
                    <li><a href="/team/index.html">MEMBER</a></li>
                    <li style="position:relative;">
                        <a href="/activity-log.html">LOG</a>
                        <span id="log-new-badge" style="display:none; position:absolute; top:0; right:-5px; width:8px; height:8px; background:#ff4d4d; border-radius:50%;"></span>
                    </li>
                    <li id="auth-status-mobile"></li>
                </ul>
            </nav>
            <div id="mobile-line-menu" style="display:none; position:fixed; bottom:0; left:0; width:100%; height:75px; background:rgba(255,255,255,0.95); backdrop-filter:blur(10px); border-top:1px solid #e2e8f0; z-index:10006; overflow-x:auto; white-space:nowrap; -webkit-overflow-scrolling:touch; box-shadow:0 -4px 12px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
                <div style="display:inline-flex; gap:12px; padding:15px 20px; align-items:center; height:100%; box-sizing:border-box;">
                    <a href="/index.html" class="m-chip" style="display:inline-block; padding:10px 24px; background:#f1f5f9; color:#475569; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; border:1px solid #e2e8f0;">Home</a>
                    <a href="/about.html" class="m-chip" style="display:inline-block; padding:10px 24px; background:#f1f5f9; color:#475569; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; border:1px solid #e2e8f0;">About</a>
                    <a href="/blog/index.html" class="m-chip" style="display:inline-block; padding:10px 24px; background:#00aeef; color:#fff; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; border:1px solid #00aeef;">Blog</a>
                    <a href="/team/index.html" class="m-chip" style="display:inline-block; padding:10px 24px; background:#f1f5f9; color:#475569; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; border:1px solid #e2e8f0;">Member</a>
                    <a href="/activity-log.html" class="m-chip" style="display:inline-block; padding:10px 24px; background:#f1f5f9; color:#475569; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; border:1px solid #e2e8f0;">Log</a>
                    <a href="/downloads.html" class="m-chip" style="display:inline-block; padding:10px 24px; background:#f1f5f9; color:#475569; border-radius:20px; text-decoration:none; font-weight:900; font-size:14px; border:1px solid #e2e8f0;">Download</a>
                </div>
            </div>`;
        
        const lineMenu = document.getElementById('mobile-line-menu');
        const navMenu = document.getElementById('nav-menu');
        const toggleBtn = document.getElementById('menu-toggle');

        // 4. Responsive Layout Controller
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                if (lineMenu) lineMenu.style.display = 'block';
                if (toggleBtn) toggleBtn.style.display = 'none';
                if (navMenu) navMenu.style.display = 'none';
                document.body.style.paddingBottom = '75px';
            } else {
                if (lineMenu) lineMenu.style.display = 'none';
                if (toggleBtn) toggleBtn.style.display = 'none'; 
                if (navMenu) {
                    navMenu.style.display = 'flex';
                    navMenu.style.position = 'static';
                    navMenu.style.opacity = '1';
                }
                document.body.style.paddingBottom = '0';
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // 5. Secret Gate Logic
        let tapCount = 0;
        let tapTimer;
        const gate = document.getElementById('secret-gate');
        if (gate) {
            gate.style.transition = 'color 0.3s';
            gate.onclick = (e) => {
                e.stopPropagation();
                tapCount++;
                clearTimeout(tapTimer);
                if (tapCount >= 5) {
                    gate.style.color = '#00aeef';
                    window.location.href = "/team/login.html?code=SNN_2026";
                    tapCount = 0;
                }
                tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
            };
        }
    }

    // 6. Firebase Auth State Observer
    firebase.auth().onAuthStateChanged((user) => {
        const area = document.getElementById('auth-status-area');
        const mob = document.getElementById('auth-status-mobile');
        const statusText = document.getElementById('log-status-text');

        if (user) {
            const name = user.displayName || "MEMBER";
            const userDisplay = `<span style="color:#00aeef; font-weight:900; border-left:2px solid #00aeef; padding-left:10px;">${name}</span>`;
            
            if (area) area.innerHTML = userDisplay;
            if (mob) mob.innerHTML = `<a href="/team/index.html" style="color:#00aeef;">MY PAGE</a>`;
            if (statusText) statusText.innerText = "STATUS: AUTHENTICATED / " + name.toUpperCase();
            
            createWatermark(name);
            if (document.getElementById('auto-gallery')) loadGithubImages(true);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const isSecret = (urlParams.get('code') === 'SNN_2026');
            
            const loginBtn = isSecret ? 
                `<a href="/team/login.html?code=SNN_2026" style="background:#00aeef; color:#fff; padding:6px 18px; border-radius:50px; text-decoration:none; font-size:0.8rem; font-weight:bold; transition:0.3s; box-shadow:0 2px 8px rgba(0,174,239,0.3);">LOGIN</a>` :
                `<span style="color:#94a3b8; font-size:0.75rem; letter-spacing:1px;">GUEST MODE</span>`;
            
            if (area) area.innerHTML = loginBtn;
            if (mob) mob.innerHTML = loginBtn;
            if (statusText) statusText.innerText = "STATUS: GUEST MODE (LIMITED ACCESS)";
            
            const oldWm = document.getElementById('dynamic-watermark');
            if (oldWm) oldWm.remove();
            if (document.getElementById('auto-gallery')) loadGithubImages(false);
        }
    });

    // 7. Github Contents Loader
    async function loadGithubImages(isHighRes) {
        const githubEndpoint = `https://api.github.com/repos/emr-snn-dev/emr-snn-dev.github.io/contents/images`;
        try {
            const response = await fetch(githubEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            const files = await response.json();
            
            const badge = document.getElementById('log-new-badge');
            if (badge && Array.isArray(files) && files.length > 0) {
                badge.style.display = "block";
                badge.animate([
                    { transform: 'scale(1)', opacity: 1 },
                    { transform: 'scale(1.5)', opacity: 0.5 },
                    { transform: 'scale(1)', opacity: 1 }
                ], { duration: 2000, iterations: Infinity });
            }

            if (typeof renderGallery === "function") {
                renderGallery(files, isHighRes);
            }
        } catch (error) {
            console.error("Failed to sync with Github:", error);
        }
    }

    // 8. Dynamic Watermark System
    function createWatermark(name) {
        const existing = document.getElementById('dynamic-watermark');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.id = 'dynamic-watermark';
        const styles = {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '99999',
            opacity: '0.07',
            overflow: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignContent: 'space-around'
        };
        Object.assign(container.style, styles);

        const count = window.innerWidth < 768 ? 20 : 50;
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.innerText = `${name} INTERNAL USE ONLY`;
            span.style.fontSize = '14px';
            span.style.fontWeight = 'bold';
            span.style.color = '#00aeef';
            span.style.transform = `rotate(-25deg) translateY(${Math.random() * 20}px)`;
            span.style.whiteSpace = 'nowrap';
            span.style.margin = '40px';
            container.appendChild(span);
        }
        document.body.appendChild(container);
    }

    // 9. Page Scroll UI interaction
    window.addEventListener('scroll', () => {
        const bottomMenu = document.getElementById('mobile-line-menu');
        if (bottomMenu && window.innerWidth <= 768) {
            if (window.scrollY > 50) {
                bottomMenu.style.background = "rgba(255,255,255,0.98)";
            } else {
                bottomMenu.style.background = "rgba(255,255,255,0.95)";
            }
        }
    });

    console.log("SHINONO-I Navigation System v2026.2.5 Fully Initialized.");
})();
