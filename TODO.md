#### MUST:
- regularly clean old monitor events
- search for @TODO
- delete any br tags
- delete any inline style
- show something when loading, like when making a new monitor and waiting for the first ping
- some sort of pagination or limit on events? (maybe cleaning solves this?)
- deal with times when the only ping events are very old, like in the demo, should chart be blank?
- npm start doesn't seem to work after npm build?
- fix all complaints from the react build
- add some automated tests on client and server
- App becomes unresponsive and you can multi submit the create form if creating https://bun.com
#### SHOULD:
- add server side validation of monitor props such as interval, url, name, and give the client a way to understand this?
- this error can be spit out on console, stop it: Error: Invalid URI "gg.localhost.com"
- should react component funcs be exporting default?
- should interfaces use , or ; ?
- imports should be all " or all '
- handle http errors, especially for initial load
- use newer bootstrap and stop using CDN for it?
#### COULD:
- See if i can get cursor to always be in a good spot
- consider loopback relations
- allow external double checker server before saying its down
- search code for @possibleImprovement

#### WOULD:
- build login page and access control
- eventually support emailing alerts?
- Allow monitor urls with ports like http://localhost:3000
- Consider using loopback cron lib
