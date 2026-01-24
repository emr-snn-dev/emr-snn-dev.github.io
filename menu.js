(function() {
    // Firebase設定
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

    // メニュー生成（デザイン統合版）
    navContainer.innerHTML = `
        <nav class="global-nav">
            <div class="nav-brand" style="font-family: 'Orbitron', sans-serif; font-weight: 900; letter-spacing: 2px;">SHINONOI</div>
            
            <button class="menu-toggle" id="menu-toggle" aria-label="メニュー開閉">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <ul class="nav-links" id="nav-menu">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/Portfolio.html">PORTFOLIO</a></li>
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

    // ログイン状態の表示制御
    firebase.auth().onAuthStateChanged((user) => {
        const authArea = document.getElementById('auth-status-area');
        const authMobile = document.getElementById('auth-status-mobile');
        if (!authArea) return;

        if (user) {
            const name = user.displayName || "メンバー";
            const photo = user.photoURL 
                ? `<img src="${user.photoURL}" class="nav-avatar" style="width:30px; height:30px; border-radius:50%; margin-right:8px; vertical-align:middle; border:2px solid #00aeef;">` 
                : `<span class="nav-avatar-icon" style="margin-right:8px;">👤</span>`;

            const userHtml = `
                <div class="user-badge" style="display: flex; align-items: center; background: #f0f4f8; padding: 5px 15px; border-radius: 50px; border: 1px solid #d9e2ec;">
                    ${photo}
                    <span class="user-name-text" style="font-weight: 900; font-size: 0.85rem; color: #102a43;">${name} さん</span>
                </div>
            `;
            authArea.innerHTML = userHtml;
            if(authMobile) authMobile.innerHTML = `<a href="/team/index.html" style="color:#00aeef;">マイページ</a>`;
        } else {
            // ログインしていない時の「水色ボタン」
            const loginBtnHtml = `<a href="/team/login.html" class="login-btn" style="background: #00aeef; color: #fff; padding: 8px 25px; border-radius: 50px; text-decoration: none; font-weight: 900; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(0, 174, 239, 0.3); transition: 0.3s;">LOGIN</a>`;
            authArea.innerHTML = loginBtnHtml;
            if(authMobile) authMobile.innerHTML = `<a href="/team/login.html" style="color:#00aeef;">LOGIN</a>`;
        }
    });
})();
