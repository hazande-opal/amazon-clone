import convertCentsToDollars from "../data/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(convertCentsToDollars(2005)).toEqual('20.05');
    });

    it('works with 0', () => {
        expect(convertCentsToDollars(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(convertCentsToDollars(2000.5)).toEqual('20.01');
    });
})