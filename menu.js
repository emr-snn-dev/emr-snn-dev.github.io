/**
 * STC RACING - Navigation & Protection System
 * Managed by Technical High School Students
 */

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. スクロール時のメニュー演出
    // 100px以上スクロールすると、メニューを透過させ、高さを詰める
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = "5px 0";
            nav.style.backgroundColor = "rgba(26, 26, 26, 0.95)";
            nav.style.backdropFilter = "blur(10px)"; // 背景をぼかすテック演出
        } else {
            nav.style.padding = "0";
            nav.style.backgroundColor = "var(--dark-bg)";
            nav.style.backdropFilter = "none";
        }
    });

    // 2. カレントページ（現在位置）の自動判定
    // 表示中のURLとリンク先が一致する場合、赤色で強調する
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // ルート（index.html）や各ページの判定
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.style.color = "var(--honda-red)";
            link.style.pointerEvents = "none"; // 現在のページへのクリックを無効化
        }
    });

    // 3. 追加のコピーガード機能（ドラッグ開始の禁止）
    // ページ全体のドラッグによるテキスト選択をシステム的に遮断する
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    }, false);

    // 4. 画像のコンテキストメニュー禁止（個別対応）
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
});
