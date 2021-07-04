import { getRandomDigit, getRandomNumber, normalizeDigit } from './numberUtils';

export const MINIMUM_PASSCODE_LENGTH = 4;
// https://support.zoom.us/hc/en-us/articles/204669759-Room-Passcode-for-Zoom-Rooms
export const MAXIMUM_PASSCODE_LENGTH = 16;

export enum EBoundaryType {
    MINIMUM,
    MAXIMUM
}

export const normalizeLength = (length: number): number => {
    if (length < MINIMUM_PASSCODE_LENGTH) {
        length = MINIMUM_PASSCODE_LENGTH;
    } else if (length > MAXIMUM_PASSCODE_LENGTH) {
        length = MAXIMUM_PASSCODE_LENGTH;
    }
    return length;
};

export const getBoundary = (
    length: number,
    firstDigit: number,
    boundaryType: EBoundaryType
): number => {
    length = normalizeLength(length);
    firstDigit = normalizeDigit(firstDigit);
    let boundary: number;
    switch (boundaryType) {
        case EBoundaryType.MAXIMUM: {
            boundary =
                length === MAXIMUM_PASSCODE_LENGTH
                    ? Number.MAX_SAFE_INTEGER
                    : Number(`${firstDigit}${'9'.repeat(length - 1)}`);
            break;
        }
        default:
        case EBoundaryType.MINIMUM: {
            boundary = Number(`${firstDigit}${'0'.repeat(length - 1)}`);
            break;
        }
    }
    return boundary;
};

export const getPasscode = (
    length: number = MINIMUM_PASSCODE_LENGTH,
    firstDigit: number = getRandomDigit()
): number => {
    length = normalizeLength(length);
    firstDigit = normalizeDigit(firstDigit);
    const minimum = getBoundary(length, firstDigit, EBoundaryType.MINIMUM);
    const maximum = getBoundary(length, firstDigit, EBoundaryType.MAXIMUM);
    const passcode = getRandomNumber(minimum, maximum);
    return passcode;
};
