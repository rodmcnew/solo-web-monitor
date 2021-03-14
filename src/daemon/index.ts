import { SoloWebMonitorApplication } from '../application';
import { MonitorEventRepository, MonitorRepository } from '../repositories';
import { MonitorCheckerService } from '../services';

//@TODO clean old data such as old events where statusChanged===false

export async function start(app: SoloWebMonitorApplication) {
  const monitorChecker = new MonitorCheckerService(
    await app.getRepository(MonitorRepository), //@TODO is there a way to use @service injection?
    await app.getRepository(MonitorEventRepository)
  )

  setInterval(monitorChecker.checkMonitorsForCurrentMinute, 5 * 1000);//@TODO consider loopback cron?
}
