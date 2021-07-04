import { mount, Wrapper } from '@vue/test-utils';
// code under test
import Index from '../Index.vue';

describe('Index', () => {
    let wrapper: Wrapper<any>;
    beforeEach(() => {
        wrapper = mount(Index, {
            stubs: ['q-page', 'router-view']
        });
    });
    test('is a Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });
    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});
