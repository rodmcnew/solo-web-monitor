
import { inject, service } from '@loopback/core';

import { get, Response, RestBindings } from '@loopback/rest';
import { DemoDataServiceService } from '../services';
export class DemoResetDataControllerController {
  constructor(
    @service(DemoDataServiceService)
    public demoDataServiceService: DemoDataServiceService
  ) { }
  @get('/demo/reset-data')
  async demoResetData(@inject(RestBindings.Http.RESPONSE) response: Response) {
    //@TODO disable if not in demo mode?
    await this.demoDataServiceService.setDatabaseToDemoData();
    response.redirect('/');
  }
}
