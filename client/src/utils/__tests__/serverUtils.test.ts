// code under test
import { LOCAL_BASE_ROUTE, getUrl } from '../serverUtils';
// utils
import { combineURLs } from '../../../../common/src/utils';

describe('serverUtils', () => {
    describe('getUrl', () => {
        let path: string;
        beforeEach(() => {
            path = 'users';
        });
        it('should get a URL', () => {
            const result = getUrl(path);
            expect(result).toEqual(combineURLs(LOCAL_BASE_ROUTE, path));
        });
        it('should get a URL with a preceding slash', () => {
            const result = getUrl(`/${path}`);
            expect(result).toEqual(combineURLs(LOCAL_BASE_ROUTE, path));
        });
        it('should handle a falsy argument', () => {
            const result = getUrl('');
            expect(result).toEqual(LOCAL_BASE_ROUTE);
        });
    });
});
