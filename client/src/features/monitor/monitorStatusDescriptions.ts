import { MonitorStatus } from "../../types/MonitorStatus";

//@TODO is there a way to just use the enum instead of this?
export const monitorStatusDescriptions = {
  u: 'Up',
  d: 'Down',
  s: 'Started'
};

export function getMonitorStatusLabel(monitorStatus: MonitorStatus) {
  return monitorStatusDescriptions[monitorStatus];
}