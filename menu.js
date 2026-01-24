const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.querySelectorAll('#nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});
