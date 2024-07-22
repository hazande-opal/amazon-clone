const xhr = new XMLHttpRequest();

xhr.addEventListener('load', ()=>{
    const renderResponse = xhr.response;
    const products = JSON.parse(renderResponse);
    products.forEach((product) => {
        console.log(product);
    })
})

xhr.open('GET', 'https://supersimplebackend.dev/products');
xhr.send();

