// code under test
import {
    getRandomDigit,
    getRandomNumber,
    MAXIMUM_DIGIT,
    MINIMUM_DIGIT,
    normalizeDigit
} from '../numberUtils';

describe('numberUtils', () => {
    describe('getRandomNumber', () => {
        let minimum: number;
        let maximum: number;
        beforeEach(() => {
            minimum = Math.floor(Math.random() * 10 + 1);
            maximum = minimum + 100;
        });
        it('should get a random number', () => {
            const result = getRandomNumber(minimum, maximum);
            expect(result).toBeGreaterThanOrEqual(minimum);
            expect(result).toBeLessThanOrEqual(maximum);
        });
        it('should return the minimum value if the minimum and maximum values are equal', () => {
            minimum = maximum;
            const result = getRandomNumber(minimum, maximum);
            expect(result).toEqual(minimum);
        });
        it('should switch minimum and maximum values if the minimum value is greater than the maximum value', () => {
            const result = getRandomNumber(maximum, minimum);
            expect(result).toBeGreaterThanOrEqual(minimum);
            expect(result).toBeLessThanOrEqual(maximum);
        });
    });
    describe('normalizeDigit', () => {
        let digit: number;
        beforeEach(() => {
            digit = getRandomNumber(MINIMUM_DIGIT, MAXIMUM_DIGIT);
        });
        it('should return the default minimum digit if the given digit is less than the default minimum value', () => {
            const result = normalizeDigit(MINIMUM_DIGIT - 1);
            expect(result).toEqual(MINIMUM_DIGIT);
        });
        it('should return the default maximum digit if the given digit is greater than the default maximum value', () => {
            const result = normalizeDigit(MAXIMUM_DIGIT + 1);
            expect(result).toEqual(MAXIMUM_DIGIT);
        });
        it('should return the given digit if it is in range of the default minimum and maximum values', () => {
            const result = normalizeDigit(digit);
            expect(result).toEqual(digit);
        });
    });
    describe('getRandomDigit', () => {
        let minimum: number;
        let maximum: number;
        beforeEach(() => {
            minimum = 3;
            maximum = 8;
        });
        it('should get a random digit', () => {
            const result = getRandomDigit(minimum, maximum);
            expect(result).toBeGreaterThanOrEqual(minimum);
            expect(result).toBeLessThanOrEqual(maximum);
        });
        it('should get a random digit using default minimum and maximum values', () => {
            const result = getRandomDigit();
            expect(result).toBeGreaterThanOrEqual(MINIMUM_DIGIT);
            expect(result).toBeLessThanOrEqual(MAXIMUM_DIGIT);
        });
        it('should return the minimum value if the minimum and maximum values are equal', () => {
            minimum = maximum;
            const result = getRandomDigit(minimum, maximum);
            expect(result).toEqual(minimum);
        });
        it('should switch minimum and maximum values if the minimum value is greater than the maximum value', () => {
            const result = getRandomDigit(maximum, minimum);
            expect(result).toBeGreaterThanOrEqual(minimum);
            expect(result).toBeLessThanOrEqual(maximum);
        });
    });
});
