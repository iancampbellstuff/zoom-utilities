import { Notify } from 'quasar';

export interface IToastOptions {
    color?: string;
    message: string;
    textColor?: string;
    timeout: number;
}

export enum ELogLevel {
    ERROR = 'error',
    LOG = 'log',
    WARN = 'warn'
}

export const getToastOptions = (
    message: string,
    logLevel: ELogLevel
): IToastOptions => {
    const options: IToastOptions = {
        message,
        timeout: 1000
    };
    switch (logLevel) {
        case ELogLevel.WARN: {
            options.color = 'orange';
            options.textColor = 'white';
            break;
        }
        case ELogLevel.ERROR: {
            options.color = 'red';
            options.textColor = 'white';
            break;
        }
    }
    return options;
};

export const toast = (message: string, logLevel: ELogLevel = ELogLevel.LOG) => {
    if (message) {
        const options = getToastOptions(message, logLevel);
        Notify.create(options);
    }
};
