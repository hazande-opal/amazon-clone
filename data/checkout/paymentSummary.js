import { cart } from "../cart.js";
import { products } from "../products.js";
import { convertCentsToDollars } from "../utils/money.js";
import { getDeliveryOption } from "../deliveryoptions.js";

export function renderPaymentSummary(){
    // steps:
    // 1. Save the Data
    // 2. Generate the HTML
    // 3. Make it Interactive

    // Step 1: save the data

    let cartQuantity = 0;
    let productPriceCents = 0;
    let shippingPriceCents = 0;
   


    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        // Uses the id of item in the cart to determine other values of the item such as image, price
        let matchingProduct;

        products.forEach((product) => {
            if(product.id === productId){
                matchingProduct = product;
            }
        });

        cartQuantity += cartItem.quantity;
     
        productPriceCents += matchingProduct.priceCents * cartItem.quantity;
      
        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        shippingPriceCents += deliveryOption.priceCents;  
    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;

    const totalCents = totalBeforeTax + taxCents;

    // Step 2: Generate the HTML
    const paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$
        ${convertCentsToDollars(productPriceCents)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        $${convertCentsToDollars(shippingPriceCents)}
        </div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
        $${convertCentsToDollars(totalBeforeTax)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
        $${convertCentsToDollars(taxCents)}
        </div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        $${convertCentsToDollars(totalCents)}
        </div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    // Step 3: Make it interactive
    renderPaymentSummary();
}