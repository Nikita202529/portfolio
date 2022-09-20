const   inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
        ingredients = document.querySelectorAll('.current-pizza-item'),
        drinks = document.querySelectorAll('.select-drink-item'),
        totalAmount = document.querySelector('.total-amount>.summa'),
        orderBtn = document.querySelector('.typical-btn'),
        modalWindow = document.querySelector('.modal-window'),
        submitBtn = document.querySelector('.modal-window__submit-btn');

const   subject = document.querySelector('.modal-window__subject'),
        ingredientsSpan = document.querySelector('.modal-window__ingredients'),
        drinksSpan = document.querySelector('.modal-window__drinks');


// Additing ingredients to pizza

const   addIngredients = checkboxes => {

    const nodesArray = Array.from(checkboxes);
    const ingredientsArray = Array.from(ingredients);
    ingredientsArray.splice(0, 2);

    for (let item of checkboxes) {
        item.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            const index = nodesArray.indexOf(event.target);
            ingredientsArray[index].classList.toggle('active');
            calculateOreder();
        })
    }
}

addIngredients(inputsCheckbox);

// Additing drinks

const addDrinks = drinkItems => {
    for (let item of drinkItems) {
        item.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            calculateOreder();
        })
    }
}

addDrinks(drinks);

// Calculate order

const calculateOreder = () => {
    const   ingredients = document.querySelectorAll('.container-custom-checkbox.active'),
            drinks = document.querySelectorAll('.select-drink-item.active');

    const   startPrice = 300,
            ingredientsPrice = ingredients.length * 25,
            drinksPrice = drinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₽`;
}

// Modal window for oreder

window.addEventListener('click', event => {
    if (event.target === modalWindow) {
        modalWindow.classList.add('none');
    }
})

submitBtn.addEventListener('click', () => {
    modalWindow.classList.add('none');
});

const prepareWindowModalContent = () => {
    subject.innerHTML = '';
    ingredientsSpan.innerHTML = '';
    drinksSpan.innerHTML = '';

    const   addedIngredients = document.querySelectorAll('.container-custom-checkbox.active'),
            addedDrinks = document.querySelectorAll('.select-drink-item.active');
    
    let ingredientsList = [];
    if (addedIngredients) {
        for (let ingredients of addedIngredients) {
            ingredientsList.push(ingredients.innerText);
        }
    };

    let drinksList = [];
    if (addedDrinks) {
        for (let drink of addedDrinks) {
            drinksList.push(drink.dataset.name);
        }
    };

    const totalIngredients = ingredientsList.join(', ') || 'Нет ингредиентов';
    const totalDrinks = drinksList.join(', ') || 'Нет напитков';
    const totalText = `Вы заказали пиццу с ингредиентами: '${totalIngredients}', a так же напитки: '${totalDrinks}', с Вас ${totalAmount.innerHTML}`;

    subject.innerHTML = totalText;
}

orderBtn.addEventListener('click', () => {
    modalWindow.classList.remove('none');
    prepareWindowModalContent();
});