const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

// PC環境のみカスタムカーソルを有効化
if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        
        // 滑らかな追従
        outline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // 特定要素にホバーした時のカーソル変化
    document.querySelectorAll('.hover-zoom, a, .btn-contact').forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.width = '100px';
            outline.style.height = '100px';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.width = '40px';
            outline.style.height = '40px';
        });
    });
}

// 開発者ツール（F12）やソース表示（Ctrl+U）を牽制
document.addEventListener('keydown', e => {
    if (e.keyCode === 123 || (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 73))) {
        e.preventDefault();
    }
});

// スクロール時に要素をふわっと表示させる（Intersection Observer）
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
