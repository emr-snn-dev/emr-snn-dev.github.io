const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

// メニュー開閉
menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// 項目クリックで閉じる
document.querySelectorAll('#nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});
