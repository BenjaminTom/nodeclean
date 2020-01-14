/* eslint-disable no-console */
const term = require('./terminal');

function bytesToSize(bytes, seperator = '') {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes}${seperator}${sizes[i]}`;

    return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
}

const singleDirDetails = data => {
    const {path, size, children} = data;
    const consoleString = `     Found ${
        children.length
    } modules totalling ${bytesToSize(size)} @ ${path}`;

    console.log(consoleString);
};

const totalCleanDetails = (bytesDeleted, modulesFound) => {
    const consoleString = `\nNODECLEAN SUCCESS!\n - Space Reclaimed: ${bytesToSize(
        bytesDeleted
    )}\n - Total Modules Deleted: ${modulesFound}\n`;

    const deleteInProgess = `\nThe process will end automatically once all your folders are clean...\n`;

    console.log(
        term.tGreen,
        consoleString,
        term.tRed,
        deleteInProgess,
        term.reset
    );
};

const filterDetails = (filterDate, filePath, depth) => {
    const date = new Date(filterDate).toISOString();
    const consoleString = `\n  Filtering @${filePath} at depth of ${depth} for Apps not modified since ${
        date.split('T')[0]
    }\n`;

    console.log(
        term.tYellow,
        '\n',
        term.lineBreakWavy,
        consoleString,
        term.reset
    );
};

const zeroResults = () => {
    const consoleString =
        '- All Clean! No node_modules folders found matching filter\n';

    console.log(term.tGreen, consoleString, term.reset);
};

const nonExistantFilePath = filePath => {
    const consoleString = `- ERROR: File Path ${filePath} doesn't exist!\n`;

    console.log(term.tRed, consoleString, term.reset);
};

module.exports = {
    singleDirDetails,
    totalCleanDetails,
    filterDetails,
    zeroResults,
    nonExistantFilePath
};
