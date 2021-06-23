// code under test
import {
    EBoundaryType,
    getBoundary,
    getPasscode,
    MAXIMUM_PASSCODE_LENGTH,
    MINIMUM_PASSCODE_LENGTH,
    normalizeLength
} from '../passcodeUtils';
import { getRandomNumber, MAXIMUM_DIGIT, MINIMUM_DIGIT } from '../numberUtils';

describe('passcodeUtils', () => {
    describe('normalizeLength', () => {
        let length: number;
        beforeEach(() => {
            length = getRandomNumber(
                MINIMUM_PASSCODE_LENGTH,
                MAXIMUM_PASSCODE_LENGTH
            );
        });
        it('should return the default minimum passcode length if the given length is less than the default minimum value', () => {
            const result = normalizeLength(MINIMUM_PASSCODE_LENGTH - 1);
            expect(result).toEqual(MINIMUM_PASSCODE_LENGTH);
        });
        it('should return the default maximum passcode length if the given length is greater than the default maximum value', () => {
            const result = normalizeLength(MAXIMUM_PASSCODE_LENGTH + 1);
            expect(result).toEqual(MAXIMUM_PASSCODE_LENGTH);
        });
        it('should return the given length if it is in range of the default minimum and maximum values', () => {
            const result = normalizeLength(length);
            expect(result).toEqual(length);
        });
    });
    describe('getBoundary', () => {
        let length: number;
        let firstDigit: number;
        let boundaryType: EBoundaryType;
        beforeEach(() => {
            length = MINIMUM_PASSCODE_LENGTH;
            firstDigit = MINIMUM_DIGIT;
            boundaryType = EBoundaryType.MINIMUM;
        });
        it('should get a maximum boundary value with the maximum possible length', () => {
            length = MAXIMUM_PASSCODE_LENGTH;
            firstDigit = MAXIMUM_DIGIT;
            boundaryType = EBoundaryType.MAXIMUM;
            const result = getBoundary(length, firstDigit, boundaryType);
            expect(result).toEqual(Number.MAX_SAFE_INTEGER);
        });
        it('should get a maximum boundary value', () => {
            length = MAXIMUM_PASSCODE_LENGTH - 1;
            firstDigit = MAXIMUM_DIGIT;
            boundaryType = EBoundaryType.MAXIMUM;
            const result = getBoundary(length, firstDigit, boundaryType);
            const stringResult = result.toString();
            expect(Number(stringResult.charAt(0))).toEqual(firstDigit);
            expect(stringResult).toHaveLength(length);
            expect(stringResult.substring(1)).toEqual('0'.repeat(length - 1));
        });
        it('should get a minimum boundary value', () => {
            const result = getBoundary(length, firstDigit, boundaryType);
            const stringResult = result.toString();
            expect(Number(stringResult.charAt(0))).toEqual(firstDigit);
            expect(stringResult).toHaveLength(length);
            expect(stringResult.substring(1)).toEqual('0'.repeat(length - 1));
        });
        it('should get a minimum boundary value by default', () => {
            const result = getBoundary(length, firstDigit, null as any);
            const stringResult = result.toString();
            expect(Number(stringResult.charAt(0))).toEqual(firstDigit);
            expect(stringResult).toHaveLength(length);
            expect(stringResult.substring(1)).toEqual('0'.repeat(length - 1));
        });
    });
    describe('getPasscode', () => {
        let length: number;
        let firstDigit: number;
        beforeEach(() => {
            length = MAXIMUM_PASSCODE_LENGTH;
            firstDigit = MAXIMUM_DIGIT;
        });
        it('should get a passcode', () => {
            const result = getPasscode(length, firstDigit);
            const stringResult = result.toString();
            expect(Number(stringResult.charAt(0))).toEqual(firstDigit);
            expect(stringResult).toHaveLength(length);
        });
        it('should get a passcode with default values', () => {
            const result = getPasscode();
            const stringResult = result.toString();
            expect(stringResult).toHaveLength(MINIMUM_PASSCODE_LENGTH);
        });
    });
});
