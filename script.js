document.addEventListener('DOMContentLoaded', () => {
    // 1. ローディングバー制御
    const prog = document.getElementById('loader-progress');
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        prog.style.width = '100%';
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 1000);
    }, 100);

    // 2. テックモード切り替え
    const techToggle = document.getElementById('tech-toggle');
    techToggle.addEventListener('change', () => {
        document.body.classList.toggle('tech-mode', techToggle.checked);
    });

    // 3. カスタムカーソル
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    window.addEventListener('mousemove', (e) => {
        if(techToggle.checked) {
            dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            outline.animate({
                transform: `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
            }, { duration: 450, fill: "forwards" });
        }
    });

    // 4. スクロール進捗
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    // 5. 出現アニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
