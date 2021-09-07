#### MUST:
- Consider adding more doc blocks
- Consider adding units tests (client and server?)
#### SHOULD:
- Folder organization: does api.ts make sense where it is or should it be moved into monitors?
- show-x actions name things "forms" but the components are named "page"
- https://redux.js.org/faq/reducers#how-do-i-share-state-between-two-reducers-do-i-have-to-use-combinereducers
- selectors should be named like selectBlah apparently
- add some automated tests on client and server
- add server side validation of monitor props such as interval, url, name, (and give the client a way to understand this?, or validate on client too?)
- Consider refreshing a monitor's core data when it is clicked if it has not be refreshed in a while
- consider memoizing inside useSelectedMonitor and useFirstMonitor and useShowMonitorDetailsForAnyMonitor

#### COULD:
- Consider a "welcome to the demo" popup that tells the user to feel free to play around
- Consider "could const { monitor } = useSelectedMonitor();" have issues if its loading or the selected ID isn't in the list?
- Consider if circular slice file dependencies is really a problem. It doesn't seem like it is. It also may be a circle with the store.
- Consider that "useGetMonitorEventsByMonitorIdQuery(monitor?.id || '');" would cause an extra network call for no reason if no monitors is selected
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
- consider using react router for details pages

#### WONT (to keep this project easier to maintain into the future):
- allow external double checker server before saying its down
- build login page and access control
- eventually support emailing alerts?
- Allow monitor urls with ports like http://localhost:3000
- Consider using loopback cron lib
- Show "duration" for events
