// カスタムカーソル
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 500, fill: "forwards" });
});

// コピーガード (F12, Ctrl+U, Ctrl+Shift+I)
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 73 || e.keyCode === 83)) e.preventDefault();
});

// スクロールフェードイン
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
