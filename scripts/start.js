const { spawn } = require('child_process');

/**
 * Start zoom-utilities.
 *
 * Example usage:
 * node start.js --electron
 * node start.js --pwa
 * node start.js # "--pwa" is the default option
 */

const ARGS = process.argv.slice(2);
const SCRIPT = {
    CLIENT: 'start-client',
    SERVER: 'start-server'
};
const CLIENT_SCRIPT_FLAG = {
    ELECTRON: '--electron',
    PWA: '--pwa'
};

const exit = (error) => {
    console.error(error);
    process.exit(1);
};
const runScript = (script, flag) => {
    let command = `npm run ${script}`;
    if (flag) {
        command = [command, '--', '--', flag].join(' ');
    }
    console.log(`Executing command ${command}...`);
    try {
        spawn(command, { shell: true, stdio: 'inherit' });
    } catch (error) {
        exit(error);
    }
};
const handleFlag = (flag) => {
    if (!Object.values(CLIENT_SCRIPT_FLAG).includes(flag)) {
        const message = `Error: Invalid flag ${flag}!`;
        const error = new EvalError(message);
        exit(error);
    }
    runScript(SCRIPT.CLIENT, flag);
    runScript(SCRIPT.SERVER);
};
const start = () => {
    switch (ARGS.length) {
        case 0: {
            Object.values(SCRIPT).forEach((script) => {
                runScript(script);
            });
            break;
        }
        case 1: {
            const flag = ARGS[0];
            handleFlag(flag);
            break;
        }
        default: {
            const message = 'Error: Invalid arguments!';
            const error = new RangeError(message);
            exit(error);
        }
    }
};

start();
