import { MutationTree } from 'vuex';
import { IPasscodeState } from './state';

const resetFirstDigit = (state: IPasscodeState) => {
    delete state.firstDigit;
};

const resetLength = (state: IPasscodeState) => {
    delete state.length;
};

const resetPasscode = (state: IPasscodeState) => {
    delete state.passcode;
};

const mutation: MutationTree<IPasscodeState> = {
    resetAll(state: IPasscodeState) {
        resetFirstDigit(state);
        resetLength(state);
        resetPasscode(state);
    },
    resetFirstDigit,
    resetLength,
    resetPasscode,
    setFirstDigit(state: IPasscodeState, firstDigit: number) {
        if (firstDigit) {
            state.firstDigit = firstDigit;
        }
    },
    setLength(state: IPasscodeState, length: number) {
        if (length) {
            state.length = length;
        }
    },
    setPasscode(state: IPasscodeState, passcode: number) {
        if (passcode) {
            state.passcode = passcode;
        }
    }
};

export default mutation;
