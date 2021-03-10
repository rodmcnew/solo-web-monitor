import request from 'request'; //@TODO is deprecated
import {APPLICATION_NAME} from '..';
import {OmonityApplication} from '../application';
import {Monitor} from '../models';
import {MonitorEventRepository, MonitorRepository} from '../repositories';

//@TODO clean old data such as old events where statusChanged===false
//@TODO send alerts
//@TODO handle or set timeouts? Handle too much load and backed up?
//@TODO add ability to double check with remote pinger
export async function start(app: OmonityApplication) {
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
    let up = true;
    let reason = '';
    request(reqOptions, function (err: any, res: any) {//@TODO types
      if (err) {
        up = false;
        if (!err.code) {
          console.error(err);//@TODO?
        }
        reason = err.code;
      } else {
        up = res.statusCode == 200;
        reason = 'Returned ' + res.statusCode;
      }
      if (up) {
        latency = Date.now() - (+checkStartTime);
      } else {
        latency = -1;
      }
      const statusChanged = up !== monitor.up;
      monitorEventRepository.create({
        date: checkStartTime,
        up,
        reason,
        statusChanged,
        latency
      });
      if (statusChanged) {
        monitorRepository.updateById(monitor.id, {up});
      }
    });
  };
  const checkMonitors = async () => {
    const monitors = await monitorRepository.find();
    monitors.map(checkMonitor);
  }
  setInterval(checkMonitors, 5 * 1000);//@TODO
}
