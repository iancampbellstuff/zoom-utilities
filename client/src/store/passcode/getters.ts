import { GetterTree } from 'vuex';
import { IStore } from '../index';
import { IPasscodeState } from './state';

const getters: GetterTree<IPasscodeState, IStore> = {
    getFirstDigit(state: IPasscodeState) {
        return state.firstDigit;
    },
    getLength(state: IPasscodeState) {
        return state.length;
    },
    getPasscode(state: IPasscodeState) {
        return state.passcode;
    }
};

export default getters;
