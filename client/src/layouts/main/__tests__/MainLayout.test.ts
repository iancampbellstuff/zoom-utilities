import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { mount, VueWrapper } from '@vue/test-utils';
import Quasar from 'quasar';
import MainLayout from '../MainLayout.vue';
import routes from '../../../router/routes';

describe('MainLayout', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: routes[0].children as RouteRecordRaw[]
    });
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        wrapper = mount(MainLayout, {
            global: {
                plugins: [Quasar, createTestingPinia(), router]
            },
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
