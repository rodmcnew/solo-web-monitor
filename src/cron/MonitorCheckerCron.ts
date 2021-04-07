import { CronJob, cronJob } from '@loopback/cron';
import { service } from '@loopback/core';
import { MonitorCheckerService } from '../services';

@cronJob()
export class MonitorCheckerCronJob extends CronJob {
    constructor(
        @service(MonitorCheckerService)
        protected monitorCheckerService: MonitorCheckerService
    ) {
        super({
            cronTime: '1 * * * * *', // The first second of every minute
            onTick: monitorCheckerService.checkMonitorsForCurrentMinute,
            start: true,
        });
    }
}