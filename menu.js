document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const links = document.querySelectorAll('.nav-link');

    // スクロール時にメニューを変化
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            nav.style.backgroundColor = "rgba(26, 26, 26, 0.95)";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
        } else {
            nav.style.backgroundColor = "var(--dark-bg)";
            nav.style.boxShadow = "none";
        }
    });

    // カレント表示
    links.forEach(link => {
        if (window.location.pathname.endsWith(link.getAttribute('href'))) {
            link.style.color = "var(--honda-red)";
        }
    });

    // ドラッグ禁止の補強
    document.addEventListener('dragstart', (e) => e.preventDefault());
});
