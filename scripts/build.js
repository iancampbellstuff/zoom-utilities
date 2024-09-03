const { execSync } = require('child_process');

/**
 * Build zoom-utilities.
 *
 * Example usage:
 * node build.js --electron
 * node build.js --pwa
 * node build.js # "--pwa" is the default option
 */

const ARGS = process.argv.slice(2);
const SCRIPT = {
    CLIENT: 'build-client',
    SERVER: 'build-server'
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
        execSync(command, { stdio: 'inherit' });
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
    runScript(SCRIPT.SERVER);
    runScript(SCRIPT.CLIENT, flag);
};
const build = () => {
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

build();
