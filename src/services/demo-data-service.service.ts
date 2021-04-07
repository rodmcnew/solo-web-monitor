import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { MonitorStatus } from '../models';
import { MonitorEventRepository, MonitorRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class DemoDataServiceService {
  constructor(
    @repository(MonitorRepository)
    public monitorRepository: MonitorRepository,
    @repository(MonitorEventRepository)
    public monitorEventRepository: MonitorEventRepository,
  ) {
    this.setDatabaseToDemoData = this.setDatabaseToDemoData.bind(this);
  }

  async setDatabaseToDemoData() {
    this.monitorRepository.deleteAll();
    this.monitorEventRepository.deleteAll();

    const monitor1 = await this.monitorRepository.create({
      name: 'Google',
      url: 'https://google.com',
      interval: 1,
      status: MonitorStatus.Up
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
      this.monitorEventRepository.create({
        monitorId: monitor1.id,
        status: MonitorStatus.Up,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 60 * 1000),
        reason: 'Returned 200',
        statusChanged: false
      })
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
      const up = i % 2 !== 0;
      this.monitorEventRepository.create({
        monitorId: monitor1.id,
        status: up ? MonitorStatus.Up : MonitorStatus.Down,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 10 * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 60 * 1000)),
        reason: up ? 'Returned 200' : 'Returned 500',
        statusChanged: true
      })
    });

    const monitor2 = await this.monitorRepository.create({
      name: 'Yahoo',
      url: 'https://yahoo.down.localhost',
      interval: 1,
      status: MonitorStatus.Down
    });
    [1, 2, 3, 4, 5, 6, 7].map(i => {
      const up = i % 2 === 0;
      this.monitorEventRepository.create({
        monitorId: monitor2.id,
        status: up ? MonitorStatus.Up : MonitorStatus.Down,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 20 * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 60 * 1000)),
        reason: up ? 'Returned 200' : 'ENOTFOUND',
        statusChanged: true
      })
    });

    const monitor3 = await this.monitorRepository.create({
      name: 'Microsoft',
      url: 'https://microsoft.com',
      interval: 1,
      status: MonitorStatus.Up
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
      this.monitorEventRepository.create({
        monitorId: monitor3.id,
        status: MonitorStatus.Up,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 60 * 1000),
        reason: 'Returned 200',
        statusChanged: false
      })
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      const up = i % 2 !== 0;
      this.monitorEventRepository.create({
        monitorId: monitor3.id,
        status: up ? MonitorStatus.Up : MonitorStatus.Down,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 30 * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 60 * 1000)),
        reason: up ? 'Returned 200' : 'Returned 500',
        statusChanged: true
      })
    });

    const monitor4 = await this.monitorRepository.create({
      name: 'Oracle',
      url: 'https://oracle.down.localhost',
      interval: 1,
      status: MonitorStatus.Down
    });
    [1, 2, 3, 4, 5, 6, 7].map(i => {
      const up = i % 2 === 0;
      this.monitorEventRepository.create({
        monitorId: monitor4.id,
        status: up ? MonitorStatus.Up : MonitorStatus.Down,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 20 * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 60 * 1000)),
        reason: up ? 'Returned 200' : 'ENOTFOUND',
        statusChanged: true
      })
    });

    const monitor5 = await this.monitorRepository.create({
      name: 'Reuters',
      url: 'https://reuters.com',
      interval: 1,
      status: MonitorStatus.Up
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
      this.monitorEventRepository.create({
        monitorId: monitor5.id,
        status: MonitorStatus.Up,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 60 * 1000),
        reason: 'Returned 200',
        statusChanged: false
      })
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
      const up = i % 2 !== 0;
      this.monitorEventRepository.create({
        monitorId: monitor5.id,
        status: up ? MonitorStatus.Up : MonitorStatus.Down,
        latency: Math.floor(Math.random() * 1000),
        date: new Date((new Date)).getTime() - (i * 10 * 24 * 60 * 60 * 1000 - Math.floor(Math.random() * 60 * 1000)),
        reason: up ? 'Returned 200' : 'Returned 500',
        statusChanged: true
      })
    });
  }
}
