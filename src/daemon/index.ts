import request from 'request'; //@TODO is deprecated
import {APPLICATION_NAME} from '..';
import {SoloWebMonitorApplication} from '../application';
import {Monitor, MonitorStatus} from '../models';
import {MonitorEventRepository, MonitorRepository} from '../repositories';

//@TODO clean old data such as old events where statusChanged===false
//@TODO send alerts
//@TODO handle or set timeouts? Handle too much load and backed up?
//@TODO add ability to double check with remote pinger
export async function start(app: SoloWebMonitorApplication) {
  const monitorRepository = await app.getRepository(MonitorRepository);
  const monitorEventRepository = await app.getRepository(MonitorEventRepository);

  const checkMonitor = async (monitor: Monitor) => {
    const reqOptions = {
      method: 'HEAD',
      url: monitor.url,
      headers: {
        'User-Agent': APPLICATION_NAME
      }
    };
    const checkStartTime = new Date();
    let latency;
    let newStatus = MonitorStatus.Down;
    let reason = '';
    request(reqOptions, function (err: any, res: any) {//@TODO types
      if (err) {
        newStatus = MonitorStatus.Down
        if (!err.code) {
          console.error(err);//@TODO?
        }
        reason = err.code;
      } else {
        if (res.statusCode == 200) {
          newStatus = MonitorStatus.Up
        }
        reason = 'Returned ' + res.statusCode;
      }
      if (newStatus === MonitorStatus.Up) {
        latency = Date.now() - (+checkStartTime);
      } else {
        latency = -1;
      }
      const statusChanged = monitor.status !== newStatus;
      monitorEventRepository.create({
        monitorId: monitor.id,
        date: checkStartTime,
        status: newStatus,
        reason,
        statusChanged,
        latency
      });
      if (statusChanged) {
        monitorRepository.updateById(monitor.id, {status: newStatus});
      }
    });
  };

  /**
   * Important: This logic can only support monitor intervals that are a factor
   * of 60!
   */
  const checkMonitors = async () => {
    const monitors = await monitorRepository.find();
    const currentMinute = (new Date()).getMinutes();
    const monitorsToCheckNow = monitors.filter(monitor =>
      currentMinute % monitor.interval === 0
    );
    monitorsToCheckNow.map(checkMonitor);
  }
  
  setInterval(checkMonitors, 60 * 1000);
}
