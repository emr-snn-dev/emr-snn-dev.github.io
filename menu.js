(function() {
    // 1. Firebaseの設定
    const firebaseConfig = {
        apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg",
        authDomain: "shinonoi-gizyutu.firebaseapp.com",
        projectId: "shinonoi-gizyutu",
        storageBucket: "shinonoi-gizyutu.firebasestorage.app",
        messagingSenderId: "650750036178",
        appId: "1:650750036178:web:f50da8d54383510b6dc50b"
    };

    // Firebaseの二重初期化を防止
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    // 2. ナビゲーションの構造を作成
    navContainer.innerHTML = `
        <nav class="global-nav">
            <div class="nav-brand">SHINONOI</div>
            
            <button class="menu-toggle" id="menu-toggle" aria-label="メニュー開閉">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <ul class="nav-links" id="nav-menu">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/projects.html">PROJECTS</a></li>
                <li><a href="/team/index.html">TEAM</a></li>
            </ul>
            
            <div id="auth-status-area" class="auth-status"></div>
        </nav>
    `;

    // 3. ハンバーガーメニューの制御
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 4. ログイン状態の監視と表示
    firebase.auth().onAuthStateChanged((user) => {
        const authArea = document.getElementById('auth-status-area');
        if (!authArea) return;

        if (user) {
            const name = user.displayName || user.email.split('@')[0];
            const photo = user.photoURL 
                ? `<img src="${user.photoURL}" class="nav-avatar">` 
                : `<span class="nav-avatar-icon" style="color:white;font-size:1.2rem;">👤</span>`;

            authArea.innerHTML = `
                <div class="user-badge">
                    ${photo}
                    <span class="user-name-text">${name}</span>
                </div>
            `;
        } else {
            authArea.innerHTML = `<a href="/team/login.html" class="nav-login-btn">LOGIN</a>`;
        }
    });
})();
