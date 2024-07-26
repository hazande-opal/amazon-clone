import convertCentsToDollars from "../data/utils/money.js";

console.log('converts cents to dollars');

if(convertCentsToDollars(2095) === '20.95'){
    console.log('passed');
} else{
    console.log('failed');
}

console.log('works with 0')

if(convertCentsToDollars(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounds up to the nearest cent');

if(convertCentsToDollars(2000.4) === '20.00'){
    console.log('passed')
}else{
    console.log('failed');
}