/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const {assert} = require('chai');
const mkdirp = require('mkdirp');
const {mapDir} = require('../lib/helpers');

const {PWD} = process.env;

const testFilePaths = [
    `${PWD}/tests/apps/app_1/node_modules`,
    `${PWD}/tests/apps/app_2/api/node_modules`,
    `${PWD}/tests/apps/app_3/api/auth/node_modules`
];

describe('Map Directory Depth Check', () => {
    beforeEach(() => {
        testFilePaths.forEach(path => {
            mkdirp(path);
        });
    });

    it('Check folder with no node_module', async () => {
        assert.lengthOf(await mapDir(`${PWD}/tests/`, 1), -0);
    });

    it('Check Depth Of One', async () => {
        assert.lengthOf(await mapDir(`${PWD}/tests/apps`, 1), 1);
    });

    it('Check Depth Of Two', async () => {
        assert.lengthOf(await mapDir(`${PWD}/tests/apps`, 2), 2);
    });

    it('Check Depth Of Three', async () => {
        assert.lengthOf(await mapDir(`${PWD}/tests/apps`, 3), 3);
    });
});
