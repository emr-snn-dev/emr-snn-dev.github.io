// --- 1. カスタムカーソル ---
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

// --- 2. コピーガード・ショートカット禁止 ---
document.addEventListener('keydown', (e) => {
    // F12キー禁止
    if (e.keyCode === 123) e.preventDefault();
    // Ctrl+U (ソース表示) 禁止
    if (e.ctrlKey && e.keyCode === 85) e.preventDefault();
    // Ctrl+Shift+I (開発者ツール) 禁止
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    // Ctrl+S (保存) 禁止
    if (e.ctrlKey && e.keyCode === 83) e.preventDefault();
});

// 右クリックを無効化し警告を表示
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// --- 3. スクロール出現演出 ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
