const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

const searchInput = document.getElementById('searchInput');
const resultBox = document.getElementById('resultBox');
const searchButton = document.querySelector('.searchbar button');

// Example data for autocomplete suggestions with URLs
const suggestions = [
    { name: 'Nike', url: '/brands/nike.html?query=Nike'},
    { name: 'Anthony Edwards 1 White', modalId: 'myModal3', pageId:'training_shoes'},
    { name: 'Adidas', url: '/brands/adidas.html?query=Adidas'},
    { name: 'Puma', url: '/brands/puma.html?query=Puma'},   
    { name: 'Converse', url: '/brands/converse.html?query=Converse'},
    { name: 'Anta', url: '/brands/anta.html?query=Anta'},
    { name: 'Brands', url: '/brands.html?query=Brands'},
    { name: 'Trends', url: '/trends.html?query=Trends'},  
    { name: 'Limited Edition', url: '/trends/limited_edition.html?query=Limited Edition'},
    { name: 'Best Seller', url: '/trends/best_seller.html?query=Best Seller'},
    { name: 'Sale', url: '/trends/sale.html?query=Sale'},
    { name: 'Budget Friendly', url: '/trends/budget_friendly.html?query=Budget Friendly'}, 
    { name: 'Shop', url: '/shop.html?query=Shop'},
    { name: 'Running Shoes', url: '/categories/running_shoes.html?query=Running Shoes'},
    { name: 'Training Shoes', url: '/categories/training_shoes.html?query=Training Shoes'},
    { name: 'Court Shoes', url: '/categories/court_shoes.html?query=Court Shoes'},
    { name: 'Lifestyle', url: '/categories/lifestyle_shoes.html?query=Lifestyle Shoes'},
    { name: 'Court Shoes', url: '/categories/court_shoes.html?query=Court Shoes'},
    { name: 'Dame 8 EXTPLY', modalId: 'myModal4' },
    { name: 'D.O.N Issue 5', modalId: 'myModal5' },
    { name: 'Derrick Rose Son of Chi Low', modalId: 'myModal6' },

];


searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    resultBox.innerHTML = '';

    if (query) {    
        const filteredSuggestions = suggestions.filter(item => 
            item.name.toLowerCase().includes(query)
        );

        if (filteredSuggestions.length > 0) {
            resultBox.style.display = 'block';
            const ul = document.createElement('ul');
            filteredSuggestions.forEach(item => {
                const listItem = document.createElement('li');
                const linkItem = document.createElement('a');
                linkItem.textContent = item.name;
                listItem.appendChild(linkItem);
                listItem.addEventListener('click', function() {
                    searchInput.value = item.name;
                    resultBox.innerHTML = '';
                    resultBox.style.display = 'none';
                    handleSearch(item.name);
                });
                ul.appendChild(listItem);
            });
            resultBox.appendChild(ul);
        } else {
            resultBox.style.display = 'none';
        }
    } else {
        resultBox.style.display = 'none';
    }
    
});



document.addEventListener('click', function(event) {
    if (!resultBox.contains(event.target) && event.target !== searchInput) {
        resultBox.style.display = 'none';
    }
});

searchButton.addEventListener('click', function() {
    handleSearch(searchInput.value);
});

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSearch(searchInput.value);
    }
});

function handleSearch(query) {
    const searchQuery = query.toLowerCase();
    const match = suggestions.find(item => item.name.toLowerCase() === searchQuery);
    if (match) {
        if (match.modalId) {
            openModal(match.modalId);
        } else if (match.url) {
            window.location.href = match.url;
        }
    }
}


/* Add To Cart */

let cartIcon = document.querySelector("#cart-icon");
let cartCount = document.querySelector("#cart-count");
let cart = document.querySelector(".cart-mainbox");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        ready();
        loadCartFromLocalStorage();
        updateCartCount();
    });
} else {
    ready();
    loadCartFromLocalStorage();
    updateCartCount();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName("cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    if (cartContent.children.length === 0) {
        alert("Your cart is empty");
        return;
    }
    alert("Your Order is placed");
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    cartProducts = [];
    localStorage.removeItem('cartItems');
    updateCartCount();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();

    cartProducts = cartProducts.filter(title => title !== buttonClicked.parentElement.getElementsByClassName("cart-product-title")[0].innerText);
    saveCartToLocalStorage();
    updateCartCount();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartToLocalStorage();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

var cartProducts = [];

function addProductToCart(title, price, productImg) {
    if (cartProducts.includes(title)) {
        alert('You have already added this item to the cart');
        return;
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartItems = document.getElementsByClassName("cart-content")[0];

    var cartBoxContent = `
        <img src="${productImg}" class="cart-img" alt="cart-img" style="height: 100px; width: 100px; margin-top: 20px;">
        <div class="detail-box" style="margin-top: 20px;">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <div>Quantity:&nbsp <span> <input type="number" value="1" class="cart-quantity" style="border-top: transparent; border-left: transparent; border-right: transparent; padding-left: 13px;  cursor: pointer; width: 60px; "></span></div>
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartProducts.push(title);
    saveCartToLocalStorage();
    updateCartCount();

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

    updatetotal();
}

function saveCartToLocalStorage() {
    var cartItems = [];
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
        var price = cartBox.getElementsByClassName("cart-price")[0].innerText;
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;
        var quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
        cartItems.push({ title, price, productImg, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);
            var cartBoxes = document.getElementsByClassName("cart-box");
            cartBoxes[cartBoxes.length - 1].getElementsByClassName("cart-quantity")[0].value = item.quantity;
        }
    }
}

function updateCartCount() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    cartCount.innerText = cartBoxes.length;
}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₱", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "₱" + total;
}
