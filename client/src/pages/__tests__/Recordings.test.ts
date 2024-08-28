import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Quasar from 'quasar';
import { useRecordingsStore } from '../../stores';
import Recordings from '../Recordings.vue';

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

describe('Recordings', () => {
    let store;
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        store = useRecordingsStore(createTestingPinia());
        wrapper = mount(Recordings, {
            global: {
                plugins: [Quasar]
            },
            store,
            stubs: [
                'q-btn',
                'q-card-actions',
                'q-card-section',
                'q-card',
                'q-dialog',
                'q-form',
                'q-icon',
                'q-input',
                'q-page',
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
