const { beforeAll } = require('@jest/globals');
const nock = require('nock');

beforeAll(() => {
    nock.disableNetConnect();
});
