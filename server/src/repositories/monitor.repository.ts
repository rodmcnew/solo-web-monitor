import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Monitor, MonitorRelations} from '../models';

export class MonitorRepository extends DefaultCrudRepository<
  Monitor,
  typeof Monitor.prototype.id,
  MonitorRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Monitor, dataSource);
  }
}
