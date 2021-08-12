//@TODO check if this should be a single file or more and figure out what file path, file name, and main export name it should have
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Monitor } from './types'
import { HTTP_API_BASE_URL } from './config';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api', //@TODO is this right?
    baseQuery: fetchBaseQuery({ baseUrl: HTTP_API_BASE_URL }),
    tagTypes: ['Monitor'],
    endpoints: (build) => ({
        // create: async (monitor: NewMonitor): Promise<Monitor> => {
        //     return (await axios.post<Monitor>(HTTP_API_BASE_URL + '/api/monitors/', monitor)).data;
        // },
        // delete: async (id: string) => {
        //     await axios.delete(HTTP_API_BASE_URL + '/api/monitors/' + id);
        // },
        getMonitors: build.query<Monitor[], void>({
            query: () => '/api/monitors',
            providesTags: [{ type: 'Monitor', id: 'LIST' }] //@TODO 'LIST'?
        }),
        deleteMonitor: build.mutation<Monitor[], string>({
            query: (id: string) => ({ url: `/api/monitors/${id}`, method: 'delete' }),
            invalidatesTags: (result, error, arg) => [{ type: 'Monitor', id: arg }, { type: 'Monitor', id: 'LIST' }] //@TODO 'LIST'?
        }),
        // updateById: async (id: string, monitor: Partial<Monitor>): Promise<Monitor> => {
        //     return (await axios.patch<Monitor>(HTTP_API_BASE_URL + '/api/monitors/' + id, monitor)).data;
        // }
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMonitorsQuery, useDeleteMonitorMutation } = api