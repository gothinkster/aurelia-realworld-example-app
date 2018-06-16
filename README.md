[![Build Status](https://travis-ci.org/loaded02/aurelia-realworld-example-app.svg?branch=master)](https://github.com/loaded02/aurelia-realworld-example-app)

# ![RealWorld Example App](logo.png)

> ### Aurelia codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.


### [Demo](https://loaded02.github.io/aurelia-realworld-example-app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Aurelia** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **[Aurelia](http://aurelia.io)** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Community Activity

- [Typescript Fork of this Project](https://github.com/4imble/aurelia-blog/tree/typescript-conversion) Thanks to @4imble!
- [Framework Speed Comparison](https://medium.freecodecamp.org/a-real-world-comparison-of-front-end-frameworks-with-benchmarks-2018-update-e5760fb4a962)

# How it works

Created with aurelia-cli

# Getting started

Make sure you have [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed. Then run 
```
yarn install
au run --watch
```
and Navigate to `http://localhost:8080/`. 

The app will automatically reload if you change any of the source files.

### Building the project
Run `au build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--env prod` flag for a production build.

### Testing the project
Run `au karma` to test the project.

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Uses JWT (store the token in localStorage)
    - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles

## IE 11 Support
In order to optimize the app for IE11 or Edge please add [bluebird.js](http://bluebirdjs.com) 
as a polyfill for Promises and Fetch.

<br />

[![Brought to you by Thinkster](https://raw.githubusercontent.com/gothinkster/realworld/master/media/end.png)](https://thinkster.io)
