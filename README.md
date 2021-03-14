# Solo Web Monitor

This is a simple stand alone web uptime monitor. It will watch any URLs you give it and will let you know if they go down. You can run this app locally or on a server. The only thing that is required is NodeJS. No database is required.

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).
# @TODO MUST:
- build login page and access control
- search for @TODO
- delete any br tags
- delete any inline style
- "Monitoring Interval: Every minute" would be better than "1 minutes", use shared list with the select box
- ping new monitors right away
- monitor url "yozo" causes server errors and down events don't get recorded
# @TODO SHOULD:
- this error can be spit out on console, stop it: Error: Invalid URI "gg.localhost.com"
- should react component funcs be exporting default?
- should interfaces use , or ; ?
- imports should be all " or all '
- handle http errors, especially for initial load
- form validation?
- use newer bootstrap and stop using CDN for it?
# @TODO COULD:
- eventually support emailing alerts?
- See if i can get cursor to always be in a good spot
- consider getting rid of window.confirm
- consider loopback relations
- allow external double checker server before saying its down
