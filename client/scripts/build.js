const { execSync } = require('child_process');

/**
 * Build the zoom-utilities client.
 *
 * Example usage:
 * node build.js --electron
 * node build.js --pwa
 * node build.js # "--pwa" is the default option
 */

const ARGS = process.argv.slice(2);
const SCRIPT = {
    ELECTRON: 'build-electron',
    PWA: 'build-pwa'
};
const SCRIPT_MAP = {
    '--electron': SCRIPT.ELECTRON,
    '--pwa': SCRIPT.PWA
};

const exit = (error) => {
    console.error(error);
    process.exit(1);
};
const runScript = (script) => {
    const command = `npm run ${script}`;
    console.log(`Executing command ${command}...`);
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        exit(error);
    }
};
const handleFlag = (flag) => {
    const script = SCRIPT_MAP[flag];
    if (!script) {
        const message = `Error: Invalid flag ${flag}!`;
        const error = new EvalError(message);
        exit(error);
    }
    runScript(script);
};
const build = () => {
    switch (ARGS.length) {
        case 0: {
            const defaultScript = SCRIPT.PWA;
            runScript(defaultScript);
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
