import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HTTP_API_BASE_URL } from './config';
import { Monitor, MonitorEvent } from './types';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: HTTP_API_BASE_URL }),
    tagTypes: ['Monitor', 'MonitorEvents'],
    endpoints: (build) => ({
        createMonitor: build.mutation<Monitor, Partial<Monitor>>({
            query: (data) => ({
                url: '/api/monitors',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Monitor', id: 'LIST' }]
        }),
        getMonitor: build.query<Monitor, string>({
            query: (id) => `/api/monitors/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Monitor', id: arg }]
        }),
        getMonitors: build.query<Monitor[], void>({
            query: () => '/api/monitors',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Monitor' as const, id })),
                        { type: 'Monitor', id: 'LIST' },
                    ]
                    : [{ type: 'Monitor', id: 'LIST' }],

        }),
        updateMonitor: build.mutation<Monitor, Partial<Monitor>>({
            query: (data) => ({
                url: `/api/monitors/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Monitor', id: arg.id }, { type: 'Monitor', id: 'LIST' }]
        }),
        deleteMonitor: build.mutation<undefined, string>({
            query: (id: string) => ({ url: `/api/monitors/${id}`, method: 'DELETE' }),
            invalidatesTags: (result, error, arg) => [{ type: 'Monitor', id: arg }, { type: 'Monitor', id: 'LIST' }],
        }),
        getMonitorEventsByMonitorId: build.query<MonitorEvent[], string>({
            query: (monitorId) => `/api/monitor-events?filter[where][monitorId]=${monitorId}`,
            providesTags: (result, error, arg) => [{ type: 'MonitorEvents', monitorId: arg }]
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateMonitorMutation, useGetMonitorQuery, useGetMonitorsQuery, useUpdateMonitorMutation, useDeleteMonitorMutation,
    useGetMonitorEventsByMonitorIdQuery
} = api