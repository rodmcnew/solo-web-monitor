import { CronJob, cronJob } from '@loopback/cron';
import { service } from '@loopback/core';
import { DatabaseCleanerService } from '../services';

@cronJob()
export class DatabaseCleanerCronJob extends CronJob {
    constructor(
        @service(DatabaseCleanerService)
        protected cleanerService: DatabaseCleanerService
    ) {
        super({
            cronTime: '0 0 8 * * *', // Once a day around 3am
            onTick: cleanerService.cleanOldMonitorEvents,
            start: true,
        });
    }
}