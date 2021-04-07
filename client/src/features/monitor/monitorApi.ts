import axios from "axios";
import { HTTP_API_BASE_URL } from "../../config";
import { Monitor, NewMonitor } from "../../types";

export const monitorApi = {
    create: async (monitor: NewMonitor): Promise<Monitor> => {
        return (await axios.post<Monitor>(HTTP_API_BASE_URL + '/api/monitors/', monitor)).data;
    },
    delete: async (id: string) => {
        await axios.delete(HTTP_API_BASE_URL + '/api/monitors/' + id);
    },
    findAll: async () => {
        return (await axios.get<Monitor[]>(HTTP_API_BASE_URL + '/api/monitors')).data;
    },
    updateById: async (id: string, monitor: Partial<Monitor>): Promise<Monitor> => {
        return (await axios.patch<Monitor>(HTTP_API_BASE_URL + '/api/monitors/' + id, monitor)).data;
    }
}