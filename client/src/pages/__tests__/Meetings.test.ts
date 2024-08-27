import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Quasar from 'quasar';
import { useMeetingsStore } from '../../stores';
import Meetings from '../Meetings.vue';

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

describe('Meetings', () => {
    let store;
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        store = useMeetingsStore(createTestingPinia());
        wrapper = mount(Meetings, {
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
    // TODO: "/* istanbul ignore next */" isn't working in the generated snapshot
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});
