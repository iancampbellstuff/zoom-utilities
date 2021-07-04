import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import { IPasscodeState, passcodeModule } from './passcode';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface IStore {
    // Define your own store structure, using submodules if needed
    // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
    passcode: IPasscodeState;
}

export default store(function({ Vue }) {
    Vue.use(Vuex);

    const Store = new Vuex.Store<IStore>({
        modules: {
            passcodeModule
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: !!process.env.DEV
    });

    return Store;
});
