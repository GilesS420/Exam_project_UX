const BASE_URL = "https://fakestoreapi.com/products/1"

fetch(BASE_URL)
.then(res => res.json())
.then(data => {
    console.log(data.title);
})
.catch(err => console.error(err));



// fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => console.log(data));