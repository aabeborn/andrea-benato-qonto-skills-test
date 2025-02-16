const CONVERSION_RATE_EURO_TO_DOLLAR = 1.13

export const convertEuroToDollar = (amount: number) => (amount * CONVERSION_RATE_EURO_TO_DOLLAR).toFixed(2)
