let cart = [];
   
// localstorage
function loadCart() {
    const storeCart = localStorage.getItem('cart');
    if(storeCart){
        cart =JSON.parse(storeCart);  //تحويل البيانات المخزنه الي كائنات 
    }
}
// حفظ السله في local
function saveCart() {
    localStorage.setItem('cart' , JSON.stringify(cart));  // تحويل السله الي سلسله  وتخزينها
}

// اضافه المنتج للسله 
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++; // إذا كان المنتج موجوداً، زِد الكمية
    } else {
        cart.push({name, price, quantity: 1, image}); // إذا كان المنتج غير موجود، أضفه مع الصورة
    }
    saveCart();
    updateCart();
}


// حذف المنتج 
function removeFromCart(name) {
    cart = cart.filter(item => item.name !==name)
    saveCart(); 
    updateCart();
}

function updateCart() {

    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    cartElement.innerHTML = '';
    let totalPrice = 0

    cart.forEach(item => {
        const itemTotal = item.price* item.quantity;
        totalPrice += itemTotal
        const cartitem = document.createElement('div')
        cartitem.className ='cart-item'
        cartitem.innerHTML=`
            <span>
                <img src="${item.image}" alt="${item.name}">
                ${item.name } <i onclick="addQuantity('${item.name}')" class="fa-solid fa-plus"></i> (x${item.quantity}) <i onclick="removeQuantity('${item.name}')" class="fa-solid fa-minus"></i> - $${itemTotal}   
            </span>
            <button onclick="removeFromCart('${item.name}')">حذف </button>
        `;
cartElement.appendChild(cartitem);
    
});
totalElement.innerHTML =`الاجمالي : $${totalPrice}`;
}


function addQuantity(name) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    }
    saveCart();
    updateCart();
}


function removeQuantity(name) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity--;
    }
    saveCart();
    updateCart();
}

//عرض البيانات اللي في data.js
function displayProducts() {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h2> ${product.name}</h2>
                <p>price : $${product.price}</p>
                <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

window.onload = function(){
    loadCart();
    displayProducts();
    updateCart();
};

// الدارك مود

let body = document.querySelector("body");
let dark = document.querySelector(".fa-moon");
let sun = document.querySelector(".fa-sun");
let carts = document.querySelector(".cart")
sun.style.display = "none";

dark.onclick = function(){
    sun.style.display = "block";
    dark.style.display = "none";
    body.style.backgroundColor = "black";
    body.style.color = "white";
    sun.style.color = "white";
    carts.style.backgroundColor = "black";
}

sun.onclick = function(){
    dark.style.display = "block";
    sun.style.display = "none";
    body.style.backgroundColor = "#f4f4f4";
    body.style.color = "black";
    carts.style.backgroundColor = "white";
}

