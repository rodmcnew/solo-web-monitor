import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {MonitorEvent, MonitorEventRelations} from '../models';

export class MonitorEventRepository extends DefaultCrudRepository<
  MonitorEvent,
  typeof MonitorEvent.prototype.id,
  MonitorEventRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(MonitorEvent, dataSource);
  }
}
