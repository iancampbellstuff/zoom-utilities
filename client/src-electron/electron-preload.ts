import { existsSync } from 'fs';
import { spawn } from 'child_process';
import { resolve } from 'path';

const CONFIG_FILE = resolve(__dirname, '..', 'config.json');
const INDEX_FILE = resolve(__dirname, '..', 'server/src/index.js');

const filesExist = () => {
    const filesExist = [CONFIG_FILE, INDEX_FILE].every((file) => {
        const fileExists = existsSync(file);
        if (!fileExists) {
            const message = `The file ${file} does not exist!`;
            console.error(message);
        }
        return fileExists;
    });
    return filesExist;
};
const startServer = () => {
    if (filesExist()) {
        const command = `node ${INDEX_FILE}`;
        console.log(`Executing command ${command}...`);
        try {
            process.env.CONFIG_FILE = CONFIG_FILE;
            spawn(command, { shell: true, stdio: 'inherit' });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
};

startServer();
