import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vuex from 'vuex';
// code under test
import Passcode from '../Passcode.vue';
import getters from '../../store/passcode/getters';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Passcode', () => {
    let store;
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                passcodeModule: {
                    getters,
                    state: {}
                }
            }
        });
        wrapper = mount(Passcode, {
            localVue,
            store,
            stubs: [
                'q-btn-group',
                'q-btn',
                'q-form',
                'q-icon',
                'q-input',
                'q-page',
                'q-toolbar-title',
                'q-tooltip',
                'router-view'
            ]
        });
    });
    test('is a Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});
