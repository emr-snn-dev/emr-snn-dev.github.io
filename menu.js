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
            </nav>`;
        
        const toggleBtn = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        // メニューの開閉処理（スマホ版の動作不全を確実に修正）
        toggleBtn.onclick = (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            toggleBtn.classList.toggle('active');
            
            // 下からせり出す動きを完結させ、背面スクロールを固定
            if(isActive) {
                document.body.style.overflow = 'hidden';
                // CSSの bottom: -120% から 0 への変化をJS側でも確実にトリガー
                navMenu.style.bottom = '0';
            } else {
                document.body.style.overflow = '';
                navMenu.style.bottom = '';
            }
        };

        // 【隠しコマンド】ロゴの「I」を5回連続タップ
        let tapCount = 0;
        let tapTimer;
        const gate = document.getElementById('secret-gate');
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

        // メニューの外側をタップしたら閉じる
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                toggleBtn.classList.remove('active');
                navMenu.style.bottom = '';
                document.body.style.overflow = '';
            }
        });
    }

    // 認証状態の監視
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

    // GitHubから画像取得
    async function loadGithubImages(isHighRes) {
        try {
            const res = await fetch(`https://api.github.com/repos/emr-snn-dev/emr-snn-dev.github.io/contents/images`);
            const files = await res.json();
            const badge = document.getElementById('log-new-badge');
            if (badge && files.length > 0) badge.style.display = "block"; 
            if (typeof renderGallery === "function") renderGallery(files, isHighRes);
        } catch (e) { console.error(e); }
    }

    // 透かしの作成
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
