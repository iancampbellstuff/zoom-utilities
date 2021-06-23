// code under test
import { copyInput } from '../copyUtils';
import * as messageUtils from '../messageUtils';

describe('copyUtils', () => {
    let inputRef: HTMLInputElement | HTMLTextAreaElement;
    let select: jest.SpyInstance;
    let blur: jest.SpyInstance;
    let message: string;
    let execCommand: jest.SpyInstance;
    let toast: jest.SpyInstance;
    beforeEach(() => {
        inputRef = document.createElement('input');
        select = jest.spyOn(inputRef, 'select').mockImplementation(jest.fn());
        blur = jest.spyOn(inputRef, 'blur').mockImplementation(jest.fn());
        message = 'test message';
        execCommand = jest.fn();
        document.execCommand = execCommand as any;
        toast = jest.spyOn(messageUtils, 'toast').mockImplementation(jest.fn());
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should copy input', () => {
        copyInput(inputRef, message);
        expect(select).toHaveBeenCalled();
        expect(execCommand).toHaveBeenCalledWith('copy');
        expect(blur).toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(message);
    });
    it('should copy textarea input', () => {
        inputRef = document.createElement('textarea');
        select = jest.spyOn(inputRef, 'select').mockImplementation(jest.fn());
        blur = jest.spyOn(inputRef, 'blur').mockImplementation(jest.fn());
        copyInput(inputRef, message);
        expect(select).toHaveBeenCalled();
        expect(execCommand).toHaveBeenCalledWith('copy');
        expect(blur).toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(message);
    });
    it('should copy input and use a provided callback', () => {
        const callback = jest.fn((message: string) => {});
        copyInput(inputRef, message, callback);
        expect(select).toHaveBeenCalled();
        expect(execCommand).toHaveBeenCalledWith('copy');
        expect(blur).toHaveBeenCalled();
        expect(toast).not.toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(message);
    });
    it('should do nothing if input is falsy', () => {
        copyInput(null as any, message);
        expect(select).not.toHaveBeenCalled();
        expect(execCommand).not.toHaveBeenCalled();
        expect(blur).not.toHaveBeenCalled();
        expect(toast).not.toHaveBeenCalled();
    });
    it('should do nothing if message is falsy', () => {
        copyInput(inputRef, null as any);
        expect(select).not.toHaveBeenCalled();
        expect(execCommand).not.toHaveBeenCalled();
        expect(blur).not.toHaveBeenCalled();
        expect(toast).not.toHaveBeenCalled();
    });
});
