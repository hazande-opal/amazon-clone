export function convertCentsToDollars(cents){
    return (Math.round(cents)/100).toFixed(2);
}