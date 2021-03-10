import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {MonitorPing, MonitorPingRelations} from '../models';

export class MonitorPingRepository extends DefaultCrudRepository<
  MonitorPing,
  typeof MonitorPing.prototype.id,
  MonitorPingRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(MonitorPing, dataSource);
  }
}
