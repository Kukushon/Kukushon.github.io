function calculateCost() {
      const quantityInput = document.getElementById("quantity");
      const quantity = document.getElementById("quantity").value;
      const productPrice = document.getElementById("product").value;

      // Проверка ввода: 
      if (isNaN(quantity) || quantity <= 0) {
        quantityInput.classList.add("error");
        document.getElementById("cost").innerHTML = "";
        document.getElementById("error").innerHTML = "Пожалуйста, введите целое положительное число для количества!";
        return;
      }
      else {
        quantityInput.classList.remove("error");
      }

      const cost = quantity * productPrice;
      document.getElementById("cost").innerHTML = "Стоимость заказа: " + cost + " руб.";
      document.getElementById("error").innerHTML = ""; // Очищаем сообщение об ошибке
    }
    window.addEventListener('DOMContentLoaded', function (event) {
      console.log("DOM fully loaded and parsed");
      let b = document.getElementById("button");
      b.addEventListener("click", calculateCost);
    });
