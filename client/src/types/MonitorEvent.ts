import {MonitorStatus} from './MonitorStatus';

export interface MonitorEvent {//@TODO move to types folder or something
  id: string;
  date: Date;
  status: MonitorStatus;
  reason: string;
  latency: number;
  statusChanged: boolean;
}
