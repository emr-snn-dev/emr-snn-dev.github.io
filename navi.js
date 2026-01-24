document.addEventListener('DOMContentLoaded', function() {
    // ユーザー名.github.io の形式なのでルートから指定します
    const navHTML = `
        <div id="menu-btn" class="menu-btn">
            <span></span><span></span><span></span>
        </div>
        <ul id="nav-list">
            <li><a href="/index.html">トップ</a></li>
            <li><a href="/blog/index.html">ブログ</a></li>
            <li><a href="/index.html#info">活動案内</a></li>
            <li><a href="/index.html#recruit">募集</a></li>
        </ul>
    `;
    
    const navElement = document.querySelector('nav');
    if (navElement) {
        navElement.innerHTML = navHTML;
        
        // ハンバーガーメニューの開閉制御
        const menuBtn = document.getElementById('menu-btn');
        const navList = document.getElementById('nav-list');
        
        if (menuBtn && navList) {
            menuBtn.addEventListener('click', () => {
                navList.classList.toggle('active');
            });

            // メニューリンクをクリックしたら閉じる
            document.querySelectorAll('#nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('active');
                });
            });
        }
    }
});
