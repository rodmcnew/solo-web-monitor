import { SoloWebMonitorApplication } from '../application';
import { MonitorEventRepository, MonitorRepository } from '../repositories';
import { DemoDataServiceService, MonitorCheckerService } from '../services';

//@TODO clean old data such as old events where statusChanged===false

export async function start(app: SoloWebMonitorApplication) {
  //@TODO make demo data optional via ENV var
  const demoDataService = new DemoDataServiceService(
    await app.getRepository(MonitorRepository), //@TODO is there a way to use @service injection? make it a service and use app.get?
    await app.getRepository(MonitorEventRepository)
  )
  demoDataService.setDatabaseToDemoData(); //@TODO move somewhere else, this isn't really a deamon?
  // setInterval(demoDataService.setDatabaseToDemoData, 5 * 1000);//@TODO consider loopback cron?


  const monitorChecker = new MonitorCheckerService(
    await app.getRepository(MonitorRepository), //@TODO is there a way to use @service injection? make it a service and use app.get?
    await app.getRepository(MonitorEventRepository)
  )
  setInterval(monitorChecker.checkMonitorsForCurrentMinute, 5 * 1000);//@TODO consider loopback cron?
}
