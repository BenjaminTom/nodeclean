#!/usr/bin/env node

const readline = require('readline');
const nodeclean = require('../lib/index.js');

const handleUserPrompt = () => {
    const args = process.argv;

    args.splice(0, 2);

    if (args.length > 0) process.env.WITH_ARGS = true;

    const dir = args[0] || process.env.PWD;

    const defualt = {
        dir,
        days: 1,
        depth: 10
    };

    const dayTag = args.indexOf('-d');
    const levelTag = args.indexOf('-l');

    if (dir === process.env.PWD && !process.env.WITH_ARGS) defualt.days = 0;

    if (dayTag > 0) defualt.days = args[dayTag + 1] * 1;
    if (levelTag > 0) defualt.depth = args[levelTag + 1] * 1;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const consoleString = `\nAre you sure you want to run nodeclean?\n
This will delete the node_modules folder from child folders (apps) within ${dir} that havn't been editing in ${defualt.days} days.
It will search child directories ${defualt.depth} levels deep.
You can re-install them by running npm i or npm install from within the relevant directory

(Type yes or y to continue or anything else to exit)\n\n`;

    rl.question(consoleString, answer => {
        if (answer === 'yes' || answer === 'y')
            nodeclean.cleanFolder(defualt.dir, defualt.days, defualt.depth);

        if (answer === 'n' || answer === '') process.exit(1);

        rl.close();
    });
};

handleUserPrompt();
