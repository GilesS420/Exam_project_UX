import { addToCart } from "./cart.js";
const BASE_URL = 'https://fakestoreapi.com/products';


let allProducts = []; 

fetch(BASE_URL)
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        displayProducts(products);

        // URL filtering for products (product-detail breadcrumbs and index links)
        // Get categories from the URL
        const params = new URLSearchParams(window.location.search);
        const categories = params.getAll('category'); // Use GetAll to grab multiple values for 'category'

        if (categories.length > 0) {
            // Filter products based on multiple categories
            const filteredProducts = allProducts.filter(product => 
                categories.some(category => product.category.toLowerCase() === category.toLowerCase())
            );
            displayProducts(filteredProducts);
        } else {
            displayProducts(products); // Show all if there's no category filter
        }
    })
    .catch(err => console.error(err));


// FETCH ALL PRODUCTS
function displayProducts(products) {
    const container = document.querySelector('.products-grid');
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const article = document.createElement('article');
        article.classList.add('product-card');

        // image + link
        const imageLink = document.createElement('a');
        imageLink.href = `product-detail.html?id=${product.id}`;

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.classList.add('product-image');

        imageLink.appendChild(img);
        article.appendChild(imageLink);

        // header + link
        const header = document.createElement('header');
        const h2 = document.createElement('h2');
        h2.classList.add('product-title');

        const titleLink = document.createElement('a');
        titleLink.href = `product-detail.html?id=${product.id}`;
        titleLink.innerText = product.title;

        h2.appendChild(titleLink);
        header.appendChild(h2);
        article.appendChild(header);

        // price
        const price = document.createElement('p');
        price.classList.add('product-price');
        price.innerText = `$${product.price}`;

        article.appendChild(price);

        // append card to fragment
        fragment.appendChild(article);
    });

    // append fragment once
    container.appendChild(fragment);
}


// FILTER LOGIC

const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');

        // remove active class from all buttons
        categoryButtons.forEach(b => b.classList.remove('active'));

        let filtered = [...allProducts];

        if (!isActive) {
            // add active class to the clicked button
            btn.classList.add('active');

            // get the selected category
            const selectedCategory = btn.innerText.toLowerCase();

            // filter products
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === selectedCategory
            );
        }

        displayProducts(filtered);
    });
});


//FETCH ONE PRODUCT - PRODUCT DETAIL PAGE

// get product id from the url
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    console.error("No product ID found in URL");
}

fetch(`${BASE_URL}/${productId}`)
    .then(res => res.json())
    .then(product => {
        renderProduct(product);
        renderBreadcrumbs(product);
    })
    .catch(err => console.error(err));

    // Render product information on single product page
function renderProduct(product) {
    // --- Title ---
    const titleContainer = document.querySelector(".product-title");
    titleContainer.textContent = "";

    const h1 = document.createElement("h1");
    h1.textContent = product.title;
    titleContainer.appendChild(h1);

    //Image
    const imageContainer = document.querySelector(".product-detail-image");
    imageContainer.querySelector("img")?.remove();

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    imageContainer.prepend(img);

    //Price
    const priceContainer = document.querySelector(".product-price");
    priceContainer.textContent = "";

    const price = document.createElement("h2");
    price.textContent = `$${product.price}`;
    priceContainer.appendChild(price);

    //Category
    const categoryContainer = document.querySelector(".product-category");
    categoryContainer.textContent = product.category;

    //Description tab
    const descriptionContainer = document.querySelector("#product-description");
    
    const descP = document.createElement("p");
    descP.textContent = product.description;
    descriptionContainer.appendChild(descP);

    //Review tab, create 
    const reviewsContainer = document.querySelector("#reviews");
    //Rating
    const { rate, count } = product.rating;
    const stars =
        "★".repeat(Math.round(rate)) +
        "☆".repeat(5 - Math.round(rate));

    const ratingP = document.createElement("p");
    ratingP.textContent = `${stars} (${rate})`;

    const countP = document.createElement("p");
    countP.textContent = `${count} total reviews`;

    reviewsContainer.append(ratingP, countP);

    //Add to card button
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    addToCartBtn.onclick = (e) => {
        e.preventDefault();
        addToCart(product);
    };
}

// function renderProduct(product) {
//     const fragment = document.createDocumentFragment();

//     // title
//     const titleContainer = document.querySelector(".product-title");
//     titleContainer.innerHTML = '';

//     const h1 = document.createElement("h1");
//     h1.innerText = product.title;
//     fragment.appendChild(h1);
//     titleContainer.appendChild(fragment.cloneNode(true));

//     // image
//     const imageContainer = document.querySelector(".product-detail-image");
//     imageContainer.innerHTML = '';

//     const img = document.createElement("img");
//     img.src = product.image;
//     img.alt = product.title;
//     imageContainer.appendChild(img);

//     // price
//     const priceContainer = document.querySelector(".product-price");
//     priceContainer.innerHTML = '';

//     const price = document.createElement("h2");
//     price.innerText = `$${product.price}`;
//     priceContainer.appendChild(price);

//     // category
//     const categoryContainer = document.querySelector(".product-category");
//     categoryContainer.innerHTML = '';

//     const categoryP = document.createElement("p");
//     categoryP.innerText = product.category;
//     categoryContainer.appendChild(categoryP);

//     // description
//     const descriptionContainer = document.querySelector("#product-description");
//     descriptionContainer.innerHTML = '';

//     const descP = document.createElement("p");
//     descP.innerText = product.description;
//     descriptionContainer.appendChild(descP);

//     // reviews
//     const reviewsContainer = document.querySelector("#reviews");
//     reviewsContainer.innerHTML = '';

//     const stars =
//         "★".repeat(Math.round(product.rating.rate)) +
//         "☆".repeat(5 - Math.round(product.rating.rate));

//     const ratingP = document.createElement("p");
//     ratingP.innerHTML = `${stars} (${product.rating.rate})`;

//     const countP = document.createElement("p");
//     countP.innerText = `${product.rating.count} total reviews`;

//     reviewsContainer.append(ratingP, countP);

//     // add to cart
//     const addToCartBtn = document.getElementById("add-to-cart-btn");
//     addToCartBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         addToCart(product);
//     });
// }


// product detail - tabs

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab");

        tabPanes.forEach(pane => pane.classList.remove("active"));
        tabButtons.forEach(pane => pane.classList.remove("active"));
        
        btn.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});

// Bread crumbs
function renderBreadcrumbs(product) {
    const categoryContainer = document.querySelector("#category-breadcrumb");
    categoryContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const categoryBreadcrumb = document.createElement("a");
    categoryBreadcrumb.innerText = product.category;
    categoryBreadcrumb.href = `products.html?category=${encodeURIComponent(
        product.category.toLowerCase()
    )}`;
    categoryBreadcrumb.classList.add('breadcrumb-item');

    fragment.appendChild(categoryBreadcrumb);
    categoryContainer.appendChild(fragment);
}

