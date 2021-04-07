
import { inject, service } from '@loopback/core';

import { post, Response, RestBindings, response } from '@loopback/rest';
import { DemoDataServiceService } from '../services';
export class DemoResetDataControllerController {
  constructor(
    @service(DemoDataServiceService)
    public demoDataServiceService: DemoDataServiceService
  ) { }

  @post('/api/demo/reset-database')
  @response(204)
  async demoResetData() {
    //@TODO disable if not in demo mode?
    await this.demoDataServiceService.setDatabaseToDemoData();
  }
}
