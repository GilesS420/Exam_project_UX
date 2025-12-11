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

        // header + link
        const header = document.createElement('header');
        const h2 = document.createElement('h2');
<<<<<<< Updated upstream
        const titleLink = document.createElement('a');
        titleLink.href = `product-detail.html?id=${product.id}`;
        titleLink.innerText = product.title;

        h2.appendChild(titleLink);
=======
        const link = document.createElement('a');
        link.href = `product-detail.html?id=${product.id}`;
        link.innerText = product.title;
        h2.appendChild(link);
>>>>>>> Stashed changes
        header.appendChild(h2);
        article.appendChild(header);

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
    document.querySelector(".product-title").innerHTML = `
        <h1>${product.title}</h1>
    `;

    // image
    document.querySelector(".product-detail-image").innerHTML = `
        <img src="${product.image}" alt="${product.title}">
    `;

    //price
    document.querySelector(".product-price").innerHTML = `
        <h2>$${product.price}</h2>
    `;

    //category
    document.querySelector(".product-category").innerHTML = `
        <p><strong>Category:</strong> ${product.category}</p>
    `;

    // description
    document.querySelector("#product-description").innerHTML += `
        <p>${product.description}</p>
    `;

    // reviews
    const stars = "★".repeat(Math.round(product.rating.rate)) +
                  "☆".repeat(5 - Math.round(product.rating.rate));

    document.querySelector("#reviews").innerHTML += `
        <p><strong>Rating:</strong> ${stars} (${product.rating.rate})</p>
        <p>${product.rating.count} total reviews</p>
    `;
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
