export const MINIMUM_DIGIT = 1;
export const MAXIMUM_DIGIT = 9;

export const getRandomNumber = (minimum: number, maximum: number): number => {
    if (minimum === maximum) {
        return minimum;
    }
    if (minimum > maximum) {
        const swap = minimum;
        minimum = maximum;
        maximum = swap;
    }
    const randomNumber =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomNumber;
};

export const normalizeDigit = (digit: number): number => {
    if (digit < MINIMUM_DIGIT) {
        digit = MINIMUM_DIGIT;
    } else if (digit > MAXIMUM_DIGIT) {
        digit = MAXIMUM_DIGIT;
    }
    return digit;
};

export const getRandomDigit = (
    minimum: number = MINIMUM_DIGIT,
    maximum: number = MAXIMUM_DIGIT
): number => {
    minimum = normalizeDigit(minimum);
    maximum = normalizeDigit(maximum);
    if (minimum === maximum) {
        return minimum;
    }
    if (minimum > maximum) {
        const swap = minimum;
        minimum = maximum;
        maximum = swap;
    }
    const randomDigit = getRandomNumber(minimum, maximum);
    return randomDigit;
};
