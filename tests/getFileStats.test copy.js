/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const {assert} = require('chai');
const mkdirp = require('mkdirp');
const {getDateXDays} = require('../lib/helpers');

const {PWD} = process.env;

const testFilePaths = [`${PWD}/tests/apps/app_1/node_modules`];

describe('Get Date In X Days', () => {
    it(`Match date 30 days ago (backward)`, () => {
        const date = new Date();
        const dayAgo30 = date.setDate(date.getDate() - 30);
        const iso = new Date(dayAgo30).toISOString().split('T')[0];

        const daysAgoFunc = getDateXDays(30, 'backward');
        const daysAgoiso = new Date(daysAgoFunc).toISOString().split('T')[0];

        assert.strictEqual(daysAgoiso, iso);
    });

    it(`Match date 30 days ago (backwards)`, () => {
        const date = new Date();
        const dayAgo30 = date.setDate(date.getDate() - 30);
        const iso = new Date(dayAgo30).toISOString().split('T')[0];

        const daysAgoFunc = getDateXDays(30, 'backwards');
        const daysAgoiso = new Date(daysAgoFunc).toISOString().split('T')[0];

        assert.strictEqual(daysAgoiso, iso);
    });

    it(`Match date 30 days in future (forward)`, () => {
        const date = new Date();
        const dayAgo30 = date.setDate(date.getDate() + 30);
        const iso = new Date(dayAgo30).toISOString().split('T')[0];

        const daysAgoFunc = getDateXDays(30, 'forward');
        const daysAgoiso = new Date(daysAgoFunc).toISOString().split('T')[0];

        assert.strictEqual(daysAgoiso, iso);
    });

    it(`Match date 30 days in future (forwards)`, () => {
        const date = new Date();
        const dayAgo30 = date.setDate(date.getDate() + 30);
        const iso = new Date(dayAgo30).toISOString().split('T')[0];

        const daysAgoFunc = getDateXDays(30, 'forwards');
        const daysAgoiso = new Date(daysAgoFunc).toISOString().split('T')[0];

        assert.strictEqual(daysAgoiso, iso);
    });
});
