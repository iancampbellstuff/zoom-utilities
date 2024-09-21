// code under test
import { combineURLs, getRequestConfig, getRequest } from '../requestUtils';

// types
import { IRequestOptions } from '../../types';

describe('requestUtils', () => {
    describe('combineURLs', () => {
        let baseURL: string;
        let relativeURL: string;
        beforeEach(() => {
            baseURL = 'http://localhost:4000';
            relativeURL = 'users';
        });
        it('should combine URLs', () => {
            const result = combineURLs(baseURL, relativeURL);
            expect(result).toBe(`${baseURL}/${relativeURL}`);
        });
        it('should combine URLs with extra slashes', () => {
            const result = combineURLs(`${baseURL}/`, `/${relativeURL}`);
            expect(result).toBe(`${baseURL}/${relativeURL}`);
        });
        it('should handle a falsy base URL', () => {
            baseURL = undefined as any;
            const result = combineURLs(baseURL, relativeURL);
            expect(result).toBe('');
        });
        it('should handle a falsy relative URL', () => {
            relativeURL = null as any;
            const result = combineURLs(baseURL, relativeURL);
            expect(result).toEqual(baseURL);
        });
        it('should handle falsy arguments', () => {
            baseURL = undefined as any;
            relativeURL = undefined as any;
            const result = combineURLs(baseURL, relativeURL);
            expect(result).toBe('');
        });
    });
    describe('getRequestConfig', () => {
        let requestOptions: IRequestOptions;
        beforeEach(() => {
            requestOptions = {
                data: {},
                method: 'GET',
                token: 'ABCDEF123456',
                url: 'http://localhost:4000/users'
            };
        });
        it('should get request config', () => {
            const result = getRequestConfig(requestOptions);
            const { data, method, token, url } = requestOptions;
            expect(result).toEqual({
                data,
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method,
                url
            });
        });
        it('should handle a falsy argument', () => {
            requestOptions = undefined as any;
            const result = getRequestConfig(requestOptions);
            expect(result).toEqual({
                data: undefined,
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                method: undefined,
                params: undefined,
                url: undefined
            });
        });
    });
    // TODO: resolve error "Nock: Disallowed net connect for "localhost:4000/users""
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('getRequest', () => {
        let requestOptions: IRequestOptions;
        beforeEach(() => {
            requestOptions = {
                data: {},
                method: 'GET',
                token: 'ABCDEF123456',
                url: 'http://localhost:4000/users'
            };
        });
        it('should get a request', () => {
            const result = getRequest(requestOptions);
            expect(result).toBeInstanceOf(Promise);
        });
    });
});
