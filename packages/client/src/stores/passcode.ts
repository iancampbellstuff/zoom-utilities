import { defineStore } from 'pinia';

export interface IPasscodeState {
    firstDigit?: number;
    length?: number;
    passcode?: number;
}

export const usePasscodeStore = defineStore({
    id: 'passcode',
    state: (): IPasscodeState => ({}),
    actions: {
        resetAll() {
            this.resetFirstDigit();
            this.resetLength();
            this.resetPasscode();
        },
        resetFirstDigit() {
            delete this.firstDigit;
        },
        resetLength() {
            delete this.length;
        },
        resetPasscode() {
            delete this.passcode;
        },
        setFirstDigit(firstDigit?: number) {
            if (firstDigit) {
                this.firstDigit = firstDigit;
            }
        },
        setLength(length?: number) {
            if (length) {
                this.length = length;
            }
        },
        setPasscode(passcode?: number) {
            if (passcode) {
                this.passcode = passcode;
            }
        }
    },
    getters: {
        getFirstDigit(state) {
            return state.firstDigit;
        },
        getLength(state) {
            return state.length;
        },
        getPasscode(state) {
            return state.passcode;
        }
    }
});
