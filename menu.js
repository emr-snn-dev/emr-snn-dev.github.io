function() {
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

    // 日本語メニューの生成
    navContainer.innerHTML = `
        <nav class="global-nav">
            <div class="nav-brand">篠ノ井技術クラブ</div>
            
            <button class="menu-toggle" id="menu-toggle" aria-label="メニュー開閉">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <ul class="nav-links" id="nav-menu">
                <li><a href="/index.html">ホーム</a></li>
                <li><a href="/about.html">クラブ紹介</a></li>
                <li><a href="/projects.html">活動実績</a></li>
                <li><a href="/team/index.html">メンバー専用</a></li>
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

    // ログイン状態の日本語表示
    firebase.auth().onAuthStateChanged((user) => {
        const authArea = document.getElementById('auth-status-area');
        if (!authArea) return;

        if (user) {
            const name = user.displayName || "メンバー";
            const photo = user.photoURL 
                ? `<img src="${user.photoURL}" class="nav-avatar">` 
                : `<span class="nav-avatar-icon">👤</span>`;

            authArea.innerHTML = `
                <div class="user-badge">
                    ${photo}
                    <span class="user-name-text">${name} さん</span>
                </div>
            `;
        } else {
            authArea.innerHTML = `<a href="/team/login.html" class="nav-login-btn">ログイン</a>`;
        }
    });
})();
