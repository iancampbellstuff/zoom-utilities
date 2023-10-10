const { beforeAll } = require('@jest/globals');
const {
    installQuasarPlugin
} = require('@quasar/quasar-app-extension-testing-unit-jest');
const nock = require('nock');

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

beforeAll(() => {
    nock.disableNetConnect();
});
