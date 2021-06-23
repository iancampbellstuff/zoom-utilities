import { mount, Wrapper } from '@vue/test-utils';
// code under test
import Error404 from '../Error404.vue';

describe('Error404', () => {
    let wrapper: Wrapper<Error404>;
    beforeEach(() => {
        wrapper = mount(Error404, {
            stubs: ['q-btn', 'router-view']
        });
    });
    test('is a Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});
