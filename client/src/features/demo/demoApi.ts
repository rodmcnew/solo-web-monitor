import axios from "axios";
import { HTTP_API_BASE_URL } from "../../config";

export const demoApi = {
    resetDatabase: async (): Promise<void> => {
        await fetch(HTTP_API_BASE_URL + '/api/demo/reset-database', { method: 'POST' });
    },
}