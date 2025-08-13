<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/krishna-das-m/krishnadasm.github.io/main/src/images/logo.png" width="100" />
</div>
<h1 align="center">
  brittanychiang.com - v4
</h1>
<p align="center">
  The second iteration of <a href="https://krishnadasm.github.io" target="_blank">krishnadasm.github.io</a> built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a> and hosted with <a href="https://www.netlify.com/" target="_blank">Netlify</a>
</p>
<p align="center">
  Previous iterations:
  <!-- <a href="https://github.com/bchiang7/v1" target="_blank">v1</a>,
  <a href="https://github.com/bchiang7/v2" target="_blank">v2</a>, -->
  <a href="https://krishna-das-m.github.io" target="_blank">v1</a>
</p>
<p align="center">
  <a href="https://app.netlify.com/sites/brittanychiang/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/1963b488-7b78-48c9-9e2d-6fb5e47ab3af/deploy-status" alt="Netlify Status" />
  </a>
</p>

![demo](https://raw.githubusercontent.com/krishna-das-m/krishnadasm.github.io/main/src/images/demo.png)

### TL;DR

Yes, you can fork this repo. Please give me proper credit by linking back to [brittanychiang.com](https://brittanychiang.com). Thanks!

## 🛠 Installation & Set Up

1. Install the Gatsby CLI

   ```sh
   npm install -g gatsby-cli
   ```

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm). The current Node used for this project is `node v20.19.4`

   ```sh
   nvm install
   npm install --legacy-peer-deps
   ```

   If it fails to install all the necessary dependencies, run the install command with the legacy peer deps flag:

   ```sh
   npm install --legacy-peer-deps
   ```

3. Install dependencies (Not required)

   ```sh
   yarn
   ```

4. Start the development server

   ```sh
   npm start
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

1. Preview the site as it will appear once deployed

   ```sh
   npm run serve
   ```

## 🎨 Color Reference

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| Navy           | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Light Navy     | ![#112240](https://via.placeholder.com/10/0a192f?text=+) `#112240` |
| Lightest Navy  | ![#233554](https://via.placeholder.com/10/303C55?text=+) `#233554` |
| Slate          | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Light Slate    | ![#a8b2d1](https://via.placeholder.com/10/a8b2d1?text=+) `#a8b2d1` |
| Lightest Slate | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |
| White          | ![#e6f1ff](https://via.placeholder.com/10/e6f1ff?text=+) `#e6f1ff` |
| Green          | ![#64ffda](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |

## Guidelines to change to website for your portfolio:

You can start with `gatsby-config.js` where name, title, description could be changed.

## To change loader logo:

The loader logo could be changed by changing the text in the `src\components\icons\loader.js`

## To Change Logo:

The logo that appears in the top left corner of the webpage is addressed in the navigation component. `src\components\icons\logo.js`
