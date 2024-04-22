let id = 0;
let food;
const addFoodBtn = document.getElementById("add-food");
const cards = document.getElementById("cards");
if(localStorage.getItem("food")){
    food = JSON.parse(localStorage.getItem("food"));
} else {
    food = [];
    localStorage.setItem("food",JSON.stringify(food));
}

class Food{
    constructor(name, image, rating){
        this.name = name;
        this.image = image;
        this.rating = rating;
        id++;
    }
}
addFoodBtn.addEventListener("click", (e) => {
    const {nameVal, imageVal, ratingVal} = getDataFromUser();
    addFood(nameVal, imageVal, ratingVal);
    renderUI(food);
});
function getDataFromUser(){
    const nameVal = prompt("name");
    const imageVal = prompt("image");
    const ratingVal = prompt("rating");
    return {nameVal, imageVal, ratingVal};
}
function addFood(name, image, rating){
    const newFood = new Food(name, image, rating);
    food.push(newFood);
    localStorage.setItem("food", JSON.stringify(food));
    renderUI(food);
}
function renderUI(list){
    let innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        innerHTML += `
        <div class="col-3 pt-5" >
                <div class="card" style="width: 18rem;">
                    <img src="${list[i].image}" class="card-img-top" height= "280px" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${list[i].name}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <div class="mt-2 mb-2 rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </div>
                      <button class="btn btn-warning">Add to Basket</button>
                    </div>
                  </div>
            </div>
        `;        
    }
    cards.innerHTML = innerHTML;
}
renderUI(food);

function toggleBasket() {
    const basketSection = document.getElementById('basket-section');
    basketSection.classList.toggle('hidden');
}

const basketIcon = document.getElementById('basket-icon');

basketIcon.onclick = function() {
    toggleBasket();
};

function renderBasketItems(items) {
    const basketTable = document.querySelector('#basket-table tbody');
    basketTable.innerHTML = '';
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.rating}</td>
        `;
        basketTable.appendChild(row);
    }
}

const addToBasketButtons = document.querySelectorAll('.btn.btn-warning');

for (let i = 0; i < addToBasketButtons.length; i++) {
    const button = addToBasketButtons[i];
    button.onclick = function() {
        const selectedItem = food[i];
        
        let basketItems = localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : [];
        basketItems.push(selectedItem);
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        
        renderBasketItems(basketItems);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const basketItems = localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : [];
    renderBasketItems(basketItems);
});

