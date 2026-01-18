// A11yモードの厳密制御
const a11yToggle = document.getElementById('a11y-toggle');
const a11yArea = document.getElementById('a11y-area');

a11yToggle.addEventListener('change', function() {
    if(this.checked) {
        // チェックが入った時だけスキップリンクを作成して挿入
        a11yArea.innerHTML = '<a href="#main-content" class="skip-link-active">SKIP TO CONTENT</a>';
        document.body.style.cursor = 'auto'; // カーソルを通常に戻す
        document.getElementById('cursor-outline').style.display = 'none';
        document.getElementById('cursor-dot').style.display = 'none';
    } else {
        // チェックが外れたら削除
        a11yArea.innerHTML = '';
        document.body.style.cursor = 'none';
        document.getElementById('cursor-outline').style.display = 'block';
        document.getElementById('cursor-dot').style.display = 'block';
    }
});

// カーソル追従ロジック
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 400, fill: "forwards" });
    });
}

// ふわっと出るアニメーション
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
