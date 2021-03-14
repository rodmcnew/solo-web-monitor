#### MUST:
- search for @TODO
- delete any br tags
- delete any inline style
- show something when loading, like when making a new monitor and waiting for the first ping
#### SHOULD:
- add server side validation of monitor props such as interval, url, name, and give the client a way to understand this?
- build login page and access control
- this error can be spit out on console, stop it: Error: Invalid URI "gg.localhost.com"
- should react component funcs be exporting default?
- should interfaces use , or ; ?
- imports should be all " or all '
- handle http errors, especially for initial load
- use newer bootstrap and stop using CDN for it?
#### COULD:
- eventually support emailing alerts?
- See if i can get cursor to always be in a good spot
- consider loopback relations
- allow external double checker server before saying its down
- search code for @possibleImprovement

#### WOULD:
- Allow monitor urls with ports like http://localhost:3000
