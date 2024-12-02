document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.getElementById("quantity"); // Ввод количества
  const productSelect = document.getElementById("product"); // Селектор продукта
  const serviceTypeRadios = document.querySelectorAll('input[name="servicetype"]'); // Радио кнопки для типа услуги
  const productOptions = document.getElementById("productOptions"); // Блок опций продукта
  const colorSelect = document.getElementById("color"); // Селектор цвета
  const packageCheckbox = document.getElementById("package"); // Чекбокс упаковки
  const costElement = document.getElementById("cost"); // Элемент для отображения стоимости
  const errorElement = document.getElementById("error"); // Элемент для отображения ошибок

  // Данные о продукте: цена, доступные опции и информация об упаковке
  const productData = {
      1: {
          price: 300,
          options: [],
          showPackage: false
      },
      2: {
          price: 1500,
          options: ['белый', 'розовый', 'голубой'],
          showPackage: true
      },
      3: {
          price: 700,
          options: [],
          showPackage: true 
      },
      4: {
          price: 350,
          options: ['белый', 'розовый', 'голубой'],
          showPackage: false 
      }
  };

  // Коэффициенты для каждого цвета
  const colorKoef = {
      'белый': 1, 
      'розовый': 1.2,
      'голубой': 1.3
  };

  // Функция для расчета стоимости заказа
  function calculatePrice() {
      const quantity = parseInt(quantityInput.value); // Количество
      const productNumber = parseInt(productSelect.value); // Выбранный продукт
      const servicePrice = parseInt(document.querySelector('input[name="servicetype"]:checked').value); // Цена услуги
      const selectedOption = colorSelect.value ? colorSelect.value : null; // Выбранная опция (цвет)
      const packagePrice = packageCheckbox.checked ? 250 : 0; // Цена упаковки, если чекбокс выбран

      // Проверка на корректность введенного количества
      if (isNaN(quantity) || quantity <= 0 || quantity % 1 !== 0) {
          quantityInput.classList.add("error");
          errorElement.textContent = "Введите целое положительное число!";
          costElement.textContent = ""; // Если ошибка, не показываем цену
          return;
      } else {
          quantityInput.classList.remove("error");
          errorElement.textContent = "";
      }

      let price = productData[productNumber].price; // Начальная цена продукта
      price *= quantity; // Умножаем цену на количество

      if (selectedOption) { // Если выбран цвет, применяем соответствующий коэффициент
          price *= colorKoef[selectedOption];
      }

      price += servicePrice; // Добавляем стоимость услуги
      price += packagePrice; // Добавляем стоимость упаковки (если есть)

      costElement.textContent = "Стоимость заказа: " + price + " руб."; // Выводим итоговую цену
  }

  // Функция для обновления формы при изменении выбранного продукта
  function updateForm(productNumber) {
      const product = productData[productNumber]; // Получаем данные о выбранном продукте
      colorSelect.innerHTML = ''; // Очищаем список цветов

      // Добавляем опции цвета, если они есть
      product.options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.text = option;
          colorSelect.appendChild(optionElement);
      });

      // Отображаем или скрываем чекбокс упаковки в зависимости от данных о продукте
      if (product.showPackage) {
          packageCheckbox.parentElement.style.display = 'block';
      } else {
          packageCheckbox.parentElement.style.display = 'none';
      }

      // Отображаем или скрываем блок опций в зависимости от наличия опций
      if (product.options.length > 0) {
          productOptions.style.display = 'block';
      } else {
          productOptions.style.display = 'none';
      }

      calculatePrice(); // Пересчитываем стоимость после обновления формы
  }

  // Добавление обработчиков событий
  quantityInput.addEventListener("input", calculatePrice); // При изменении количества пересчитываем цену
  productSelect.addEventListener("change", () => updateForm(parseInt(productSelect.value))); // При изменении продукта обновляем форму
  serviceTypeRadios.forEach(radio => radio.addEventListener("change", calculatePrice)); // При изменении типа услуги пересчитываем цену
  colorSelect.addEventListener("change", calculatePrice); // При изменении цвета пересчитываем цену
  packageCheckbox.addEventListener("change", calculatePrice); // При изменении упаковки пересчитываем цену

  // Инициализация формы с данными по выбранному продукту
  updateForm(parseInt(productSelect.value));
})
