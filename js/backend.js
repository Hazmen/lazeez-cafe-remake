// Таймер ктрый обнуляется каждые 24 часа (с каждым рабочим днем)

function incrementOrderCounter() {
  const today = new Date().toISOString().split('T')[0]; // "2025-10-20"
  let counterData = JSON.parse(localStorage.getItem('orderCounter')) || { date: today, count: 0 };

  if (counterData.date !== today) {
    counterData.date = today;
    counterData.count = 0;
  }

  counterData.count++;
  localStorage.setItem('orderCounter', JSON.stringify(counterData));

  return counterData.count;
}

// Сбор информации о клиенте

function collectOrderData() {
  const orderType = document.querySelector('input[name="order-way"]:checked')?.value || 'delivery';

  // В зависимости от типа заказа выбираем нужные поля
  const name = document.querySelector(`#name-and-surname${orderType === 'pickup' ? '2' : ''}`)?.value ||
               document.querySelector(`#name-and-surname${orderType === 'pickup' ? '4' : '3'}`)?.value;

  const phone = document.querySelector(`#clients-phone${orderType === 'pickup' ? '2' : ''}`)?.value ||
                document.querySelector(`#clients-phone${orderType === 'pickup' ? '4' : '3'}`)?.value;

  const address = orderType === 'delivery'
    ? (document.querySelector('.main-address')?.value || document.querySelector('.location-input')?.value)
    : 'Самовывоз';

  const comment = document.querySelector('#address-comment')?.value ||
                  document.querySelector('#address-comment3')?.value || '';

  const orderComment = orderType === 'delivery' ? (document.querySelector(`#order-comment${orderType === 'pickup' ? '2' : ''}`)?.value) 
              :  document.querySelector(`#order-comment${orderType === 'pickup' ? '4' : '3'}`)?.value;

  return { orderType, name, phone, address, comment, orderComment };
}

// Сбор выбранных блюд и информации о ней.

function collectCartData() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.map(item => ({
    name: item.name,
    quantity: item.quantity || 1,
    price: item.price,
    total: item.price * (item.quantity || 1)
  }));
}

// Чек или заказ я незн но это присылает тг бот

function buildOrderMessage() {
  const info = collectOrderData();
  const cart = collectCartData();
  const orderNumber = incrementOrderCounter();

  const cartText = cart.map(item =>
    `<b>${item.name}</b> — ${item.quantity} шт. = <i>${item.total}₽</i>`
  ).join('\n\n');

  const totalSum = cart.reduce((sum, i) => sum + i.total, 0);

  return `
🧾 <b>Новый заказ!</b>

  ---------------------------------

   <b>Номер заказа:</b> ${orderNumber} 

    <i>Тип:</i> ${info.orderType === 'delivery' ? '🚚 Доставка' : '🏃 Самовывоз'}

    ----------- Информация о клиенте -----------

    <i>Имя:</i> ${info.name}

    <i>Телефон:</i> ${info.phone}
    
    <i>Адрес:</i> ${info.address}

    ----------- Комментарии -----------

    <i>Комментарий:</i> ${info.comment || '—'}

    <i>Комментарий к блюду:</i> ${info.orderComment || '—'}

    ----------- Блюда -----------

${cartText}

    ----------- Сумма -----------

    💰 <b>Итого:</b> ${totalSum} ₽
    `;
}

async function TelegramBotSend(){
  const info = collectOrderData();
  const cart = collectCartData();

  if (!info.name?.trim() || !info.phone?.trim() || (info.orderType === 'delivery' && !info.address?.trim())) {
    alert("Пожалуйста, заполните все обязательные поля: имя, телефон и адрес (для доставки).");
    return; // выходим из функции — дальше ничего не выполняется
  }

  if (cart.length === 0) {
    alert("Корзина пуста. Видимо, картинка была недостаточно убедительной.");
    return;
  }

  const message = buildOrderMessage();

  const token = "7979191203:AAFkNA_SsGHutonnde5cYyGWwG4v7_7jLwo";
  const chatId = "6781641776";

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
    })
  });

  if (response.ok) {
    alert("✅ Заказ отправлен!");
  } else {
    alert("❌ Ошибка при отправке заказа!");
  }
}


function SaveOnComputer(){
  
}