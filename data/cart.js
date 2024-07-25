// Use the cart saved to local storage or already predifined items in the cart
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: '2'
}];

// Saves the cart to localstorage
export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add new items to cart or adds the quantity of items already in the cart and updates the local storage
export function addToCart(productId){
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    })
  
    if(matchingItem){
      matchingItem.quantity += 1;
    }
    else{
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
}

// Removes selected item form the cart and update sthe localStorage
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  });

  cart = newCart;

  saveToStorage();
}

// Updates the cart quantity and displays the result as Notifications to the cart icon
export function updateCartQuantity(){
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });
  
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Update sthe delivery option id of items in cart using the productId and deliveryOptionId as parameters
// and updates the local storage
export function updateDeliveryoptions(productId, deliveryOptionId){
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();

}



