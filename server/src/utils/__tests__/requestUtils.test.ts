// externals
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from 'express';
// constants
import { BASE_ROUTE } from '../../constants';
// code under test
import { getUrl, handleError } from '../requestUtils';
// utils
import { combineURLs } from '../../../../common/src';

describe('requestUtils', () => {
    describe('getUrl', () => {
        let path: string;
        beforeEach(() => {
            path = 'users';
        });
        it('should get a URL', () => {
            const result = getUrl(path);
            expect(result).toEqual(combineURLs(BASE_ROUTE, path));
        });
        it('should get a URL with query parameters', () => {
            const result = getUrl(path, [
                {
                    key: 'test',
                    value: 'value'
                }
            ]);
            expect(result).toEqual(
                combineURLs(BASE_ROUTE, path) + '?test=value'
            );
        });
        it('should get a URL with a preceding slash', () => {
            const result = getUrl(`/${path}`);
            expect(result).toEqual(combineURLs(BASE_ROUTE, path));
        });
        it('should handle a falsy argument', () => {
            const result = getUrl(null);
            expect(result).toEqual(BASE_ROUTE);
        });
    });
    describe('handleError', () => {
        const errorMessage = 'test error message';
        const statusCode = 400;
        const data = {
            test: 'data'
        };
        const getAxiosError = (
            errorMessage: string,
            status: number,
            data: any
        ): AxiosError => {
            const axiosError = new Error(errorMessage) as AxiosError;
            axiosError.response = {
                data,
                status
            } as AxiosResponse;
            return axiosError;
        };
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response;
        beforeEach(() => {
            send = jest.fn();
            status = jest.fn(() => ({ send }));
            response = {
                status
            } as any;
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should handle an axios error with a response', () => {
            const axiosError = getAxiosError(errorMessage, statusCode, data);
            handleError(axiosError, response);
            expect(status).toHaveBeenCalledWith(statusCode);
            expect(send).toHaveBeenCalledWith(data);
        });
        it('should handle an axios error without a response', () => {
            const axiosError = getAxiosError(errorMessage, statusCode, data);
            delete axiosError.response;
            handleError(axiosError, response);
            expect(status).toHaveBeenCalledWith(500);
            expect(send).toHaveBeenCalledWith(errorMessage);
        });
        it('should handle an axios error without a response and error message', () => {
            const axiosError = getAxiosError(undefined, statusCode, data);
            delete axiosError.response;
            handleError(axiosError, response);
            expect(status).toHaveBeenCalledWith(500);
            expect(send).toHaveBeenCalledWith('An unknown error occurred!');
        });
        it('should handle a falsy axios error argument', () => {
            handleError(null, response);
            expect(status).toHaveBeenCalledWith(500);
            expect(send).toHaveBeenCalledWith('An unknown error occurred!');
        });
        it('should handle a falsy response argument', () => {
            const axiosError = getAxiosError(errorMessage, statusCode, data);
            handleError(axiosError, null);
            expect(status).not.toHaveBeenCalled();
            expect(send).not.toHaveBeenCalled();
        });
        it('should handle falsy arguments', () => {
            handleError(null, null);
            expect(status).not.toHaveBeenCalled();
            expect(send).not.toHaveBeenCalled();
        });
    });
});
