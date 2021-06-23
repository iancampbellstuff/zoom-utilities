import { toast } from './messageUtils';

export const copyInput = (
    inputRef: HTMLInputElement | HTMLTextAreaElement,
    message: string,
    callback: (message: string) => void = toast
) => {
    if (inputRef && message) {
        inputRef.select();
        document.execCommand('copy');
        inputRef.blur();
        callback(message);
    }
};
