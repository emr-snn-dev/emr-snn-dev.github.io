// menu.js
(function() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    // 1. まずメニューの形を強制的に作る（Firebaseを待たない）
    navContainer.innerHTML = `
        <nav class="global-nav">
            <ul class="nav-links">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/projects.html">PROJECTS</a></li>
                <li><a href="/team/index.html">TEAM</a></li>
            </ul>
            <div id="auth-status-area" class="auth-status">
                <span id="loading-dots" style="color:#666; font-size:0.7rem;">Checking...</span>
            </div>
        </nav>
    `;

    // 2. Firebaseが準備できているか確認して監視を開始
    function startAuthWatch() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
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
                    authArea.innerHTML = `<a href="/team/login.html" class="nav-login-btn">TEAM LOGIN</a>`;
                }
            });
        }
    }

    // Firebaseが読み込まれるのを少し待ってから実行
    setTimeout(startAuthWatch, 500);
})();
