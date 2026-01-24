// Firebase設定
const firebaseConfig = {
    apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg",
    authDomain: "shinonoi-gizyutu.firebaseapp.com",
    projectId: "shinonoi-gizyutu",
    storageBucket: "shinonoi-gizyutu.firebasestorage.app",
    messagingSenderId: "650750036178",
    appId: "1:650750036178:web:f50da8d54383510b6dc50b"
};

// 二重初期化防止
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const navContainer = document.getElementById('nav-container');

// ナビゲーションを生成（HTMLに直書きされていた古いメニューは消してください）
if (navContainer) {
    navContainer.innerHTML = `
        <nav class="global-nav">
            <ul class="nav-links">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/projects.html">PROJECTS</a></li>
                <li><a href="/team/index.html">TEAM</a></li>
            </ul>
            <div id="auth-status-area" class="auth-status"></div>
        </nav>
    `;
}

// ログイン状態を全ページで監視
firebase.auth().onAuthStateChanged((user) => {
    const authArea = document.getElementById('auth-status-area');
    if (!authArea) return;

    if (user) {
        const userName = user.displayName || user.email.split('@')[0];
        const userPhoto = user.photoURL 
            ? `<img src="${user.photoURL}" class="nav-avatar">` 
            : `<span class="nav-avatar-icon">👤</span>`;

        authArea.innerHTML = `
            <div class="user-badge">
                ${userPhoto}
                <span class="user-name-text">${userName}</span>
            </div>
        `;
    } else {
        // 未ログイン時はログイン画面へのリンクを表示
        authArea.innerHTML = `
            <a href="/team/login.html" class="nav-login-btn">TEAM LOGIN</a>
        `;
    }
});
