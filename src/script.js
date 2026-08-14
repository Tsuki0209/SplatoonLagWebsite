document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const globalNav = document.getElementById('global-nav');
  const overlay = document.getElementById('menu-overlay');

  if (!menuButton || !globalNav || !overlay) return;

  const openMenu = () => {
    globalNav.classList.add('is-open');
    overlay.classList.add('is-open');
    globalNav.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    globalNav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    globalNav.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (globalNav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 暗くなった背景を押したら閉じる
  overlay.addEventListener('click', closeMenu);

  // メニュー内のリンクを押したら閉じる
  globalNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});