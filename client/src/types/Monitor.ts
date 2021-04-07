import {MonitorStatus} from './MonitorStatus';

export interface Monitor {
  id: string;
  name: string;
  url: string;
  interval: number;
  status: MonitorStatus;
}
