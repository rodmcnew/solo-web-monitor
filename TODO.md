#### MUST:
- search for @TODO
- show something when loading, like when making a new monitor and waiting for the first ping
- show something if there is an error communicating with server
- App becomes unresponsive and you can multi submit the create form if creating https://bun.com
- add some automated tests on client and server

#### SHOULD:
- get rid of the setTimeout in server app.ts
- deal with times when the only ping events are very old, like in the demo, should chart be blank?
- regularly clean old monitor events
- do i have circular slice dependencies?
- npm start doesn't seem to work after npm build?
- add server side validation of monitor props such as interval, url, name, (and give the client a way to understand this?, or validate on client too?)
- imports should be all " or all '
#### COULD:
- clean old data such as old events where statusChanged===false
- consider removing the hard-coding that is in client/config.ts?
- consider renaming 'monitorDetails' slice to selectedMonitor or something?
- could monitorStatusDescriptions be removed and we just use the enum instead?
- consider loopback relations
- search code for @possibleImprovement
- Allow demo mode link, http endpoint, and app-startup-db-reset to be disabled somehow?
- Consider sharing type MonitorStatus with the server somehow?
#### WONT (to keep this project easier to maintain into the future):
- allow external double checker server before saying its down
- build login page and access control
- eventually support emailing alerts?
- Allow monitor urls with ports like http://localhost:3000
- Consider using loopback cron lib
- Show "duration" for events