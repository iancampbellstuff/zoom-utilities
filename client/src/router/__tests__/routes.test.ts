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
                    }
                ]
            },
            {
                path: '/:catchAll(.*)*',
                component: expect.any(Function)
            }
        ]);
    });
});
