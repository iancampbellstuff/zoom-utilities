import { toast } from './messageUtils';

export const copyInput = (
    value: string | number,
    message: string,
    callback: (message: string) => void = toast
) => {
    const textArea = document.createElement('textarea');
    textArea.value = `${value}`;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((resolve, reject) => {
        const result = document.execCommand('copy');
        textArea.remove();
        if (result) {
            callback(message);
            resolve();
        } else {
            reject();
        }
    });
};
