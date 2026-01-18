document.addEventListener('DOMContentLoaded', () => {
    const a11yToggle = document.getElementById('a11y-toggle');
    const a11yArea = document.getElementById('a11y-area');
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');

    function updateMode() {
        if(a11yToggle.checked) {
            // 【アシストモード ON】
            document.body.classList.add('assist-mode');
            a11yArea.innerHTML = '<a href="#main-content" class="skip-link-active">SKIP TO CONTENT</a>';
        } else {
            // 【スタンダードモード ON】
            document.body.classList.remove('assist-mode');
            a11yArea.innerHTML = '';
        }
    }

    a11yToggle.addEventListener('change', updateMode);

    // テックカーソル追従（Standard時のみ動くようCSSで制御されているが念のため）
    if (window.matchMedia("(hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            if(!a11yToggle.checked) {
                dot.style.left = `${e.clientX}px`;
                dot.style.top = `${e.clientY}px`;
                outline.animate({
                    left: `${e.clientX}px`,
                    top: `${e.clientY}px`
                }, { duration: 400, fill: "forwards" });
            }
        });
    }

    // フェードイン演出
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
