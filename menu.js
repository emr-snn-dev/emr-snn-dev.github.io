document.addEventListener('DOMContentLoaded', function() {
    // 1. 共通メニューの挿入
    const navHTML = `
        <ul id="nav-list">
            <li><a href="/index.html">トップ</a></li>
            <li><a href="/blog/index.html">ブログ</a></li>
            <li><a href="/portfolio/index.html">実績</a></li>
            <li><a href="/index.html#about">案内</a></li>
            <li><a href="/index.html#recruit">募集</a></li>
        </ul>
    `;
    const nav = document.querySelector('nav');
    if (nav) nav.innerHTML = navHTML;

    // 2. 上に戻るボタンの生成
    const topBtn = document.createElement('a');
    topBtn.id = 'page-top';
    topBtn.innerHTML = '▲';
    document.body.appendChild(topBtn);

    // スクロール時の表示・非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    // スムーススクロール
    topBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. ローディング画面の解除
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.visibility = 'hidden'; }, 500);
            }, 800);
        }
    });
});
