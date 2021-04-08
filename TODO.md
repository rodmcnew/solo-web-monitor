#### MUST:

#### SHOULD:
- add some automated tests on client and server
- add server side validation of monitor props such as interval, url, name, (and give the client a way to understand this?, or validate on client too?)

#### COULD:
- imports should be all " or all '
- consider that single slice file is huge (it was combined from two files because of circular dependency issues)
- clean old data such as old events where statusChanged===false
- consider removing the hard-coding that is in client/config.ts?
- consider renaming 'monitorDetails' slice to selectedMonitor or something?
- could monitorStatusDescriptions be removed and we just use the enum instead?
- consider loopback relations
- search code for @possibleImprovement
- Allow demo mode link, http endpoint, and app-startup-db-reset to be disabled somehow?
- Consider sharing type MonitorStatus with the server somehow?
- consider changing export const APPLICATION_NAME = 'SoloWebMonitor' to the app configuring the user agent on a service instead
- consider dealing with times when the only ping events are very old, like in the demo, should chart be blank?

#### WONT (to keep this project easier to maintain into the future):
- allow external double checker server before saying its down
- build login page and access control
- eventually support emailing alerts?
- Allow monitor urls with ports like http://localhost:3000
- Consider using loopback cron lib
- Show "duration" for events