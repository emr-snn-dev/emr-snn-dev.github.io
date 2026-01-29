document.addEventListener('DOMContentLoaded', () => {
    const navHTML = `
        <nav class="status-bar-nav">
            <div class="status-inner">
                <a href="index.html">HOME</a>
                <a href="news.html">NEWS</a>
                <a href="guide.html">GUIDE</a>
                <a href="portfolio.html" class="current">PORT</a>
                <a href="entry.html" class="join-link">JOIN</a>
                <a href="about.html">ABOUT</a>
            </div>
        </nav>
    `;

    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
        
        const style = document.createElement('style');
        style.textContent = `
            .status-bar-nav {
                position: fixed;
                bottom: 20px; /* 下から浮かせて誤操作防止 */
                left: 0;
                width: 100%;
                z-index: 999999;
                display: flex;
                justify-content: center;
                pointer-events: none; /* バー以外を触れるように */
            }

            .status-inner {
                pointer-events: auto; /* ここだけ反応させる */
                width: 95%;
                max-width: 600px;
                height: 60px; /* スマホで押しやすい高さ */
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                border: 1px solid #00aeef;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding: 0 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            .status-inner a {
                text-decoration: none;
                color: #fff;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.75rem;
                font-weight: 900;
                letter-spacing: 1px;
                
                /* 押しやすくするための設定 */
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                height: 100%; /* バーの高さ全域をボタンにする */
                transition: 0.2s;
                -webkit-tap-highlight-color: transparent; /* スマホの青い枠を消す */
            }

            /* 押した時の反応 */
            .status-inner a:active {
                background: rgba(0, 174, 239, 0.2);
                transform: scale(0.95);
            }

            .status-inner a.current {
                color: #00aeef;
                border-bottom: 2px solid #00aeef;
            }

            .join-link {
                color: #00aeef !important;
            }

            @media (max-width: 480px) {
                .status-inner {
                    height: 50px;
                    width: 98%;
                }
                .status-inner a {
                    font-size: 0.65rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
