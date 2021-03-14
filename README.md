# - - - -
# THIS IS UNDER CONSTRUCTION, DO NOT USE IT YET
# - - - -

# @TODO:
- remove any un-needed npm packages from client that came from ubermon old
- delete old react features like password reset
- search for @TODO
- See if i can get cursor to always be in a good spot
- delete any br tags
- delete any inline style
- eventually support emailing alerts?
- build login page and access control
- this error can be spit out on console, stop it: Error: Invalid URI "gg.localhost.com"
- remove ping controller
- remove counter client stuff
- use newer bootstrap and stop using CDN for it?
- ping new monitors right away
- "Monitoring Interval: Every minute" would be better than "1 minutes"
- remove http write access to monitor events
- should react component funcs be exporting default?
- should interfaces use , or ; ?
- imports should be all " or all '
- consider loopback relations
- handle http errors, especially for initial load
- form validation?
- monitor url "yozo" causes server errors
# Solo Web Monitor

This is a simple stand alone web uptime monitor. It will watch any URLs you give it and will let you know if they go down. You can run this app locally or on a server. The only thing that is required is NodeJS. No database is required.

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
