export function convertCentsToDollars(cents){
    return (Math.round(cents)/100).toFixed(2);
}

export default convertCentsToDollars;