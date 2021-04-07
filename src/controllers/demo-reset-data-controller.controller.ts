
import { inject, service } from '@loopback/core';

import { get, post, response, RestBindings, Response } from '@loopback/rest';
import { DemoDataServiceService } from '../services';
export class DemoResetDataControllerController {
  constructor(
    @service(DemoDataServiceService)
    public demoDataServiceService: DemoDataServiceService
  ) { }

  @post('/api/demo/reset-database')
  @response(204)
  async demoResetData() {
    await this.demoDataServiceService.setDatabaseToDemoData();
  }

  /**
   * This is used by the Github readme "try the demo" link.
   */
  @get('/demo/reset-database-and-redirect-home')
  async demoResetDataAndRedirectHome(@inject(RestBindings.Http.RESPONSE) response: Response) {
    await this.demoDataServiceService.setDatabaseToDemoData();
    response.redirect('/');
  }
}
