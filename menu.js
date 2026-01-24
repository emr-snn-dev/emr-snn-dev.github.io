(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBwT-Df-5F4Wdyg-nJfg1OPolTMNUN0srg",
        authDomain: "shinonoi-gizyutu.firebaseapp.com",
        projectId: "shinonoi-gizyutu",
        storageBucket: "shinonoi-gizyutu.firebasestorage.app",
        messagingSenderId: "650750036178",
        appId: "1:650750036178:web:f50da8d54383510b6dc50b"
    };

    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <nav class="global-nav">
            <div class="nav-brand" style="font-family:'Orbitron'; font-weight:900;">
                SHINONO<a href="/team/login.html?code=SNN_2026" style="color:inherit; text-decoration:none; cursor:default;">I</a>
            </div>
            <button class="menu-toggle" id="menu-toggle">
                <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </button>
            <ul class="nav-links" id="nav-menu">
                <li><a href="/index.html">HOME</a></li>
                <li><a href="/about.html">ABOUT</a></li>
                <li><a href="/portfolio.html">PORTFOLIO</a></li>
                <li><a href="/team/index.html">MEMBER</a></li>
                <li><a href="/activity-log.html">LOG</a></li>
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
        const statusText = document.getElementById('log-status-text');

        if (user) {
            const name = user.displayName || "メンバー";
            createWatermark(name);
            if(statusText) statusText.innerText = "HIGH-RES MODE: " + name.toUpperCase();
            
            const userHtml = `<span style="color:#00aeef; font-weight:900;">${name} さん</span>`;
            if(authArea) authArea.innerHTML = userHtml;
            if(authMobile) authMobile.innerHTML = `<a href="/team/index.html">MY PAGE</a>`;
            if(document.getElementById('auto-gallery')) loadGithubImages(true);
        } else {
            const oldMark = document.getElementById('dynamic-watermark');
            if (oldMark) oldMark.remove();
            if(statusText) statusText.innerText = "LOW-RES MODE (LOGIN FOR CLEAR VIEW)";

            const loginBtn = `<a href="/team/login.html?code=SNN_2026" style="background:#00aeef; color:#fff; padding:5px 15px; border-radius:50px; text-decoration:none; font-size:0.8rem;">LOGIN</a>`;
            if(authArea) authArea.innerHTML = loginBtn;
            if(authMobile) authMobile.innerHTML = loginBtn;
            if(document.getElementById('auto-gallery')) loadGithubImages(false);
        }
    });

    function createWatermark(userName) {
        const oldMark = document.getElementById('dynamic-watermark');
        if (oldMark) oldMark.remove();
        const watermark = document.createElement('div');
        watermark.id = 'dynamic-watermark';
        watermark.style = "position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:99999; opacity:0.1; overflow:hidden; display:flex; flex-wrap:wrap; justify-content:space-around;";
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.innerText = userName + " 閲覧中 ";
            span.style = "font-size:12px; margin:20px; transform:rotate(-25deg); white-space:nowrap; font-weight:bold; color:#00aeef;";
            watermark.appendChild(span);
        }
        document.body.appendChild(watermark);
    }

    async function loadGithubImages(isHighRes) {
        const galleryArea = document.getElementById('auto-gallery');
        try {
            const response = await fetch(`https://api.github.com/repos/emr-snn-dev/emr-snn-dev.github.io/contents/images`);
            const files = await response.json();
            galleryArea.innerHTML = "";
            files.forEach(file => {
                if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    const item = document.createElement('div');
                    item.className = 'photo-item';
                    item.style = "position:relative; break-inside:avoid; margin-bottom:12px; border:2px solid #00aeef; border-radius:8px; overflow:hidden; background:#000;";
                    const url = file.download_url;
                    const blurVal = isHighRes ? "blur(0px)" : "blur(10px)";
                    item.innerHTML = `
                        <img src="${url}" style="width:100%; display:block; transition:0.3s; filter:${blurVal};">
                        <div style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:20; cursor:pointer;" onclick="openLightbox('${url}', ${isHighRes})"></div>
                    `;
                    galleryArea.appendChild(item);
                }
            });
        } catch (e) { console.error(e); }
    }
})();
