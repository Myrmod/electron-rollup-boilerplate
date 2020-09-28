# electron-rollup-kickstart

## Table of Contents  <!-- omit in toc --> 
- [electron-rollup-kickstart](#electron-rollup-kickstart)
  - [Installation](#installation)
  - [Start](#start)
    - [build our framework (react)](#build-our-framework-react)
    - [build our electron app](#build-our-electron-app)
  
  
## Installation
just clone and run  in the project root 

``` bash 
yarn install && ln -s ./bin/pre-commit.sh .git/hooks/pre-commit
```

## Start
We have a 2 part build process. The following commands will trigger in watch mode each.

### build our framework (react)
``` bash
yarn start:dev
```

### build our electron app
``` bash
yarn start:electron
```
