import { ActionTree } from 'vuex';
import { IStore } from '../index';
import { IPasscodeState } from './state';

const actions: ActionTree<IPasscodeState, IStore> = {
    someAction(/* context */) {
        // your code
    }
};

export default actions;
