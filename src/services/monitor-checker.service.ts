import { injectable, /* inject, */ BindingScope } from '@loopback/core';

import { repository } from '@loopback/repository';
import axios from 'axios';
import { APPLICATION_NAME } from '..';
import { Monitor, MonitorStatus } from '../models';
import { MonitorEventRepository, MonitorRepository } from '../repositories';

interface CheckResponse {
  latency: number,
  status: MonitorStatus,
  reason: string
}

//@TODO send alerts
//@TODO handle or set timeouts? Handle too much load and backed up?
//@TODO add ability to double check with remote pinger
@injectable({ scope: BindingScope.SINGLETON })
export class MonitorCheckerService {
  constructor(
    @repository(MonitorRepository)
    public monitorRepository: MonitorRepository,
    @repository(MonitorEventRepository)
    public monitorEventRepository: MonitorEventRepository,
  ) {
    this.checkMonitorsForCurrentMinute = this.checkMonitorsForCurrentMinute.bind(this);
    this.checkMonitorHttp = this.checkMonitorHttp.bind(this);
    this.checkMonitor = this.checkMonitor.bind(this);
  }

  protected async checkMonitorHttp(monitor: Monitor): Promise<CheckResponse> {
    let response;
    const checkStartTime = new Date();
    try {
      response = await axios.head(monitor.url, { httpAgent: APPLICATION_NAME })
    } catch (err) {
      return {
        latency: -1,
        status: MonitorStatus.Down,
        reason: err.code || 'Unknown Error'
      }
    }
    if (response.status >= 200 && response.status < 300) {
      return {
        latency: Date.now() - (+checkStartTime),
        status: MonitorStatus.Up,
        reason: 'Returned ' + response.status
      }
    } else {
      return {
        latency: -1,
        status: MonitorStatus.Down,
        reason: 'Returned ' + response.status
      }
    }
  }

  public async checkMonitor(monitor: Monitor) {
    const { latency, reason, status } = await this.checkMonitorHttp(monitor);
    const statusChanged = monitor.status !== status;
    console.log(monitor.name, status, reason);
    this.monitorEventRepository.create({
      monitorId: monitor.id,
      date: new Date(),
      status,
      reason,
      statusChanged,
      latency
    });
    if (statusChanged) {
      this.monitorRepository.updateById(monitor.id, { status });
    }
  };

  /**
   * This is meant to be called once a minute. This triggers the pinging/checking of all
   * monitors that should be checked in the current minute.
   * 
   * Note: This logic can only support monitor intervals that are a factor
   * of 60. A monitor interval like 7 is not supported.
   */
  public async checkMonitorsForCurrentMinute() {
    const monitors = await this.monitorRepository.find();
    const currentMinute = (new Date()).getMinutes();
    const monitorsToCheckNow = monitors.filter(monitor =>
      currentMinute % monitor.interval === 0
    );
    monitorsToCheckNow.map(this.checkMonitor);
  }
}
