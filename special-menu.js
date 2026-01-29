document.addEventListener('DOMContentLoaded', () => {
    const navHTML = `
        <nav class="special-bottom-nav">
            <div class="nav-brand">SHINONOI</div>
            <div class="nav-links">
                <a href="index.html" class="nav-item">Home</a>
                <a href="news.html" class="nav-item">News</a>
                <a href="guide.html" class="nav-item">Guide</a>
                <a href="entry.html" class="nav-item active-btn">JOIN US</a>
                <a href="portfolio.html" class="nav-item">Portfolio</a>
                <a href="about.html" class="nav-item">About</a>
                <a href="login.html" class="nav-item login-btn">LOGIN</a>
            </div>
        </nav>
    `;

    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
        
        // 下部固定用のスタイルをJSから直接注入（CSSをいじらなくて済むように）
        const style = document.createElement('style');
        style.textContent = `
            .special-bottom-nav {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 800px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 2px solid #000;
                border-radius: 100px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 25px;
                z-index: 50000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .nav-item {
                text-decoration: none;
                color: #000;
                font-weight: 900;
                font-size: 0.8rem;
                font-family: 'Orbitron', sans-serif;
                padding: 8px 12px;
                transition: 0.3s;
            }
            .active-btn {
                color: #00aeef !important;
            }
            .login-btn {
                background: #00aeef;
                color: #fff !important;
                border-radius: 50px;
                padding: 8px 20px !important;
            }
            @media (max-width: 600px) {
                .special-bottom-nav {
                    padding: 8px 15px;
                    bottom: 10px;
                }
                .nav-brand { display: none; } /* スマホではロゴを消してボタンを広く */
                .nav-links { width: 100%; display: flex; justify-content: space-around; }
                .nav-item { font-size: 0.65rem; padding: 5px; }
            }
        `;
        document.head.appendChild(style);
    }
});
