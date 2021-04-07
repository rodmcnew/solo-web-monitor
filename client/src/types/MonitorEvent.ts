import { MonitorStatus } from './MonitorStatus';

export interface MonitorEvent {
  id: string;
  date: Date;
  status: MonitorStatus;
  reason: string;
  latency: number;
  statusChanged: boolean;
}
