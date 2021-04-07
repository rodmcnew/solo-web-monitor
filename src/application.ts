import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, BindingKey, createBindingFromClass } from '@loopback/core';
import { CronComponent } from '@loopback/cron';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { MonitorCheckerCronJob } from './cron/MonitorCheckerCron';
import { DemoDataServiceService } from './services';
export { ApplicationConfig };

export class SoloWebMonitorApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up home page
    this.static('/', path.join(__dirname, '../client/build'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.component(CronComponent);
    this.add(createBindingFromClass(MonitorCheckerCronJob));

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    setTimeout(() => {
      // Reset the database to the demo data upon app boot
      this.get<DemoDataServiceService>('services.DemoDataServiceService').then(service => service.setDatabaseToDemoData());
    }, 100)
  }
}

