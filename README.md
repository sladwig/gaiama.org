<p align="center">
  <a href="https://www.gaiama.org/"><img src="src/assets/gaiama-avatar.png" width="300"></a>
</p>

<h1 align="center"><a href="https://www.gaiama.org" title="GaiAma.org">GaiAma.org</a></h1>

<p align="center">
  <a href="#contributors" title="All Contributors"><img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square"></a>
  <a href="https://david-dm.org/GaiAma/gaiama.org" title="dependencies status"><img src="https://david-dm.org/GaiAma/gaiama.org/status.svg"/></a>
  <a href="https://david-dm.org/GaiAma/gaiama.org?type=dev" title="devDependencies status"><img src="https://david-dm.org/GaiAma/gaiama.org/dev-status.svg"/></a>
</p>

<p align="center">
  <a title="Static Site Generator: GatsbyJS" href="https://www.gatsbyjs.org" target="_blank"><img src="https://www.gaiama.org/gatsby_logo.svg" width="40" alt="GatsbyJS Logo"></a> <a title="Hoster: Netlify" href="https://www.netlify.com" target="_blank"><img src="https://www.gaiama.org/netlify_logo.svg" width="40" alt="Netlify Logo"></a> <a title="Server: DigitalOcean" href="https://m.do.co/c/bcef7e4dac88" target="_blank"><img src="https://www.gaiama.org/digitalocean_logo.svg" width="40" alt="DigitalOcean Logo"></a>
</p>

## Features

- [Netlify](https://www.netlify.com/) hosted
- [DigitalOcean](https://m.do.co/c/bcef7e4dac88) backed
- [GatsbyJS](https://www.gatsbyjs.org/) v2
- [Emotion](https://emotion.sh/) for styling
- [Node.js 10.10](https://nodejs.org/en/)
- [Changelog](CHANGELOG.md) (new)
- [I18n: Auto discover & link translations](gatsby-node.js#L152)
- [Pager: older / newer article](gatsby-node.js#L255)
- [related articles](gatsby-node.js#L130) manual and auto suggestions
- [react-toastify](https://github.com/fkhadra/react-toastify)
- [gatsby-plugin-pixel](plugins/gatsby-plugin-pixel) custom analytics using Google Analytics as Backend
- [babel-plugin-preval](https://github.com/kentcdodds/babel-plugin-preval): pre-evaluate color conversions in [theme.js](src/theme.js)
- [Offline support](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-offline#readme)
- [gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image#readme) and [gatsby-remark-images](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images#readme) for responsive images
- [SEO (OpenGraph Tags, Twitter Tags)](src/components/MainLayout/index.js#L195)
- [gatsby-source-instagram](https://github.com/oorestisime/gatsby-source-instagram)
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
- [commit message template](.github/commit_template)
- [Yarn](https://yarnpkg.com)
- [All Contributors by Kent C. Dodds](https://github.com/kentcdodds/all-contributors)

## Roadmap

- integrate programming blog, which should reuse as much as possible
- move all APIs to DigitalOcean (some still on now.sh)
- more cleanup
- move from [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) to [gatsby-mdx](https://github.com/ChristopherBiscardi/gatsby-mdx)
- change [react-helmet](https://github.com/nfl/react-helmet) to [react-head](https://github.com/tizmagik/react-head)
- improve [build](scripts/build.sh) script, to fix PR previews

## Development

We use `yarn` as Node.js package manager instead of `npm` and a semantic commit convention based on [Angular's](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
This way we can auto generate our [changelog](CHANGELOG.md) using [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog).
If you want, you can use the `yarn setup:git` script to link our [commit message template](.github/commit_template) in your local git settings (only for this repository), which can serve as a cheat sheet and reminder.
To build the changelog you can run `yarn changelog`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/5196971?v=4" width="100px;"/><br /><sub><b>Can Rau</b></sub>](https://github.com/CanRau)<br />[💻](https://github.com/GaiAma/gaiama.org/commits?author=CanRau "Code") [🎨](#design-CanRau "Design") [📖](https://github.com/GaiAma/gaiama.org/commits?author=CanRau "Documentation") [🔍](#fundingFinding-CanRau "Funding Finding") [🤔](#ideas-CanRau "Ideas, Planning, & Feedback") [🚇](#infra-CanRau "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/79246?v=4" width="100px;"/><br /><sub><b>Stefan Ladwig</b></sub>](https://github.com/sladwig)<br />[📖](https://github.com/GaiAma/gaiama.org/commits?author=sladwig "Documentation") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
