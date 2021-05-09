import { injectable, BindingScope } from '@loopback/core';

import { repository } from '@loopback/repository';
import { MonitorEventRepository } from '../repositories';

@injectable({ scope: BindingScope.SINGLETON })
export class DatabaseCleanerService {
  constructor(
    @repository(MonitorEventRepository)
    public monitorEventRepository: MonitorEventRepository,
  ) {
    this.cleanOldMonitorEvents = this.cleanOldMonitorEvents.bind(this);
  }

  public async cleanOldMonitorEvents() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    (await this.monitorEventRepository.find({ where: { date: { lt: oneYearAgo } } })).forEach(monitorEvent => {
      this.monitorEventRepository.delete(monitorEvent);
    });
  }
}
