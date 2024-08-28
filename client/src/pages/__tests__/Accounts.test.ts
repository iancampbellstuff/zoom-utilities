import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Quasar from 'quasar';
import { usePasscodeStore } from '../../stores';
import Accounts from '../Accounts.vue';

jest.mock('quasar', () => {
    const Notify = {
        create: jest.fn()
    };
    const useQuasar = () => ({
        loading: {
            hide: jest.fn(),
            show: jest.fn()
        }
    });
    return {
        ...jest.requireActual('quasar'),
        Notify,
        useQuasar
    };
});

describe('Accounts', () => {
    let store;
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        store = usePasscodeStore(createTestingPinia());
        wrapper = mount(Accounts, {
            global: {
                plugins: [Quasar]
            },
            store,
            stubs: [
                'q-btn',
                'q-form',
                'q-icon',
                'q-input',
                'q-page',
                'q-table',
                'q-td',
                'q-toolbar-title',
                'q-toolbar-title',
                'q-tr'
            ]
        });
    });
    test('is a Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    // TODO: "/* istanbul ignore next */" isn't working in the generated snapshot
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});
