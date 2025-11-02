// menu-order.js
// Поведение:
// 1) addToCart сохраняет позицию в localStorage (id уникален, уже должен учитывать размер: например "food1-medium")
// 2) краткая визуальная отдача на кнопке (100ms) и плавающий индикатор внизу экрана

(function () {
  // --- Утилиты ---
  function safeParsePrice(v) {
    // из "450₽" или "450" -> число 450
    if (v == null) return 0;
    if (typeof v === 'number') return v;
    const n = String(v).replace(/\s/g, '').replace(/[^\d\.,-]/g, '').replace(',', '.');
    const parsed = parseFloat(n);
    return isNaN(parsed) ? 0 : parsed;
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  }
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // --- Добавить товар в корзину (увеличить quantity если уже есть) ---
  function addToCart(product) {
    if (!product || !product.id) return;

    const cart = getCart();
    const idx = cart.findIndex(p => p.id === product.id);

    if (idx > -1) {
      cart[idx].quantity = (cart[idx].quantity || 1) + 1;
    } else {
      // Нормализуем
      const normalized = {
        id: String(product.id),
        name: String(product.name || ''),
        price: Number(safeParsePrice(product.price || product.priceRaw || 0)),
        imgSrc: product.img || product.imgSrc || '',
        quantity: product.quantity || 1,
        size: product.size || null,
        category: product.category || null,
      };
      cart.push(normalized);
    }

    setCart(cart);

    // Если у тебя есть глобальная функция updateButton — вызовем её (совместимость)
    try {
      if (typeof updateButton === 'function') updateButton(product.id, true);
    } catch (e) {
      // silent
    }
  }

  // --- Быстрая визуальная отдача кнопке (нажатие -> через 100ms убираем класс) ---
  function flashButton(btn) {
    if (!btn) return;
    btn.classList.add('just-clicked');

    // Убираем :active/hover-like состояние через 100ms
    setTimeout(() => {
      btn.classList.remove('just-clicked');
    }, 100);
  }

  // --- Индикатор внизу экрана: grey dot -> green outline with check ---
  // Складывал анимации простыми таймерами и CSS; создаёт DOM элемент и сам очищает.
  function showFloatingIndicator() {
    // Если уже отображается — сбросим и покажем заново
    const existing = document.querySelector('.mo_cart_indicator');
    if (existing) {
      existing.remove();
    }

    // Inject CSS once
    if (!document.getElementById('mo-cart-indicator-styles')) {
      const ss = document.createElement('style');
      ss.id = 'mo-cart-indicator-styles';
      ss.innerHTML = `
/* wrapper */
.mo_cart_indicator {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px; /* примерно 100px от низа экрана */
  z-index: 99999;
  pointer-events: none;
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
}

/* dark dot */
.mo_cart_dot {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: #2f2f2f;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  transform: scale(0.9);
  transition: transform 180ms ease;
  opacity: 0;
  animation: mo_dot_in 160ms forwards;
}

/* after a moment, draw green circle outline (SVG stroke) */
.mo_cart_svg {
  position: absolute;
  width: 56px;
  height: 56px;
  opacity: 0;
  transform: scale(0.95);
}

/* stroke animation for outline circle */
.mo_cart_circle {
  fill: none;
  stroke: #3cbc4a;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  transition: stroke-dashoffset 420ms cubic-bezier(.2,.9,.2,1);
}

/* check path initial */
.mo_cart_check {
  fill: none;
  stroke: #3cbc4a;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  transition: stroke-dashoffset 260ms linear 220ms;
  opacity: 0;
}

/* keyframes */
@keyframes mo_dot_in {
  0% { opacity: 0; transform: translateY(8px) scale(0.7) }
  100% { opacity: 1; transform: translateY(0) scale(1) }
}
      `;
      document.head.appendChild(ss);
    }

    // build element
    const wrap = document.createElement('div');
    wrap.className = 'mo_cart_indicator';

    const dot = document.createElement('div');
    dot.className = 'mo_cart_dot';
    wrap.appendChild(dot);

    // svg for outline + check
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.classList.add('mo_cart_svg');

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '32');
    circle.setAttribute('cy', '32');
    circle.setAttribute('r', '22');
    circle.classList.add('mo_cart_circle');
    svg.appendChild(circle);

    const check = document.createElementNS(svgNS, 'path');
    check.setAttribute('d', 'M22 34 L29 41 L42 27'); // простая галочка
    check.classList.add('mo_cart_check');
    svg.appendChild(check);

    wrap.appendChild(svg);
    document.body.appendChild(wrap);

    // sequence: show dot -> after delay animate stroke dashoffset to 0 -> show check -> hide
    // reveal svg after a short delay
    requestAnimationFrame(() => {
      // make svg visible after 140ms
      setTimeout(() => {
        svg.style.opacity = '1';
        // animate circle stroke (dashoffset -> 0)
        circle.style.strokeDashoffset = '0';
        // reveal check after small delay
        check.style.opacity = '1';
        check.style.strokeDashoffset = '0';
      }, 180);
    });

    // hide whole indicator after 1300ms
    setTimeout(() => {
      wrap.style.transition = 'opacity 220ms ease, transform 220ms ease';
      wrap.style.opacity = '0';
      wrap.style.transform = 'translateY(12px) scale(0.98)';
      setTimeout(() => wrap.remove(), 300);
    }, 1400);
  }

  // --- UI: обработчик клика по .add-to-cart для карточек, если карточки генерятся динамически ---
  function attachHandlers(root = document) {
    // Используем делегирование — новый код будет работать при динамическом создании карточек
    root.addEventListener('click', function (ev) {
      const btn = ev.target.closest && ev.target.closest('.add-to-cart');
      if (!btn) return;

      // Предотвратить двойные срабатывания
      ev.preventDefault();

      // Находим карточку-родителя (карточки у тебя имеют .card)
      const card = btn.closest('.card');
      if (!card) {
        // если нет структуры - просто flash и indicator
        flashButton(btn);
        showFloatingIndicator();
        return;
      }

      // Сформируем продукт — постарайся, чтобы createCard (menu.js) наполнял dataset если нужны поля.
      // Будем пытаться взять поля из DOM или из card.dataset
      const productId = card.dataset.id || card.getAttribute('data-id') || card.getAttribute('id') || null;

      // Для размеров: menu.js ставит card.dataset.size и dataset.price при выборе размера
      const chosenSize = card.dataset.size || (() => {
        const checked = card.querySelector('input[type="radio"]:checked');
        return checked ? checked.value : (card.querySelector('.size-select') ? card.querySelector('.size-select').value : null);
      })();

      const priceFromDataset = card.dataset.price;
      // либо парсим текст внутри .price
      const priceTextEl = card.querySelector('.price');
      const priceText = priceFromDataset || (priceTextEl ? priceTextEl.textContent : '');
      const price = safeParsePrice(priceText);

      const nameEl = card.querySelector('h3');
      // переводим размер на русский язык
      function translateSize(size) {
      if (!size) return '';
      switch (size.toLowerCase()) {
          case 'small': return 'маленькая';
          case 'medium': return 'средняя';
          case 'large': return 'большая';
          default: return size; // если что-то другое — просто оставляем
      }
      }
  
      const readableSize = translateSize(chosenSize);
      const name = (nameEl ? nameEl.textContent.trim() : (card.dataset.name || productId)) + (readableSize ? ` ${readableSize}` : '');

      const img = (card.querySelector('img') && card.querySelector('img').src) || (card.dataset.img || '');

      // build unique id including size (если уже включён — не дублируем)
      const id = (productId ? String(productId) : name).toString() + (chosenSize ? `-${chosenSize}` : '');

      const product = {
        id,
        name,
        price,
        img,
        size: chosenSize || null,
        // category: card.dataset.category || null
      };

      // действие: добавить в localStorage
      addToCart(product);

      // визуальный отклик кнопки
      flashButton(btn);

      // показ индикатора
      showFloatingIndicator();
    });
  }

  // Запускаем
  document.addEventListener('DOMContentLoaded', () => {
    attachHandlers(document);
  });

  // Экспорт небольшого API на случай, если захочешь вызывать из других модулей
  window.__MO_MENU_ORDER = {
    addToCart,
    getCart,
    setCart,
    showFloatingIndicator,
  };
})();
