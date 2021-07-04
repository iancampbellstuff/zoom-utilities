import { mount, Wrapper } from '@vue/test-utils';
// code under test
import MainLayout from '../MainLayout.vue';

describe('MainLayout', () => {
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        wrapper = mount(MainLayout, {
            stubs: [
                'q-btn-group',
                'q-btn',
                'q-footer',
                'q-form',
                'q-header',
                'q-icon',
                'q-input',
                'q-layout',
                'q-page-container',
                'q-page',
                'q-route-tab',
                'q-tab',
                'q-tabs',
                'q-toolbar-title',
                'q-toolbar',
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
