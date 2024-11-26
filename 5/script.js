function calculateCost() { 
    const quantityInput = document.getElementById("quantity"); 
    const quantity = parseFloat(quantityInput.value); 
    const productPrice = parseFloat(document.getElementById("product").value); 

    // Проверка на валидность количества
    if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
        document.getElementById("error").innerHTML = "Ошибка: введите положительное целое количество.";
        document.getElementById("cost").innerHTML = ""; // Очищаем стоимость при ошибке
        return; // Прерываем выполнение функции
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
