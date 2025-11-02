document.addEventListener('DOMContentLoaded', () => {
  // === БУРГЕР-МЕНЮ ===
  const button = document.querySelector('.burger-menu');
  const burgerMenu = document.querySelector('.burger-menu');

  if (burgerMenu) {
    burgerMenu.addEventListener('click', function() {
      // Анимация кнопки
      this.classList.add('clicked');
      setTimeout(() => this.classList.remove('clicked'), 200);
      console.log('Burger menu pressed!');
    });
  }

  if (button) {
    button.addEventListener('click', function() {
      console.log('pressed!');
    });
  }

  // === АККОРДЕОНЫ ===
  const accordions = document.querySelectorAll('.list-menu');
  accordions.forEach(acc => {
    const header = acc.querySelector('.list-header');
    const content = acc.querySelector('.list-body');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

        // Закрываем все
        accordions.forEach(a => {
          const c = a.querySelector('.list-body');
          const h = a.querySelector('.list-header');
          if (c && h) {
            c.style.maxHeight = null;
            c.classList.remove('open');
            h.classList.remove('active');
          }
        });

        // Открываем выбранный
        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.classList.add('open');
          header.classList.add('active');
        }
      });
    }
  });

  // === КАРУСЕЛЬ ===
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
  const cards = document.querySelectorAll('.carousel .card');
  let activeIndex = 0;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === activeIndex);
    });
  }

  if (leftBtn && rightBtn && cards.length) {
    leftBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });

    rightBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateCarousel();
    });

    updateCarousel();
  }

  // === АНИМАЦИЯ ТЕКСТА ===
  const spans = Array.from(document.querySelectorAll('#meet > span'));
  if (spans.length) {
    const stepSeconds = 0.08;
    let order = 0;

    spans.forEach(el => {
      if (el.id === 'lSPACE') return;
      el.classList.add('drop-letter');
      el.style.animationDelay = `${(order * stepSeconds).toFixed(2)}s`;
      order++;
    });
  }
});
