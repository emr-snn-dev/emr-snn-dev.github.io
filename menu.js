document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    
    // スクロール時の背景透過処理
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.backgroundColor = "rgba(10, 10, 10, 0.98)";
        } else {
            nav.style.backgroundColor = "var(--dark-bg)";
        }
    });

    // 右クリックと画像ドラッグを禁止してブランドを保護
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
});
