import { Notify } from 'quasar';
import { ELogLevel, getToastOptions, toast } from '../messageUtils';

describe('messageUtils', () => {
    describe('getToastOptions', () => {
        let message: string;
        beforeEach(() => {
            message = 'test message';
        });
        it('should get toast options for log level debug', () => {
            const result = getToastOptions(message, ELogLevel.LOG);
            expect(result).toEqual({
                message,
                timeout: 1000
            });
        });
        it('should get toast options for log level warning', () => {
            const result = getToastOptions(message, ELogLevel.WARN);
            expect(result).toEqual({
                color: 'orange',
                message,
                textColor: 'white',
                timeout: 1000
            });
        });
        it('should get toast options for log level error', () => {
            const result = getToastOptions(message, ELogLevel.ERROR);
            expect(result).toEqual({
                color: 'red',
                message,
                textColor: 'white',
                timeout: 1000
            });
        });
    });
    // TODO: resolve the error "Property `create` does not exist in the provided object"
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('toast', () => {
        let message: string;
        let create: jest.SpyInstance;
        beforeEach(() => {
            message = 'test message';
            create = jest.spyOn(Notify, 'create').mockImplementation(jest.fn());
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should toast for default log level', () => {
            toast(message);
            expect(create).toHaveBeenCalledWith({
                message,
                timeout: 1000
            });
        });
        it('should toast for log level debug', () => {
            toast(message, ELogLevel.LOG);
            expect(create).toHaveBeenCalledWith({
                message,
                timeout: 1000
            });
        });
        it('should toast for log level warning', () => {
            toast(message, ELogLevel.WARN);
            expect(create).toHaveBeenCalledWith({
                color: 'orange',
                message,
                textColor: 'white',
                timeout: 1000
            });
        });
        it('should toast for log level error', () => {
            toast(message, ELogLevel.ERROR);
            expect(create).toHaveBeenCalledWith({
                color: 'red',
                message,
                textColor: 'white',
                timeout: 1000
            });
        });
        it('should do nothing if message is falsy', () => {
            toast(null as any);
            expect(create).not.toHaveBeenCalled();
        });
    });
});
