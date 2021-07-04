/* eslint-disable jest/prefer-to-have-length */
// code under test
import mutations from '../mutations';
import { IPasscodeState } from '../state';

describe('mutations', () => {
    let state: IPasscodeState;
    beforeEach(() => {
        state = {
            firstDigit: 1,
            length: 4,
            passcode: 1234
        };
    });
    describe('resetAll', () => {
        it('should reset all state values', () => {
            (mutations as any).resetAll(state);
            expect(state).toEqual({});
        });
    });
    describe('resetFirstDigit', () => {
        it('should reset state value', () => {
            (mutations as any).resetFirstDigit(state);
            expect(state.firstDigit).toBeUndefined();
        });
    });
    describe('resetLength', () => {
        it('should reset state value', () => {
            (mutations as any).resetLength(state);
            expect(state.length).toBeUndefined();
        });
    });
    describe('resetPasscode', () => {
        it('should reset state value', () => {
            (mutations as any).resetPasscode(state);
            expect(state.passcode).toBeUndefined();
        });
    });
    describe('setFirstDigit', () => {
        let firstDigit: number;
        beforeEach(() => {
            firstDigit = 2;
        });
        it('should set state value', () => {
            expect(state.firstDigit).not.toEqual(firstDigit);
            (mutations as any).setFirstDigit(state, firstDigit);
            expect(state.firstDigit).toEqual(firstDigit);
        });
    });
    describe('setLength', () => {
        let length: number;
        beforeEach(() => {
            length = 2;
        });
        it('should set state value', () => {
            expect(state.length).not.toEqual(length);
            (mutations as any).setLength(state, length);
            expect(state.length).toEqual(length);
        });
    });
    describe('setPasscode', () => {
        let passcode: number;
        beforeEach(() => {
            passcode = 2;
        });
        it('should set state value', () => {
            expect(state.passcode).not.toEqual(passcode);
            (mutations as any).setPasscode(state, passcode);
            expect(state.passcode).toEqual(passcode);
        });
    });
});
