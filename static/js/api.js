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

        const header = document.createElement('header');
        const h2 = document.createElement('h2');
        const link = document.createElement('a');
        link.href = `product.html?id=${product.id}`;
        link.innerText = product.title;
        h2.appendChild(link);
        header.appendChild(h2);
        article.appendChild(header);

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.classList.add('product-image');
        article.appendChild(img);

        const category = document.createElement('p');
        category.innerHTML = `<strong>Category:</strong> ${product.category}`;
        article.appendChild(category);

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
