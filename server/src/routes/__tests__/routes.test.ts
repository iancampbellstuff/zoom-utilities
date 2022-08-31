// code under test
import { getRouterMap } from '../routes';

describe('routes', () => {
    describe('getRouterMap', () => {
        it('should get a router map', () => {
            const result = getRouterMap();
            expect(result['/meetings']).toBeDefined();
            expect(result['/recordings']).toBeDefined();
            expect(result['/users']).toBeDefined();
        });
    });
});
