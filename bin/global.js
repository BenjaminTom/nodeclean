#!/usr/bin/env node

const readline = require('readline');
const nodeclean = require('../lib/index.js');

const handleUserPrompt = () => {
    const args = process.argv;

    args.splice(0, 2);

    const dir = args[0] || process.env.PWD;

    const defualt = {
        dir,
        days: 30,
        depth: 1
    };

    const dayTag = args.indexOf('-d');
    const levelTag = args.indexOf('-l');

    if (dir === process.env.PWD) defualt.days = 0;

    if (dayTag > 0) defualt.days = args[dayTag + 1] * 1;
    if (levelTag > 0) defualt.depth = args[levelTag + 1] * 1;

    console.log(defualt);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const consoleString = `\nAre you sure you want to run nodeclean?\n
This will delete the node_modules folder from ${dir}
You can re-install them by running npm i or npm install from within this directory

(Type yes or y to continue or anything else to exit)\n\n`;

    rl.question(consoleString, answer => {
        if (answer === 'yes' || answer === 'y')
            nodeclean.cleanFolder(defualt.dir, defualt.days, defualt.depth);

        if (answer === 'n' || answer === '') process.exit(1);

        rl.close();
    });
};

handleUserPrompt();

// nodeclean.cleanFolder('/Users/benny/Documents/Applications', 150, 3);
