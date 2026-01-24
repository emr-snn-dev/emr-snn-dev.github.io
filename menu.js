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
            createWatermark(name);

            const photo = user.photoURL 
                ? `<img src="${user.photoURL}" class="nav-avatar" style="width:30px; height:30px; border-radius:50%; margin-right:8px; vertical-align:middle; border:2px solid #00aeef;">` 
                : `<span class="nav-avatar-icon" style="margin-right:8px;">👤</span>`;

            authArea.innerHTML = `
                <div class="user-badge" style="display: flex; align-items: center; background: #f0f4f8; padding: 5px 15px; border-radius: 50px; border: 1px solid #d9e2ec;">
                    ${photo}<span class="user-name-text" style="font-weight: 900; font-size: 0.85rem; color: #102a43;">${name} さん</span>
                </div>`;
            if(authMobile) authMobile.innerHTML = `<a href="/team/index.html" style="color:#00aeef;">マイページ</a>`;
            
            // ログイン済みならGitHubギャラリーを読み込む（activity-log.htmlの場合）
            if(document.getElementById('auto-gallery')) {
                loadGithubImages();
            }
        } else {
            authArea.innerHTML = `<a href="/team/login.html?code=SNN_2026" class="login-btn" style="background: #00aeef; color: #fff; padding: 8px 25px; border-radius: 50px; text-decoration: none; font-weight: 900; font-size: 0.9rem;">LOGIN</a>`;
            if(authMobile) authMobile.innerHTML = `<a href="/team/login.html?code=SNN_2026" style="color:#00aeef;">LOGIN</a>`;
        }
    });

    function createWatermark(userName) {
        const oldMark = document.getElementById('dynamic-watermark');
        if (oldMark) oldMark.remove();
        const watermark = document.createElement('div');
        watermark.id = 'dynamic-watermark';
        watermark.style = "position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:99999; opacity:0.12; overflow:hidden; display:flex; flex-wrap:wrap; justify-content:space-around;";
        for (let i = 0; i < 60; i++) {
            const span = document.createElement('span');
            span.innerText = userName + " 閲覧中 ";
            span.style = "font-size:12px; margin:15px; transform:rotate(-25deg); white-space:nowrap; font-weight:bold; color:#00aeef;";
            watermark.appendChild(span);
        }
        document.body.appendChild(watermark);
    }

    // GitHub /images/ フォルダから画像を自動取得
    async function loadGithubImages() {
        const galleryArea = document.getElementById('auto-gallery');
        const user = "emr-snn-dev";
        const repo = "emr-snn-dev.github.io";
        try {
            const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/images`);
            const files = await response.json();
            galleryArea.innerHTML = ""; // 初期化
            files.forEach(file => {
                if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    const item = document.createElement('div');
                    item.className = 'photo-item';
                    item.style = "position:relative; break-inside:avoid; margin-bottom:10px; border:2px solid #00aeef; border-radius:8px; overflow:hidden;";
                    
                    // 画像のURL
                    const url = file.download_url;
                    
                    // 文字表示
                    let label = "";
                    if(file.name.includes('_txt')) {
                        label = `<div class="photo-label" style="position:absolute; bottom:0; width:100%; background:rgba(0,174,239,0.8); color:#fff; font-size:10px; text-align:center; padding:4px; z-index:10;">${file.name.split('_txt')[0]}</div>`;
                    }

                    // 保存防止ガード（透明な板を画像の上に重ねる）
                    const guard = `<div style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:5;" onclick="openLightbox('${url}')"></div>`;
                    
                    item.innerHTML = `<img src="${url}" style="width:100%; display:block; filter:blur(0.2px);">${label}${guard}`;
                    galleryArea.appendChild(item);
                }
            });
        } catch (e) { console.error(e); }
    }
})();
