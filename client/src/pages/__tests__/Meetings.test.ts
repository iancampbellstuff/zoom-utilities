// test-related
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
// externals
import Quasar from 'quasar';
import Vuex from 'vuex';
// code under test
import Meetings from '../Meetings.vue';
import getters from '../../store/passcode/getters';

const localVue = createLocalVue();
localVue.use(Quasar);
localVue.use(Vuex);

describe('Meetings', () => {
    let store;
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                meetingsModule: {
                    getters,
                    state: {}
                }
            }
        });
        wrapper = mount(Meetings, {
            localVue,
            store,
            stubs: [
                'q-btn',
                'q-form',
                'q-icon',
                'q-input',
                'q-page',
                'q-popup-edit',
                'q-select',
                'q-table',
                'q-td',
                'q-toolbar-title',
                'q-tr'
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
