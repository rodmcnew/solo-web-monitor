import { MonitorStatus } from "../../../types/MonitorStatus";

export const monitorStatusDescriptions = {
  u: 'Up',
  d: 'Down',
  s: 'Started'
};

export function getMonitorStatusLabel(monitorStatus: MonitorStatus) {
  return monitorStatusDescriptions[monitorStatus];
}