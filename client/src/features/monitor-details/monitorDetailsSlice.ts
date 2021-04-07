import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor, MonitorEvent } from '../../types';
import { monitorEventsApi } from '../monitor-events/monitorEventsApi';
import { monitorSelectors, fetchAllMonitors, getAllMonitors } from '../monitor/monitorsSlice';
export const monitorEventsAdapter = createEntityAdapter<MonitorEvent>({
    sortComparer: (a, b) => +new Date(b.date) - +new Date(a.date),
})

export const fetchMonitorsThenShowMonitorDetailsForAnyMonitor = createAsyncThunk(
    'monitors/showMonitorDetailsForAnyMonitorStatus',
    async (returned: undefined, thunkApi) => {
        await thunkApi.dispatch(fetchAllMonitors());
        await thunkApi.dispatch(showMonitorDetailsForAnyMonitor());
    }
);

export const showMonitorDetailsForAnyMonitor = createAsyncThunk(
    'monitors/showMonitorDetailsForAnyMonitorStatus',
    async (returned: undefined, thunkApi) => {
        const allMonitors = getAllMonitors(thunkApi.getState() as RootState);
        const selectedMonitorId = getSelectedMonitorId(thunkApi.getState() as RootState);
        const selectedMonitor = allMonitors.find(monitor => monitor.id === selectedMonitorId)
            || allMonitors.find(() => true)
            || null;
        if (selectedMonitor !== null) {
            await thunkApi.dispatch(showMonitorDetails(selectedMonitor.id));
        } else {
            await thunkApi.dispatch(showCreateMonitorForm());
        }
    }
);

export const showMonitorDetails = createAsyncThunk(
    'monitors/fetchSelectedMonitorEventsStatus',
    async (monitorId: string) => {
        const monitorEvents = await monitorEventsApi.findByMonitorId(monitorId);
        return {
            monitorId,
            monitorEvents: monitorEvents
        }
    }
);

export const monitorDetailsSlice = createSlice({
    name: 'monitorDetails',
    initialState: {
        selectedMonitorId: null as string | null,
        selectedMonitorEvents: monitorEventsAdapter.getInitialState(),
        detailsUiMode: DetailsUiMode.View,
    },
    reducers: {
        showCreateMonitorForm: (state) => {
            state.detailsUiMode = DetailsUiMode.Create;
            state.selectedMonitorId = null;
            state.selectedMonitorEvents = monitorEventsAdapter.removeAll(state.selectedMonitorEvents);
        },
        showMonitorEditForm: (state, action: PayloadAction<string>) => {
            state.detailsUiMode = DetailsUiMode.Edit;
            state.selectedMonitorId = action.payload;
            state.selectedMonitorEvents = monitorEventsAdapter.removeAll(state.selectedMonitorEvents);
        },
        showMonitorDeleteForm: (state, action: PayloadAction<string>) => {
            state.detailsUiMode = DetailsUiMode.Delete;
            state.selectedMonitorId = action.payload;
            state.selectedMonitorEvents = monitorEventsAdapter.removeAll(state.selectedMonitorEvents);
        },
    },
    extraReducers: builder => builder
        .addCase(
            showMonitorDetails.fulfilled,
            (state, action: PayloadAction<{ monitorId: string, monitorEvents: MonitorEvent[] }>) => {
                state.detailsUiMode = DetailsUiMode.View;
                state.selectedMonitorId = action.payload.monitorId;
                monitorEventsAdapter.setAll(state.selectedMonitorEvents, action.payload.monitorEvents);
            })
});

export const {
    showMonitorDeleteForm,
    // showMonitorDetails,
    showMonitorEditForm,
    showCreateMonitorForm
} = monitorDetailsSlice.actions;


export const getDetailsUiMode = (state: RootState) => state.monitorDetails.detailsUiMode;

export const getSelectedMonitorId = (state: RootState): string | null => state.monitorDetails.selectedMonitorId;

export const getSelectedMonitor = (state: RootState): Monitor | null =>
    monitorSelectors.selectAll(state).find(monitor => monitor.id === state.monitorDetails.selectedMonitorId) || null;

// Can create a set of memoized selectors based on the location of this entity state
const monitorEventSelectors = monitorEventsAdapter.getSelectors<RootState>((state) => state.monitorDetails.selectedMonitorEvents);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitorEvents = (state: RootState) => monitorEventSelectors.selectAll(state);

// export const getSelectedMonitorEventsLoaded = (state: RootState) => state.monitorDetails.selectedMonitorEventsLoaded;


export const monitorDetailsReducer = monitorDetailsSlice.reducer;
