// menu.js
document.addEventListener("DOMContentLoaded", () => {

  // ====== ДАННЫЕ МЕНЮ ======
  const menuData = {
    pizzas: [
      { id: "food1", name: "Мясная", desc: "Мясная пицца, с добавлением помидоров и зелени", img: "", price: "" },
      { id: "food2", name: "Ассорти", desc: "Ассорти", img: "", price: "" },
      { id: "food3", name: "Куриная", desc: "Куриная пицца с помидорами, сыром и зеленью.", img: "", price: "" },
      { id: "food4", name: "Куриная с грибами", desc: "Куриная пицца с грибами.", img: "", price: "" },
      { id: "food5", name: "Цезарь с курицей", desc: "Пицца цезарь с салатом, майонезом и курицей.", img: "", price: "" },
      { id: "food6", name: "Жульетта", desc: "Если бы я знал что это", img: "", price: "" },
      { id: "food7", name: "Сырная", desc: "Сырная пицца с сыром, с добавлением сыра и посыпанной сыром", img: "", price: "" },
      { id: "food8", name: "Чили (острая)", desc: "Ваш язык сгорит (а может и нет)", img: "", price: "" },
      { id: "food9", name: "Колбасная", desc: "Пицца с кусочками колбасы.", img: "", price: "" },
      { id: "food10", name: "Пиде с курицей", desc: "Куриная пицца с помидорами, сыром и зеленью, пиде.", img: "", price: "" },
      { id: "food11", name: "Пиде с мясом", desc: "Мясная пицца с помидорами, сыром и зеленью, пиде.", img: "", price: "" },
    ],

    firstFoods: [
      { id: "food13", name: "Чечевичный суп", desc: "Суп с чечевицей в качестве основного ингредиента. Полезный, вкусный и питательный.", img: "", price: "250₽" },
      { id: "food14", name: "Нохчи суп", desc: "Картошка, мясо, зелень и бомбезный бульон.", img: "", price: "380₽" },
      { id: "food15", name: "Лагман", desc: "🍜🍜🍜", img: "", price: "350₽" },
    ],

    secondFoods: [
      { id: "food16", name: "Гуляш", desc: "Я забыл что это", img: "", price: "350₽" },
      { id: "food17", name: "Жульен", desc: "Брат Жульетты", img: "", price: "400₽" },
      { id: "food18", name: "Жаркое", desc: "Горячо", img: "", price: "400₽" },
      { id: "food19", name: "Бурито", desc: "Наша недавняя новинка, хит продаж", img: "", price: "400₽" },
      { id: "food20", name: "Куриный стейк", desc: "Вкуснейший куриный стейк с рисом и салатом.", img: "", price: "450₽" },
      { id: "food21", name: "Мясной стейк", desc: "Вкуснейший мясной стейк с рисом и салатом.", img: "", price: "650₽" },
      { id: "food22", name: "Рыба хек (шайбы)", desc: "Я не знаю чо эт", img: "", price: "370₽" },
      { id: "food23", name: "Мясо по-тайски", desc: "👲👲👲👲", img: "", price: "350₽" },
      { id: "food24", name: "Печень с гарниром", desc: "Гарнир в комплекте", img: "", price: "350₽" },
      { id: "food25", name: "Ахьар топ", desc: "Просто топ💪💪", img: "", price: "350₽" },
    ],

    garniri: [
      { id: "food26", name: "Картошка Фри / деревенская", desc: "Картошка фри или Деревенская. Хорошие закуски", img: "", price: "250₽" },
      { id: "food27", name: "Наггетсы (10шт.)", desc: "Наггетсы что восхитят вас своим вкусом. В одной порции 10шт.", img: "", price: "200₽" },
      { id: "food28", name: "Крылышки острые 4шт. + соус", desc: "Просто топ💪💪", img: "", price: "300₽" },
      { id: "food29", name: "Рис", desc: "Вкусный рис", img: "", price: "120₽" },
      { id: "food30", name: "Соус чесночный", desc: "Вкусный чесночный соус", img: "", price: "50/80₽" },
      { id: "food31", name: "Соус сырный / томатный", desc: "Соусы сырные и томатные", img: "", price: "50₽" },
    ],

    salads: [
      { id: "food32", name: "Свежий", desc: "Салат свежий", img: "", price: "250₽" },
      { id: "food33", name: "Цезарь", desc: "Салат цезарь (не путать с пиццей)", img: "", price: "250₽" },
      { id: "food34", name: "Греческий", desc: "Ждем римский", img: "", price: "250₽" },
    ],

    juices: [
      { id: "food35", name: "Мохито классический", desc: "Популярный среди клиентов", img: "", price: "250/350₽" },
      { id: "food36", name: "Мохито клубничный", desc: "Очень вкусный и освежающий", img: "", price: "250/350₽" },
      { id: "food37", name: "Мохито ягодный", desc: "Супер ягодный и синий", img: "", price: "250/350₽" },
    ],

    milkshakes: [
      { id: "food38", name: "Банановый коктейль", desc: "Бананчики..", img: "", price: "300₽" },
      { id: "food39", name: "Ванильный коктейль", desc: "Молочный ванильный коктейль, сладкий.", img: "", price: "300₽" },
      { id: "food40", name: "Клубничный коктейль", desc: "Освежающий клубничный коктейль", img: "", price: "300₽" },
      { id: "food41", name: "Шоколадный коктейль", desc: "Самый вкусный", img: "", price: "300₽" },
    ],

    tea: [
      { id: "food42", name: "Улыбка Гейши", desc: "Улыбается значит вкусная", img: "", price: "300₽" },
      { id: "food43", name: "Дикая Вишня", desc: "Вишневый (?) чай", img: "", price: "300₽" },
      { id: "food44", name: "Таежный сбор", desc: "Скидываемся по", img: "", price: "300₽" },
      { id: "food45", name: "Брызги шампанского", desc: "", img: "", price: "300₽" },
      { id: "food46", name: "Нахальный Фрукт", desc: "", img: "", price: "300₽" },
      { id: "food47", name: "Зеленый чай с жасмином", desc: "", img: "", price: "300₽" },
      { id: "food48", name: "Чай Эпл Грей (бергамот)", desc: "", img: "", price: "300₽" },
      { id: "food49", name: "Чай Лев", desc: "", img: "", price: "300₽" },
      { id: "food50", name: "Черный чай", desc: "", img: "", price: "300₽" },
      { id: "food51", name: "Черный с Чарбецом", desc: "", img: "", price: "300₽" },
      { id: "food52", name: "Черный Персик-айва", desc: "", img: "", price: "300₽" },
    ],

    napitki: [
      { id: "food53", name: "Black Tea персиковый / ягодный / зеленый", desc: "", img: "", price: "70₽" },
      { id: "food54", name: "Мохито", desc: "", img: "", price: "60₽" },
      { id: "food55", name: "Coca-cola / Pepsi", desc: "", img: "", price: "80₽" },
      { id: "food56", name: "Кинза кола", desc: "", img: "", price: "70₽" },
    ],
  };

  // ====== ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ ======
// ====== ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ ======
function createCard(item, category) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = item.id;
  card.dataset.category = category;

  // Проверяем: если блюдо из пицц или chooseable = true — добавляем выбор размера
  const isChooseable = category === "pizzas" || item.chooseable;
  let size = "medium";
  let price = isChooseable ? 450 : parseInt(item.price) || 0;

  card.innerHTML = `
    <img src="${item.img || '/img/d.jpg'}" alt="">
    <div class="card-content">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>

      ${
        isChooseable
          ? `
            <div class="size-selector">
              <input type="radio" id="size-medium-${item.id}" name="size-${item.id}" value="medium" class="size-medium" checked>
              <label for="size-medium-${item.id}">Средняя</label>

              <input type="radio" id="size-large-${item.id}" name="size-${item.id}" value="large" class="size-large">
              <label for="size-large-${item.id}">Большая</label>

              <div class="size-selector__indicator"></div>
            </div>
          `
          : ""

      }

      <h4 class="price">${price}₽</h4>
      <button class="add-to-cart">Добавить</button>
    </div>
  `;

  // Подставляем запасное изображение при ошибке загрузки
  card.querySelector("img").addEventListener("error", e => {
    e.target.src = "/img/d.jpg";
  });

  // === Радиокнопки: смена размера ===
  if (isChooseable) {
    const radios = card.querySelectorAll(`input[name="size-${item.id}"]`);
    const priceEl = card.querySelector(".price");

    radios.forEach(radio => {
      radio.addEventListener("change", e => {
        size = e.target.value;
        price = size === "large" ? 550 : 450;
        priceEl.textContent = `${price}₽`;
        card.dataset.size = size;
        card.dataset.price = price;
      });
    });
  }

  // === Кнопка "Добавить" ===
  const addBtn = card.querySelector(".add-to-cart");
  addBtn.addEventListener("click", () => {
    const chosenSize = card.dataset.size || size;
    const chosenPrice = card.dataset.price || price;

    const product = {
      id: `${item.id}-${chosenSize}`, // уникальный ID для размера
      name: `${item.name} ${isChooseable ? `(${chosenSize === "large" ? "Большая" : "Средняя"})` : ""}`,
      price: chosenPrice,
      category: category,
      size: chosenSize,
      img: item.img || "/img/d.jpg",
    };

    console.log("Добавлено в корзину:", product);
    // позже можно вызвать addToCart(product);
  });

  return card;
}

// ====== РЕНДЕР ВСЕГО МЕНЮ ======
function renderMenu() {
  Object.entries(menuData).forEach(([category, items]) => {
    const container = document.querySelector(`#${category}-container`);
    if (!container) return;
    items.forEach(item => container.appendChild(createCard(item, category)));
  });
}

renderMenu();

});
