import {cart, removeFromCart, updateCartQuantity, saveToStorage, updateDeliveryoptions} from '../cart.js';
import { products } from '../products.js';
import { convertCentsToDollars } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../deliveryoptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

// Renders the whole orderSummary page to the DOM
export function renderOrderSummary(){

    // Saves the data and displays it in the DOM
    let checkoutHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        // Uses the id of item in the cart to determine other values of the item such as image, price
        let matchingProduct;

        products.forEach((product) => {
            if(product.id === productId){
                matchingProduct = product;
            }
        });


        const deliveryOptionId = cartItem.deliveryOptionId;

        const optionDelivery = getDeliveryOption(deliveryOptionId)
        // let optionDelivery;

        // deliveryOptions.forEach((option) => {
        //     if(option.id === deliveryOptionId){
        //         optionDelivery = option;
        //     }
        // })
        const today = dayjs();

        const deliveryDate = today.add(
            optionDelivery.deliveryDays, 'days'
        );

        const dateString = deliveryDate.format('dddd, MMMM DD');

    

        checkoutHTML += ` 
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${convertCentsToDollars(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <span class="update-container js-update-container">
                            <input class="input-quantity js-input-quantity" type="text">
                            <span class="save-quantity js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOption(matchingProduct, cartItem)}
                </div>
            </div>
        </div>`;
    });

    // Save the deliveryoptions in js and upload it in the DOM 
    function deliveryOption(matchingProduct, cartItem){

        let html = '';

        deliveryOptions.forEach((deliveryOption) => {

            // Perform date functions using imported dayjs function from the web
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days'
            );

            const dateString = deliveryDate.format('dddd, MMMM DD');

            const priceString = deliveryOption.priceCents === 0 
            ? 'FREE'
            : `$${convertCentsToDollars(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;



            html += 
            `<div class="delivery-option js-delivery-option" 
            data-product-id ="${matchingProduct.id}" 
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked  ? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                </div>
            </div>
            `
        });

        return html;
    }

    // Displays items in the cart to the checkout page using DOM
    document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

    // Updates the qunatity of items in the cart;
    function checkOutQuantity(){
        let checkOutQuantity = 0;
        cart.forEach((cartItem) => {
            checkOutQuantity += cartItem.quantity;
        });

        // document.querySelector('.js-return-to-home-link').innerHTML = ;
    }
     checkOutQuantity();

    // Removes item form the cart and checkout page
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            removeFromCart(productId);
            
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            renderPaymentSummary();

            checkOutQuantity();
            
        });
    });

    
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} =  element.dataset;

            updateDeliveryoptions(productId, deliveryOptionId);

            renderOrderSummary();
            renderPaymentSummary();
        })
    })
}

renderOrderSummary();


// document.querySelectorAll('.js-update-quantity-link').forEach((update) => {
//     update.addEventListener('click', () => {
//         const productId = update.dataset.productId;
//         console.log(productId);

//         document.querySelector('.js-update-container').style.display = 'inline-block';
//         update.style.display = 'none';

//         const newQuantity = document.querySelector('.js-input-quantity');

//         document.querySelectorAll('.js-save-quantity').forEach((save) => {
//             // const productId = save.dataset.productId;
//             save.addEventListener('click', () => {
    
//                 let newQuantityvalue;
//                 newQuantityvalue = newQuantity.value;
//                 newQuantityvalue = Number(newQuantityvalue);
//                 newQuantity.value = '';
                
//                 let matchingItem;
    
//                 cart.forEach((cartItem) => {
//                     if(cartItem.productId === productId){
//                         matchingItem = cartItem;
//                     }
//                 })
    
//                 if(matchingItem){
//                     matchingItem.quantity = newQuantityvalue;
//                 } 
    
//                 document.querySelector('.js-quantity-label').innerHTML = `${matchingItem.quantity}`
//                 checkOutQuantity();
//                 saveToStorage();
    
//                 document.querySelector('.js-update-container').style.display = 'none';
//                 update.style.display = 'inline-block';
    
//             })
//         })
//     });
// });



