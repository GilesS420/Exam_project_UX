//create cart for logged in user OR guest user
const currentUser = localStorage.getItem("currentUser") || "guest";
const CART_KEY = `cart_${currentUser}`;


function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product, quantity = 1) {
    const cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    alert(`${product.title} added to cart!`);
}

function clearCart() {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
}


// CART PAGE

//remove button
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCart();
}

// display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-item');
    const subtotalContainer = document.querySelector('.subtotal p');

    // if not on cart page, stop
    if (!cartContainer || !subtotalContainer) return;

    const cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        subtotalContainer.innerText = 'Subtotal: $0.00';
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        //display product image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;

        //display product name
        const title = document.createElement('p');
        title.innerText = item.title;

        //display product price
        const price = document.createElement('p');
        price.innerText = `$${item.price.toFixed(2)}`;

        //display product quantity
        const quantity = document.createElement('p');
        quantity.innerText = `Quantity: ${item.quantity}`;

        //create remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', () => removeFromCart(item.id));

        // Append to container
        cartContainer.appendChild(img);
        cartContainer.appendChild(title);
        cartContainer.appendChild(price);
        cartContainer.appendChild(removeBtn);
        cartContainer.appendChild(document.createElement('hr'));
    });

    subtotalContainer.innerText = `Subtotal: $${subtotal.toFixed(2)}`;
}



// checkout button 
// if cart is empty, alert
// otherwise redirect to checkout page

function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('checkout-button');
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', () => {
        const cart = getCart();

        if (cart.length === 0) {
            alert('Your cart is empty.');
        } else {
            window.location.href = 'checkout.html';
        }
    });
}


// CHECKOUT PAGE

// when clicking checkout button
// clear cart and redirect to order confirmation page

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        clearCart();

        window.location.href = "order-confirmation.html";
    });
}


document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    setupCheckoutButton();
    setupCheckoutForm();
});
