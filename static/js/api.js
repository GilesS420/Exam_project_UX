const BASE_URL = 'https://fakestoreapi.com/products';

let allProducts = []; 

fetch(BASE_URL)
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        displayProducts(products);
    })
    .catch(err => console.error(err));


// FETCH ALL PRODUCTS
function displayProducts(products) {
    const container = document.querySelector('.products-grid');
    container.innerHTML = '';

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

        //category
        const category = document.createElement('p');
        category.innerHTML = `<strong>Category:</strong> ${product.category}`;
        article.appendChild(category);

        //price
        const price = document.createElement('p');
        price.innerHTML = `<strong>Price:</strong> $${product.price}`;
        article.appendChild(price);

        // header + link
        const header = document.createElement('header');
        const h2 = document.createElement('h2');
        const titleLink = document.createElement('a');
        titleLink.href = `product-detail.html?id=${product.id}`;
        titleLink.innerText = product.title;

        h2.appendChild(titleLink);
        header.appendChild(h2);
        article.appendChild(header);

        container.appendChild(article);
    });
}


// FILTER LOGIC

document.querySelector('.btn-primary').addEventListener('click', applyFilters);

function applyFilters() {
    let filtered = [...allProducts];

    const selectedCategories = Array.from(
        document.querySelectorAll("input[name='category']:checked")
    ).map(cb => cb.nextElementSibling.innerText.toLowerCase());

    if (selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
            selectedCategories.includes(product.category.toLowerCase())
        );
    }

    displayProducts(filtered);
}


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
    })
    .catch(err => console.error(err));


function renderProduct(product) {

    // title
    const titleContainer = document.querySelector(".product-title");

    const h1 = document.createElement("h1");
    h1.innerText = product.title;

    titleContainer.appendChild(h1);


    // image
    const imageContainer = document.querySelector(".product-detail-image");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    imageContainer.appendChild(img);


    // price
    const priceContainer = document.querySelector(".product-price");

    const price = document.createElement("h2");
    price.innerText = `$${product.price}`;

    priceContainer.appendChild(price);


    // category
    const categoryContainer = document.querySelector(".product-category");

    const categoryP = document.createElement("p");
    categoryP.innerHTML = `<strong>Category:</strong> ${product.category}`;

    categoryContainer.appendChild(categoryP);


    // description
    const descriptionContainer = document.querySelector("#product-description");

    const descP = document.createElement("p");
    descP.innerText = product.description;

    descriptionContainer.appendChild(descP);


    // reviews
    const reviewsContainer = document.querySelector("#reviews");

    const stars =
        "★".repeat(Math.round(product.rating.rate)) +
        "☆".repeat(5 - Math.round(product.rating.rate));

    const ratingP = document.createElement("p");
    ratingP.innerHTML = `${stars} (${product.rating.rate})`;

    const countP = document.createElement("p");
    countP.innerText = `${product.rating.count} total reviews`;

    reviewsContainer.appendChild(ratingP);
    reviewsContainer.appendChild(countP);
}


// product detail - tabs

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab");

        tabPanes.forEach(pane => pane.classList.remove("active"));
        
        document.getElementById(target).classList.add("active");
    });
});
