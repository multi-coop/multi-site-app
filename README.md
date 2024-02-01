# Multi-site

**This app allows to deploy an SPA website, by pointing to distant contents (markdown files) hosted anywhere on github or gitlab.**

---
## Why this project ? 

( ... so you may ask ... )

We simply didn't want to have all our `.md` contents in the same repo than the app deploying them into an simili-static website...

Yes, sometimes it's simpler to distinguish the repos you want people to collaborate into, depending if you're expecting them to contribute only to the content texts, or to the code... Usually it's not the same kind of people nor the same required skills.

We also wanted to display some filterable galeries : for instance having a page with a card for every team member, or a card for every project in our portfolio, ... and filtering which cards you want to hide given some tags...

Finally we wanted a reusable app to deploy different websites, without having to fork the project... It's just a matter of changing the `.env` file and having another contents in another repo...

In short, vuepress or equivalent "static-contents-based" apps weren't versatile nor simple enough for our needs (and we wanted to have a bit of fun doing this project from scratch)...


## Who did that ?

( ... Aren't you a bit of a curious fellow ? ... )

This open source tool was developped by the tech cooperative **[multi](https://multi.coop)** (and our website is based on this solution).

---

## Main features

- Load distant `.md` contents hosted on Github or Gitlab ;
- Multi lingual (if you provide the dictionnaries) ;
- Filters and cards ;
- Specific urls for every item you can provide on the fly ;

---

## Setup

### The `.env` file

First you have to create an `.env` file at the root of the project, which can be based on the `example.env` file :

The template - `example.env` - is present at the root. You can copy-paste it and customize it wiith your own values.

```shell
# from repo root
cp example.env .env
```

You should have an `.env` file looking like this :

```bash
### - - - - - - - - - - - - - - - - - - - - - ###
### GLOBAL ENV VARS
### - - - - - - - - - - - - - - - - - - - - - ###
# NUXT_ENV_RUN_MODE : dev | preprod | prod
NUXT_ENV_RUN_MODE=dev
NUXT_ENV_HOST=localhost
NUXT_ENV_PORT_DEV=4000
NUXT_ENV_PORT_PROD=4001
NUXT_ENV_APP_TITLE=Multi-site

### - - - - - - - - - - - - - - - - - - - - - ###
### CONTENTS
### - - - - - - - - - - - - - - - - - - - - - ###
NUXT_ENV_SITE_CONFIG=https://github.com/co-demos/multi-site-contents/blob/main/config/global.md
```

### About the distant repo (your `.md` files), the "contents" repo

You can base the organisation of your distant repo by checking [the example of this repo](https://github.com/co-demos/multi-site-contents).

The distant "contents" repo is organized as follow : 

```
.
├── README.md
├── LICENCE.md
├── config: folder containing the config data necessary to deploy a website with the `multi-site` app
│   ├── global.md : global config file (md and yaml head)
│   ├── navbar.md : config file for navbar butttons and links (md and yaml head)
│   ├── route.md : config file for routes (md and yaml head)
│   └── footer.md : config file for footer links (md and yaml head)
├── images: folder containing images
│   └── <whatever you want> ...
├── texts: folder containing all markdown files, including data files 
    └── <whatever you want> ...

```

### Local development

Then you just have to run the app :

```bash
nvm use
npm run dev
# or
NODE_OPTIONS=--openssl-legacy-provider npm run dev # If you have `ERR_OSSL_EVP_UNSUPPORTED` error
```

... and check if everything seems ok, given the settings from the `.env` file) :

[`http://localhost:4000/`](http://localhost:4000/)

---

## Stack

Technologies used for **multi-site-app** are the followiing :

- [Nuxt.js](https://nuxtjs.org) - js framework js based on vue.js ;
- [Buefy](https://buefy.org/documentation) - css framework based on [Bulma](https://bulma.io/) css framework ;
- [Axios](https://axios-http.com/) - for http client requests ;
- [Dotenv](https://www.npmjs.com/package/dotenv) - js library to load env variables  ;
- [Gray matter](https://www.npmjs.com/package/gray-matter) - js library to transform yaml or markdown data into js objects  ;
- [vue-Showdown](https://vue-showdown.js.org/) - js plugin to transform markdown into html  ;
- [highlight.js](https://highlightjs.org/) - to apply css to code blocks (nice colors for every languages) ;

---

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

---

## Deployment

These instances are deployed  with Netlify :

- Test deploy : [![Netlify Status](https://api.netlify.com/api/v1/badges/5a774814-2a6a-4da7-a8b5-1cc3d654df2a/deploy-status)](https://app.netlify.com/sites/multi-site-app-test/deploys) - rendering [these content](https://github.com/multi-coop/multi-site-contents).
- Official website of [our tech cooperative multi](https://multi.coop) : [![Netlify Status](https://api.netlify.com/api/v1/badges/5be5abcb-7667-4b96-b1d1-952839f70c2f/deploy-status)](https://app.netlify.com/sites/multi-website/deploys) - rendering [these content](https://github.com/multi-coop/multi-site-contents)
- [Official Documentation website](https://gitribute-docs.multi.coop) for the [Gitribute](https://gitlab.com/multi-coop/gitribute) project : [![Netlify Status](https://api.netlify.com/api/v1/badges/8a49a93f-e443-48e5-b5d8-baa2d7f5fee5/deploy-status)](https://app.netlify.com/sites/gitribute-documentation/deploys) - rendering [these content](https://github.com/multi-coop/gitribute-documentation-content)

---

## Contributions

If you want to propose somme enhancements to our app please make your pull requests against the `main` branch. We will review that with great pleasure :)

You can also add issues directly in the reop, or add notes or issues from our [github "project" page](https://github.com/orgs/multi-coop/projects/2).

---

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
