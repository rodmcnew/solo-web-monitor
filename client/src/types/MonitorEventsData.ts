import { MonitorEvent } from "./MonitorEvent";
import { OperationStatus } from "./OperationStatus";

export interface MonitorEventsData {
    loadingStatus: OperationStatus;
    events: MonitorEvent[];
    lastFetchedDate: Date | null;
}