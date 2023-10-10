import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Quasar from 'quasar';
import { usePasscodeStore } from '../../stores';
import Passcode from '../Passcode.vue';

describe('Passcode', () => {
    let store;
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        store = usePasscodeStore(createTestingPinia());
        wrapper = mount(Passcode, {
            global: {
                plugins: [Quasar]
            },
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
