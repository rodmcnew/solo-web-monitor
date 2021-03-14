import {MonitorStatus} from './MonitorStatus';

export interface Monitor {//@TODO move to types folder or something
  id: string,
  name: string,
  url: string,
  interval: number,
  status: MonitorStatus
}
