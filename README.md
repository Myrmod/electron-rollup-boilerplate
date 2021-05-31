# electron-rollup-kickstart

## Table of Contents  <!-- omit in toc --> 
- [electron-rollup-kickstart](#electron-rollup-kickstart)
  - [Description](#description)
  - [default Dependencies](#default-dependencies)
  - [Installation](#installation)
  - [Development](#development)
    - [build everything at once](#build-everything-at-once)
    - [build our framework (react)](#build-our-framework-react)
    - [build our electron app](#build-our-electron-app)
    - [build our css](#build-our-css)
  - [Create installer](#create-installer)
  - [automated Documentation](#automated-documentation)
  
## Description
In this boilerpalte you can integrate any web technology you like. On default we're using stylus and react separately with our electron & rollup setup.

Hint: This repository needs some refactoring, sue at your own risk!

## default Dependencies
- @rollup/plugin-commonjs
- @rollup/plugin-node-resolve
- @rollup/plugin-replace
- @rollup/plugin-typescript
- @types/react
- @types/react-dom
- better-docs
- electron
- electron-installer-windows
- electron-installer-mac
- electron-installer-linux
- jsdoc
- npm-run-all
- react
- react-dom
- rollup
- rollup-plugin-copy
- stylus
- tslib
- tslint
- typescript

## Installation
just clone and run  in the project root 

``` bash 
yarn install && ln -s ./bin/pre-commit.sh .git/hooks/pre-commit
```

## Development
We have a 3 part build process. The following commands will each trigger in watch mode.

### build everything at once
``` bash
yarn start
```

### build our framework (react)
``` bash
yarn start:renderer
```

### build our electron app
``` bash
yarn start:electron
```

### build our css
``` bash
yarn start:css
```

## Create installer
For each platform (windows, mac and linux) we have a customizable process to create the corresponding installers. The process is mapped on the following commands:
1. `yarn build`
2. `yarn package:<PLATFORM>`
3. `yarn create-installer:<PLATFORM>`

This way you will get an installer of your choosen platform under `dist/installers`. To keep the installer size to a minimum, we have to be careful what we add to the dependencies of the `package.json`, because they will be directly included in the created installer.

## automated Documentation
The following command will create simple typescript based documentation inside the directory `doc`.
``` bash
yarn doc
```
