import axios from "axios";
import { HTTP_API_BASE_URL } from "../../config";

export const demoApi = { //@TODO get rid of axios? do this with rtkq?
    resetDatabase: async (): Promise<void> => {
        return await axios.post(HTTP_API_BASE_URL + '/api/demo/reset-database');
    },
}