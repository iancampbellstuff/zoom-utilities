// code under test
import getters from '../getters';
import { IPasscodeState } from '../state';

describe('getters', () => {
    let state: IPasscodeState;
    beforeEach(() => {
        state = {
            firstDigit: 1,
            length: 4,
            passcode: 1234
        };
    });
    describe('getFirstDigit', () => {
        it('should get value from state', () => {
            const result = (getters as any).getFirstDigit(state);
            expect(result).toEqual(state.firstDigit);
        });
    });
    describe('getLength', () => {
        it('should get value from state', () => {
            const result = (getters as any).getLength(state);
            expect(result).toEqual(state.length);
        });
    });
    describe('getPasscode', () => {
        it('should get value from state', () => {
            const result = (getters as any).getPasscode(state);
            expect(result).toEqual(state.passcode);
        });
    });
});
