# ts-template
<a href="https://github.com/desvart/ts-template/blob/master/LICENSE"><img src="https://img.shields.io/github/license/desvart/ts-template?color=blue" alt="GitHub license"/> </a>

This project aims to build a template to start clean TypeScript projects from scratch with a standard folder structure
for a hexagonal architecture, and Jest, Cucumber, ESLint and Prettier already configured for TS.

To use this template, you can either clone it for your project or apply the below walkthrough to build it from scratch.
Some configurations are specific to the IDE I use (WebStorm) and should be adapted to yours. Beside the optional
configuration of SonarLint, the whole process should take less than 15 minutes to complete.

# Project setup

For control purposes, we will set up the project from scratch and doing it mostly manually, hence the detailed
walkthrough.
The IDE used is WebStorm and the terminal is PowerShell. Here are the main steps:

1. [Initialise a NodeJs project in WebStorm](#initialise-a-nodejs-project-in-webstorm)
2. [Set up TypeScript](#set-up-typescript)
3. [Set up Linter and code formatter for TypeScript](#set-up-linter-and-code-formatter-for-typescript)
4. [Set up the unit test framework for TypeScript](#set-up-the-unit-test-framework-for-typescript)
5. [Set up the functional test framework for TypeScript](#set-up-the-functional-test-framework-for-typescript)

## Initialise a NodeJs project in WebStorm

1. Create a new project from scratch in Webstorm and select Node.js as the initial template.
2. Create the `/package.json` file with this minimal configuration:

       {
         "name": "",
         "version": "",
         "description": "",
         "keywords": ["", ""],
         "homepage": "https://github.com/...",
         "repository": "https://github.com/...",
         "bugs": {
         "url": "https://github.com/.../issues",
         "email": "xxx@gmail.com"
         },
         "license": "",
         "author": "xxx <xxx@gmail.com>",
         "private": true
       }

3. Create the `/.gitignore` file with the following content:

       /.idea/
       /node_modules/

4. [OPTIONAL] Create a `/README.md` file.
5. Create the below repository structure

       /bin                  - script, helpers, binaries
       /config               - global configurations
       /dist                 - released code (to be pushed to BitBurner)  
       /doc
         /feature            - place for the feature files 
       /src  
         /module-X           - an idenpendent module as intented by the "clean" hexagonal architecture
           /config           - module configuration
           /domain  
             /entity   
             /port
             /use-case
           /infra  
             /driven-side  
             /driver-side
       /test
         /unit
         /cucumber

   To do so, run the following command

       mkdir bin, config, dist, doc/feature, src/module-X/infra/driven-side, src/module-X/infra/driver-side, test/unit, 
       test/functional, src/module-X/domain/use-case, src/module-X/config, src/module-X/domain/entity, 
       src/module-X/domain/port

## Set up TypeScript

1. Install the TypeScript.

       npm install --save-dev --save-exact typescript

2. Install the definitelyTyped type definition for Node to support Implicit, Explicit and Ambient types.

       npm install --save-dev --save-exact @types/node

3. Create the `/tsconfig.json` file with this minimal configuration:

       {
         "include": ["src/**/*"],
         "exclude": ["node_modules", test/**/*"],
         "compilerOptions": { /* https://www.typescriptlang.org/tsconfig */
         
           /* Modules */
           "rootDir": "./src",                           /* Specify the root folder within your source files. */
           "module": "ES2022",                           /* Specify what module code is generated. */
           "moduleResolution": "node16",                 /* Specify how TypeScript looks up a file from a given module specifier. */
           "lib": ["es6"],
           "resolveJsonModule": true,                    /* Enable importing .json files. */
         
           /* Emit */
           "outDir": "./dist",                           /* Specify an output folder for all emitted files. */
           "sourceMap": true,                            /* Create source map files for emitted JavaScript files. */
         
           /* Interop Constraints */
           "esModuleInterop": true,                      /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
           "forceConsistentCasingInFileNames": true,     /* Ensure that casing is correct in imports. */
         
           /* JavaScript Support */
           "allowJs": true,                              /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
         
           /* Language and Environment */
           "target": "es2022",                           /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
           "experimentalDecorators": true,               /* Enable experimental support for TC39 stage 2 draft decorators. */
         
           /* Type Checking */
           "strict": true,                               /* Enable all strict type-checking options. */
           "alwaysStrict": true,                         /* Ensure 'use strict' is always emitted. */
           "noImplicitAny": true,                        /* Enable error reporting for expressions and declarations with an implied 'any' type. */
           "noImplicitOverride":  true,
           "noImplicitReturns": true
         }
       }

4. In `/package.json`, define a typescript transpilation command by adding

       "scripts": {
          "compile": "tsc"
       }

5. [OPTIONAL] Configure Webstorm to transpile on change.

## Set up linter and code formatter for TypeScript

For this part, I have chosen tools that are the most used by the development community (2023). The most commonly used
linter for TypeScript is ESLint. Even if ESLint is able to perform some code formatting checks,
[Prettier](https://prettier.io/) does a better job and has better reviews. In order to use standard linting
configuration, I have
[chosen](https://devstephen.medium.com/style-guides-for-linting-ecmascript-2015-eslint-common-google-airbnb-6c25fd3dff0)
to use the [AirBnB ESling configuration](https://www.npmjs.com/package/eslint-config-airbnb)
and [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin).

StandardJS [recommends using ts-standard](https://standardjs.com/#can-i-use-a-javascript-language-variant-like-flow-or-typescript)
for TypeScript project. Since this standard is a lot less used than StandardJS
and suffers the same flaws as StandardJS, we won't consider it.

Ref.: [Prettier, ESLint and Typescript](https://dev.to/viniciuskneves/prettier-eslint-and-typescript-491j)  
[Using ESLint and Prettier with Typescript](https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project)  
[ESLint with StandardJs and Prettier](https://medium.com/nerd-for-tech/setting-up-eslint-with-standard-and-prettier-be245cb9fc64)  
[ESLint, Prettier and Typescript in VSCode ](https://khalilstemmler.com/blogs/tooling/prettier/)  
[Webstorm - Eslint](https://www.jetbrains.com/help/webstorm/eslint.html)  
[Webstorm - Prettier](https://www.jetbrains.com/help/webstorm/prettier.html)

1. Install Prettier

       npm install --save-dev --save-exact prettier

2. Install ESLint with Airbnb configuration

   `eslint-plugin-import` is required by `airbnb-base` (cf. airbnb-base documentation).

       npm install --save-dev --save-exact eslint eslint-config-airbnb-base eslint-plugin-import

   To set up airbnb we need to extend the default ESLint configuration. In `/package.json`, add the following elements:

       "eslintConfig": {
         "extends": [
           "airbnb-base",
         ]
       }

3. Set up ESLint and Prettier to work together

   Since Prettier and ESLint are trying to make code formatting but with different rule sets, we need to deactivate the
   ESLint code formatting rules to let Prettier do its job. In such configuration, Prettier is the only one responsible
   for code formatting and ESLint for linting. To avoid having to run Prettier and then ESLint, it is possible to add
   Prettier rules to ESLint so calling ESLint will check linting (with ESLint rules) and code formatting checks (with
   Prettier rules). Prettier provides [2 packages](https://prettier.io/docs/en/integrating-with-linters.html) exactly
   for that.

   First, turn off ESLint rules that conflicts with Prettier ones.

       npm install --save-dev --save-exact eslint-config-prettier

   Second, add Prettier rules to ESLint

       npm install --save-dev --save-exact eslint-plugin-prettier

   Now we need to extend ESLint configuration with prettier rules: in `/package.json` modify the ESLint extends section
   like that:

       "eslintConfig": {
         "extends": [
           "airbnb-base",
           "plugin:prettier/recommended"
         ]
       }

   The order of the extensions is important since the last ones will override the first ones. Here we specifically
   request prettier rules to override eslint-airbnb configuration.

   In Webstorm, don't forget to deactivate the IDE option that "Reformat on action" (CTRL+ALT+L) based on Prettier since
   it will only use Prettier rules and not the ESLint + Prettier setup configured above. Instead, you should go to the 
   `package.json` file and in the Jest configuration section, make a right click and select "Apply ESLint Code Style 
   rules". By doing so, the IDE will ensure those are the rules checked automatically and applied when asking for an 
   autoformatting of the code.

4. Set up ESLint and TypeScript to work together

   Ref.: [Webstorm - Linting Typescript](https://www.jetbrains.com/help/webstorm/linting-typescript.html)

   First install a package that enable the parsing of TypeScript files by ESLint

       npm install --save-dev --save-exact @typescript-eslint/parser

   And then configure ESLint to use that parser and parse only TypeScript files in the project. In `/package.json`, adapt
   ESLint configuration as followed:

       "eslintConfig": {
         "parser": "@typescript-eslint/parser",
         "settings": {
           "import/resolver": {
             "node": {
               "extensions": [".ts"]
             }
           }
         }
       }

   For linting rules specific to TypeScript language, we can use the default ones proposed
   by [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin).

       npm install --save-dev --save-exact @typescript-eslint/eslint-plugin

   And then adapt the ESLint configuration in `/package.json` (again, be careful on the typescript-eslint plugin position
   in the extends section):

       "eslintConfig": {
         "extends": [
           "plugin:@typescript-eslint/recommended",
           "airbnb-base",
           "plugin:prettier/recommended"
         ]
       }

   Finally, make minor changes to the ESLint/Prettier rules to:
    * remove the no-console error
    * remove ethe import error
    * force prettier to use single quotes rather than double quotes.

          "eslintConfig": {
            "rules": {
              "no-console": "off",
              "import/extensions": "off",
              "prettier/prettier": ["error", {"singleQuote": true}]
            }
          }

5. Configure basic script commands in `package.json`

       "scripts": {
         "lint": "eslint ./**/*.ts",
         "fix": "eslint ./**/*.ts --fix",
         "precompile": "",
         "compile": "tsc --build --clean && tsc"
       }

6. [OPTIONAL] Set up SonarLint in Webstorm

   SonarLint is also a linter and code formatter but is integrated directly into the IDE through plugins. Most rules are
   duplicates from the ones from ESLint or Prettier. There are some that are complementary. That is why I decided to add
   SonarLint as an additional security. To avoid errors being caught multiple times and overcrowding the error logs, I
   have deactivated all SonarLint rules that are already checked by ESLint or Prettier.

## Set up the unit test framework for TypeScript

As for the previous choices, I will use the most commonly used and most simple to set up unit test framework. At the 
time of this project, it is Jest.

Ref.: 
* [Test framework comparison 1](https://raygun.com/blog/javascript-unit-testing-frameworks/)
* [Test framework comparison 2](https://www.testim.io/blog/best-unit-testing-framework-for-javascript/)

1. Install Jest

       npm install --save-dev --save-exact jest @types/jest ts-jest

   ts-jest ensures the transpilation on the fly of TypeScript tests files to JavaScript files to make them compatible
   for jest. Thanks to ts-jest, we don't need to transpile our TypeScript tests files and store the output somewhere.

   `@types/jest` is one way to have Jest globals available for our tests files. The main advantage of this module is 
   that it doesn't require you to explicitly import Jest methods in the test files. The disadvantage is that this module
   is a third party library not maintained by the Jest project. It is maintained at 
   [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest) which provides some
   guaranty of quality, but, nonetheless, it is not part of the Jest project, which generates a dependency risk. 
   Therefore, as recommended by [Jest documentation](https://jestjs.io/docs/getting-started#type-definitions), try to 
   match jest and @types/jest versions as closely as possible to mitigate retro-compatibility issues.

   The other way to handle Jest globals, is to avoid @types/jest and, instead, install @jest/globals (maintained by 
   Jest project). Then, you need to explicitly import Jest methods in all your test files:

       import {describe, expect, test} from '@jest/globals';

2. Configure Jest in `package.json`

       "jest": {
         "preset": "ts-jest",
         "testEnvironment": "node",
         "verbose": true,
         "coverageDirectory": "./test/coverage/",
         "coverageThreshold": {
           "global": {
             "branches": 80,
             "functions": 80,
             "lines": 80,
             "statements": -10
           }
         }
       }
   In this configuration, I made the choice to make the test fails if the global test coverage is below 80%.

3. Add test associated script commands in `package.json`

       "scripts": {
         "pretest": "",
         "test": "jest --coverage ./test/unit",
         "posttest": "",
         "precompile": "jest --coverage ./test/unit",
       }
  
4. In `package.json`, adapt ESLint configuration to be compatible with jest and avoid false positives from the linter:

       "eslintConfig": {
         "env": {
           "jest": true
         }
       }

5. Change the behaviour of ESLint to avoid false positives on missing imports with typescript files.

       npm install --save-dev --save-exact eslint-import-resolver-typescript

   In `package.json`, adapt the ESLint configuration:

       "eslintConfig": {
         "settings": {
           "import/resolver": {
             "typescript": {},
             "node": {
               "extensions": [
                 ".ts"
               ]
             }
           }
         }
       }

6. [OPTIONAL] Configure Jest and TypeScript to use absolute paths in their import patterns, rather than relative paths
   In `tsconfig.json`,

       "compilerOptions": {
         "baseUrl": ".",
         "paths": { "@/*": ["./src/*"] }
       }

   Jest in not aware of the paths mapper defined in `tsconfig.json`. We need to define a similar rule in the jest
   configuration in `package.json`:

       "jest": {
         "moduleNameMapper": {
           "^@/(.*)$": "<rootDir>/src/$1"
         }
       }

7. Structure your test repository
   Since I tend to avoid mixing test files and src files, I like to have my unit test folder structure to be similar to
   the src file structure.

   For instance, create a `/test/unit/module-X/domain/entity/calculator.test.ts` file to test 
   `/src/module-X/domain/entity/bar.ts` class.  
   `calculator.test.ts`:

       import Bar from '@/module-X/domain/entity/bar';
   
       describe('Sample test suite', () => {
         test('should be able to compare numbers', () => {
           expect(2).toEqual(2);
         });
       
         test('should be able to create a new instance of class Bar', () => {
           const s = new Bar('test');
           expect(s.foo()).toEqual('test');
         });
       });


## Set up the functional test framework for TypeScript

1. Ensure you have a version of NodeJs that supports ESM loader (even in experimental mode). In my case, NodeJS version 19.7.0 works.

2. Install cucumberJs

       npm install --save-dev --save-exact @cucumber/cucumber ts-node

2. Configure cucumber
   By creating the following `cucumber.json` file

       {
         "default": {
           "paths": ["src/**/*.feature"],
           "import": ["src/**/*.steps.ts"],
           "parallel": 1,
           "format": ["html:test-reports/cucumber/cucumber-report.html"],
           "publishQuiet": true
         }
       }

3. Modify the `package.json` file to add the following commands:

       "cucumber": "SET NODE_OPTIONS=--loader ts-node/esm --no-warnings --experimental-specifier-resolution=node && cucumber-js",

   This command will generate the js files needed by CucumberJs on the fly with ts-node, avoiding polluting the project.

4. Create your `*.feature` files in Gherkin and your glue code in `*.steps.ts` files.

5. Modify the `tsconfig.json` file to avoid compiling the `.steps.ts` and `.test.ts` files while building the distribution:

       "exclude": ["node_modules", "src/**/*.test.ts", "src/**/*.steps.ts"],

Ref.:
* [Cucumber with TypeScript](https://www.elliotdenolf.com/blog/cucumberjs-with-typescript)

## Finalize the template by creating commands for the final build in `package.json`
   In order to generate a clean build, I want to clean up any previously compiled files from the distribution folder. Since Window 
   doesn't offer a clean "rm -rf" command, I have opted for a simple trick: delete the whole dist folder and recreate it, empty.

    "scripts": {
      "lint": "eslint ./**/*.ts",
      "fix": "eslint ./**/*.ts --fix",
      "pretest": "",
      "unit": "jest --coverage .*.test.ts",
      "cucumber": "SET NODE_OPTIONS=--loader ts-node/esm --no-warnings --experimental-specifier-resolution=node && cucumber-js",
      "test": "npm run unit && npm run cucumber",
      "posttest": "",
      "precompile": "npm run test",
      "clean": "rmdir /s /q dist && mkdir dist",
      "compile": "npm run clean && tsc"
    },
  

