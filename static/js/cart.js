
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

export function addToCart(product, quantity = 1) {
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
    const cartContainer = document.getElementById('cart_items_list');
    const templateCartItem = document.getElementById('template_cart_item');
    const subtotalContainer = document.querySelector('.subtotal');
    const itemstotalContainer = document.querySelector('.itemstotal');

    // if not on cart page, stop
    if (!cartContainer || !subtotalContainer) return;

    const cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        subtotalContainer.innerText = '$0.00';
        return;
    }

    let subtotal = 0;
    const fragment = document.createDocumentFragment();

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        //init template
        const clone = templateCartItem.content.cloneNode(true);

        //display product image
        const img = clone.querySelector('img');
        img.src = item.image;
        img.alt = item.title;

        //add details to the template
        clone.querySelector('.cart-item-title').innerText = item.title;
        clone.querySelector('.cart-item-price').innerText = `$${item.price.toFixed(2)}`;
        clone.querySelector('.cart-item-quantity').innerText = `Quantity: ${item.quantity}`;

        const removeBtn = clone.querySelector('.cart-item-remove');
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
        
        // append template to the document fragment
        fragment.appendChild(clone);
    });
    //append fragment to cart container
    cartContainer.appendChild(fragment);
    
    subtotalContainer.innerText = `$${subtotal.toFixed(2)}`;

    // iterate through items and check their quantity, take that value and add to sum
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    itemstotalContainer.innerText = `${totalItems}`;
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
