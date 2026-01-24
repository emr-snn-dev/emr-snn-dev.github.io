(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg",
        authDomain: "shinonoi-gizyutu.firebaseapp.com",
        projectId: "shinonoi-gizyutu",
        storageBucket: "shinonoi-gizyutu.firebasestorage.app",
        messagingSenderId: "650750036178",
        appId: "1:650750036178:web:f50da8d54383510b6dc50b"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <nav class="global-nav">
            <div class="nav-brand" style="font-family: 'Orbitron', sans-serif; font-weight: 900; letter-spacing: 2px;">
                SHINONO<a href="/team/login.html?code=SNN_2026" style="color: inherit; text-decoration: none; cursor: default;">I</a>
            </div>
            <button class="menu-toggle" id="menu-toggle" aria-label="メニュー開閉">
                <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </button>
            <ul class="nav-links" id="nav-menu">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/portfolio.html">PORTFOLIO</a></li>
                <li><a href="/team/index.html">MEMBER</a></li>
                <li id="auth-status-mobile"></li>
            </ul>
            <div id="auth-status-area" class="auth-status"></div>
        </nav>
    `;

    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    firebase.auth().onAuthStateChanged((user) => {
        const authArea = document.getElementById('auth-status-area');
        const authMobile = document.getElementById('auth-status-mobile');
        if (!authArea) return;

        if (user) {
            const name = user.displayName || "メンバー";
            
            // --- 【追加】ユーザー名入りの透かしを生成する ---
            createWatermark(name);

            const photo = user.photoURL 
                ? `<img src="${user.photoURL}" class="nav-avatar" style="width:30px; height:30px; border-radius:50%; margin-right:8px; vertical-align:middle; border:2px solid #00aeef;">` 
                : `<span class="nav-avatar-icon" style="margin-right:8px;">👤</span>`;

            authArea.innerHTML = `
                <div class="user-badge" style="display: flex; align-items: center; background: #f0f4f8; padding: 5px 15px; border-radius: 50px; border: 1px solid #d9e2ec;">
                    ${photo}<span class="user-name-text" style="font-weight: 900; font-size: 0.85rem; color: #102a43;">${name} さん</span>
                </div>`;
            if(authMobile) authMobile.innerHTML = `<a href="/team/index.html" style="color:#00aeef;">マイページ</a>`;
        } else {
            authArea.innerHTML = `<a href="/team/login.html?code=SNN_2026" class="login-btn" style="background: #00aeef; color: #fff; padding: 8px 25px; border-radius: 50px; text-decoration: none; font-weight: 900; font-size: 0.9rem;">LOGIN</a>`;
            if(authMobile) authMobile.innerHTML = `<a href="/team/login.html?code=SNN_2026" style="color:#00aeef;">LOGIN</a>`;
        }
    });

    // 透かし作成関数
    function createWatermark(userName) {
        const oldMark = document.getElementById('dynamic-watermark');
        if (oldMark) oldMark.remove();

        const watermark = document.createElement('div');
        watermark.id = 'dynamic-watermark';
        watermark.style = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 99999; opacity: 0.15;
            overflow: hidden; display: flex; flex-wrap: wrap; justify-content: space-around;
        `;

        // 画面いっぱいに名前を並べる
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.innerText = userName + " 閲覧中 ";
            span.style = "font-size: 14px; margin: 20px; transform: rotate(-25deg); white-space: nowrap; font-family: sans-serif; font-weight: bold; color: #00aeef;";
            watermark.appendChild(span);
        }
        document.body.appendChild(watermark);
    }
})();
