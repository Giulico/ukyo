# Ukyo ![Version](https://img.shields.io/github/package-json/v/Giulico/Ukyo?style=flat-square)

Ukyo is a frontend boilerplate that uses Webpack 4.

![Ukyo](https://preview.ibb.co/mDpt1e/ukyo_tools.jpg)

- [x] Webpack 4
- [x] Babel 7
- [x] JS Hot module replacement
- [x] Pug template engine
- [x] Scss style preprocessor
- [x] Scss Hot module replacement
- [x] Sass MQ

# Getting started

## Create a directory and move into it

```bash
mkdir my-app
cd my-app
```

## Install and run Ukyo

```bash
npx ukyo
```

If you've previously installed `ukyo` globally via `npm i -g ukyo`, we recommend you uninstall the package using `npm uninstall -g ukyo` or `yarn global remove ukyo` to ensure that npx always uses the latest version.

## Start the development server

You don’t need to install or configure tools like Webpack or Babel.
They are preconfigured and hidden so that you can focus on the code.

Create a folder, install Ukyo, and you’re good to go.

```bash
npm start
# yarn start
```

The page will automatically show up, if it doesn't, open [http://localhost:3000](http://localhost:3000)

## Production build

The production script creates minified bundles with lighter weight source maps with optimized assets.

```bash
npm run build
# yarn build
```

## Bundle Analyzer

Ukyo uses [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) to visualize the size of webpack output with an interactive zoomable treemap.

```bash
npm run bundle-analyzer
# yarn bundle-analyzer
```
