// カスタムカーソルの追従設定
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // ドットは瞬時に移動
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // アウトラインは少し遅れて滑らかに移動（アニメーション）
    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" });
});

// ホバー時にカーソルを変化させる
const interactiveElements = document.querySelectorAll('a, .grid-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.width = '60px';
        outline.style.height = '60px';
        outline.style.backgroundColor = 'rgba(204, 0, 0, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.width = '35px';
        outline.style.height = '35px';
        outline.style.backgroundColor = 'transparent';
    });
});

// スクロールに合わせて要素を浮き上がらせる (Intersection Observer API)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});
