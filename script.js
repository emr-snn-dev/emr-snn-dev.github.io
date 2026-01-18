// A11yモード切り替え
const a11yToggle = document.getElementById('a11y-toggle');
a11yToggle.addEventListener('change', function() {
    if(this.checked) {
        document.body.classList.add('a11y-active');
    } else {
        document.body.classList.remove('a11y-active');
    }
});

// カーソル演出
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 400, fill: "forwards" });
    });
    document.querySelectorAll('.hover-zoom, a').forEach(el => {
        el.addEventListener('mouseenter', () => { outline.style.width = '80px'; outline.style.height = '80px'; });
        el.addEventListener('mouseleave', () => { outline.style.width = '40px'; outline.style.height = '40px'; });
    });
}

// 露出アニメーション
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
