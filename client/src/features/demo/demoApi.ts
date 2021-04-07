import axios from "axios";
import { HTTP_API_BASE_URL } from "../../config";

export const demoApi = {
    resetDatabase: async (): Promise<void> => {
        return await axios.post(HTTP_API_BASE_URL + '/api/demo/reset-database');
    },
}