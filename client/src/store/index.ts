// externals
import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

// modules
import { IMeetingsState, meetingsModule } from './meetings';
import { IPasscodeState, passcodeModule } from './passcode';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface IStore {
    // Define your own store structure, using submodules if needed
    // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
    meetings: IMeetingsState;
    passcode: IPasscodeState;
}

export default store(function({ Vue }) {
    Vue.use(Vuex);

    const Store = new Vuex.Store<IStore>({
        modules: {
            meetingsModule,
            passcodeModule
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: !!process.env.DEV
    });

    return Store;
});
