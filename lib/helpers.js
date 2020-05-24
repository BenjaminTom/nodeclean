const fs = require('fs');
const glob = require('glob');
const rimraf = require('rimraf');

exports.fileStats = file => {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

exports.getFileStats = async filePath => {
    const stats = await this.fileStats(filePath);
    const isDirectory = stats.isDirectory();

    return {
        data: stats,
        filePath,
        isDirectory
    };
};

exports.returnFolderStats = async folders => {
    const p = folders.map(filePath => this.getFileStats(filePath));
    return await Promise.all(p);
};

exports.getDateXDays = (daysBetween, direction) => {
    const date = new Date();
    if (direction === 'backwards' || direction === 'backward')
        return date.setDate(date.getDate() - daysBetween);
    if (direction === 'forwards' || direction === 'forward')
        return date.setDate(date.getDate() + daysBetween);
};

exports.checkIfExists = async path => {
    if (!fs.existsSync(path)) {
        return false;
    }
    return true;
};

exports.mapDir = async (filePath, depth) => {
    const dirsContainsNodeModules = [];
    let loopCount = depth;
    // this evals wether the script is operating on PWD or has been given a path
    const pwd = filePath === process.env.PWD;

    if (pwd && !process.env.WITH_ARGS) loopCount = 1;

    for (let i = 0; i < loopCount; i++) {
        let folderDepth = '/*'.repeat(i + 1);

        if (pwd) folderDepth = '';

        const filePaths = glob(`${filePath}${folderDepth}/node_modules`, {
            sync: true
        });

        dirsContainsNodeModules.push(...filePaths);
    }

    return [
        ...new Set(
            dirsContainsNodeModules.map(p => p.split('/node_modules')[0])
        )
    ];
};

exports.filterMatchingFolders = (folderStats, filterDate) => {
    return folderStats
        .filter(x => x.data.mtimeMs < filterDate && x.isDirectory)
        .map(data => `${data.filePath}/node_modules`);
};

exports.deleteFolder = async path => {
    rimraf(path, e => {
        if (e) console.log(e);
    });
};

module.exports = exports;
