import axios from "axios";
import { HTTP_API_BASE_URL } from "../../config";
import { MonitorEvent } from "../../types";

export const monitorEventsApi = {
    findByMonitorId: async (monitorId: string): Promise<MonitorEvent[]> => {
        const url = HTTP_API_BASE_URL + '/api/monitor-events?filter[where][monitorId]=' + monitorId;
        return (await axios.get<MonitorEvent[]>(url)).data;
    },
}