// カスタムカーソルの動き
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // 遅れて動くアウトライン
    setTimeout(() => {
        outline.style.left = `${posX}px`;
        outline.style.top = `${posY}px`;
    }, 50);
});

// リンクにホバーした時にカーソルを大きくする
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.backgroundColor = 'rgba(204, 0, 0, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.backgroundColor = 'transparent';
    });
});

// スクロール時のフェードイン（Reveal効果）
const revealEntries = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealEntries.forEach(section => {
    observer.observe(section);
});
