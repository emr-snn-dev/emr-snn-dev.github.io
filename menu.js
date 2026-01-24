(function() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

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

    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function initAuth() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
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
        }
    }
    setTimeout(initAuth, 600);
})();
