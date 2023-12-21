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
            baseURL = undefined;
            const result = combineURLs(baseURL, relativeURL);
            expect(result).toBe('');
        });
        it('should handle a falsy relative URL', () => {
            relativeURL = null;
            const result = combineURLs(baseURL, relativeURL);
            expect(result).toEqual(baseURL);
        });
        it('should handle falsy arguments', () => {
            baseURL = undefined;
            relativeURL = undefined;
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
                    'content-type': 'application/json',
                    'User-Agent': 'Zoom-api-Jwt-Request',
                    Authorization: `Bearer ${token}`
                },
                method,
                url
            });
        });
        it('should handle a falsy argument', () => {
            requestOptions = undefined;
            const result = getRequestConfig(requestOptions);
            expect(result).toEqual({
                headers: {
                    'content-type': 'application/json',
                    'User-Agent': 'Zoom-api-Jwt-Request',
                    Authorization: 'Bearer undefined'
                }
            });
        });
    });
    describe('getRequest', () => {
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
        it('should handle a falsy argument', () => {
            requestOptions = undefined;
            const result = getRequest(requestOptions);
            expect(result).toBeInstanceOf(Promise);
        });
    });
});
