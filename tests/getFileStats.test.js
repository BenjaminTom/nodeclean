/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const {assert} = require('chai');
const mkdirp = require('mkdirp');
const {getFileStats, fileStats} = require('../lib/helpers');

const {PWD} = process.env;

const testFilePaths = [`${PWD}/tests/apps/app_1/node_modules`];

describe('Get File Stats', () => {
    beforeEach(() => {
        testFilePaths.forEach(path => {
            mkdirp(path);
        });
    });

    it(`Folder path matches`, async () => {
        const stats = await getFileStats(testFilePaths[0]);
        assert.strictEqual(stats.filePath, testFilePaths[0]);
    });

    it(`Folder is directory`, async () => {
        const stats = await getFileStats(testFilePaths[0]);
        assert.strictEqual(stats.isDirectory, true);
    });
    it(`Stats returned with mtime key`, async () => {
        const stats = await getFileStats(testFilePaths[0]);
        assert.hasAnyKeys(stats.data, ['mtimeMs']);
    });
    it('fileStats returns object with mtimeMs key', async () => {
        const stats = await fileStats(testFilePaths[0]);
        assert.hasAnyKeys(stats, ['mtimeMs']);
    });
});
