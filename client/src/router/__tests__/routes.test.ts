// code under test
import routes from '../routes';

describe('routes', () => {
    it('should define routes', () => {
        expect(routes).toEqual([
            {
                path: '/',
                component: expect.any(Function),
                children: [
                    { path: '', component: expect.any(Function) },
                    {
                        path: '/home',
                        component: expect.any(Function)
                    },
                    {
                        path: '/passcode',
                        component: expect.any(Function)
                    },
                    {
                        path: '/meetings',
                        component: expect.any(Function)
                    },
                    {
                        path: '/recordings',
                        component: expect.any(Function)
                    },
                    {
                        path: '/accounts',
                        component: expect.any(Function)
                    }
                ]
            },
            {
                path: '/:pathMatch(.*)*',
                redirect: '/'
            }
        ]);
    });
});
