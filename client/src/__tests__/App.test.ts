import { mount, VueWrapper } from '@vue/test-utils';
// code under test
import App from '../App.vue';

describe('App', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(App, {
            stubs: ['router-view']
        });
    });
    test('is a Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});
