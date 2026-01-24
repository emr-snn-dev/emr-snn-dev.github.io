// カーソル制御
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ホバー時拡大
document.querySelectorAll('a, button, .menu-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// ボタンを押した時のメッセージ表示
function showClosedMessage() {
    const note = document.getElementById('notification');
    note.innerText = "ただいま募集しておりません。4月の開始をお待ちください。";
    note.classList.add('show');
    
    // 3秒後に隠す
    setTimeout(() => {
        note.classList.remove('show');
    }, 3000);
}

// スクロール時のフェードイン
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(s => observer.observe(s));
