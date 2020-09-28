# electron-rollup-kickstart

## Table of Contents  <!-- omit in toc --> 
- [electron-rollup-kickstart](#electron-rollup-kickstart)
  - [Description](#description)
  - [default Dependencies](#default-dependencies)
  - [Installation](#installation)
  - [Start](#start)
    - [build everything at once](#build-everything-at-once)
    - [build our framework (react)](#build-our-framework-react)
    - [build our electron app](#build-our-electron-app)
    - [build our css](#build-our-css)
  - [automated Documentation](#automated-documentation)
  
## Description
In this boilerpalte you can integrate any web technology you like. On default we're using stylus and react separately with our electron & rollup setup.

## default Dependencies
- @rollup/plugin-commonjs
- @rollup/plugin-node-resolve
- @rollup/plugin-replace
- @rollup/plugin-typescript
- @types/react
- @types/react-dom
- better-docs
- electron
- electron-builder
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

## Start
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

## automated Documentation
The following command will create simple typescript based documentation inside the directory `doc`.
``` bash
yarn doc
```
