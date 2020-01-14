const dirTree = require('directory-tree');

const message = require('./messages');
const helper = require('./helpers');

exports.cleanFolder = async (filePath, noDays, depth) => {
    try {
        let totalBytesDeleted = 0;
        let totalModulesFound = 0;

        if (!(await helper.checkIfExists(filePath)))
            return message.nonExistantFilePath(filePath);

        const parentFolders = await helper.mapDir(filePath, depth);

        const folderStats = await helper.returnFolderStats(parentFolders);

        const filterDate = helper.getDateXDays(noDays, 'backwards');

        message.filterDetails(filterDate, filePath, depth);

        const foldersToRemove = helper.filterMatchingFolders(
            folderStats,
            filterDate
        );

        if (foldersToRemove.length === 0) return message.zeroResults();

        foldersToRemove.forEach(folder => {
            const info = dirTree(folder, {});
            totalBytesDeleted += info.size;
            totalModulesFound += info.children.length;
            message.singleDirDetails(info);

            helper.deleteFolder(info.path);
        });

        message.totalCleanDetails(totalBytesDeleted, totalModulesFound);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

module.exports = exports;
