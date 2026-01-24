document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
        <div id="menu-btn" class="menu-btn">
            <span></span><span></span><span></span>
        </div>
        <ul id="nav-list">
            <li><a href="/index.html">TOP</a></li>
            <li><a href="/blog/index.html">BLOG</a></li>
            <li><a href="/index.html#about">ABOUT</a></li>
            <li><a href="/index.html#recruit">RECRUIT</a></li>
        </ul>
    `;
    
    const navElement = document.querySelector('nav');
    if (navElement) {
        navElement.innerHTML = navHTML;
        
        // ローディング終了後にメニューを表示させる制御
        window.addEventListener('load', () => {
            const loader = document.getElementById('loading');
            if(loader) {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => { loader.style.visibility = 'hidden'; }, 500);
                }, 1000);
            }
        });
    }
});
