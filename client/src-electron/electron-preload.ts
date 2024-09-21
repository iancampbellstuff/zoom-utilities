import { existsSync } from 'fs';
import { resolve } from 'path';

const CONFIG_FILE = resolve(__dirname, '../config.json');

const setConfigFile = () => {
    const fileExists = existsSync(CONFIG_FILE);
    if (fileExists) {
        process.env.CONFIG_FILE = CONFIG_FILE;
    } else {
        const message = `The file ${CONFIG_FILE} does not exist!`;
        console.error(message);
    }
};

setConfigFile();
