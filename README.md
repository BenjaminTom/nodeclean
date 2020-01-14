# Nodeclean

# Node Clean

#### About

Nodeclean is a globally installable CLI cleaner tool for handling those seemingly endless node_modules folders.

You can run the command in a directory, and if it has a node_modules folder, it will delete it.

You can also run the command with 'folder path', 'days' and 'depth' arguments to filter through a directory containing lots of node apps. If the node app hasn't been modified within the current date and the day's argument, this will delete the node_modules folder. The depth argument is to account for apps that have parent folders that are split into micro-services.

Running the depth argument above 3 levels deep will significantly slow down the script.

### Installation

`npm install nodeclean -g`

or

`npm install nodeclean`

### Use

#### Local

If you install the package into your own project you can extend the functionality to search for multiple folders without having to pass them individually into the CLI.

```
const nodeclean = require('nodeclean');

const appFolders = ['path/to/app/folder', 'path/to/app/folder'];

appFolders.forEach(folder => {
    nodeclean.cleanFolder(folder, 30, 2);
});

```

After you do this, you can create an alias to run your app.

#### Global

If you install this package globally you can run the command for anywhere on your computer.

The below command with search your PWD for a node_modules folder & if it exists, it will delete it.

`nodeclean`

If you want to extend this command to search your entire 'application folder' then you can run

`nodeclean "path/to/app"`

This param is required when executing with arguments.

Note: If you have a space in a folder name then make sure you wrap the path in quotes.

The command also takes two optional flags

`-d 10`

**Default is 30**

This sets the amount of days between now and last modified, deleting any node_modules folders within older directories.

`-l 3`

**Default is 1**

This sets the level of nested children directories to search. This is handy when you have a parent folder containing different microservices. Setting this option to high will significantly slow down the script.
