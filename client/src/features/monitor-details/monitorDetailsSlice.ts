import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor, MonitorEvent } from '../../types';
import { monitorEventsApi } from '../monitor-events/monitorEventsApi';
import { fetchAllMonitors, getAllMonitors } from '../monitor/monitorsSlice';
export const monitorEventsAdapter = createEntityAdapter<MonitorEvent>({
    sortComparer: (a, b) => +new Date(b.date) - +new Date(a.date),
})

export const fetchMonitorsThenShowMonitorDetailsForAnyMonitor = createAsyncThunk(
    'monitors/showMonitorDetailsForAnyMonitorStatus',
    async (none: undefined, thunkApi) => {//@TODO none: undefined?
        await thunkApi.dispatch(fetchAllMonitors());
        await thunkApi.dispatch(showMonitorDetailsForAnyMonitor());
    }
);

export const showMonitorDetailsForAnyMonitor = createAsyncThunk(
    'monitors/showMonitorDetailsForAnyMonitorStatus',
    async (none: undefined, thunkApi) => {//@TODO none: undefined?
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
    async (monitorId: string, thunkApi) => {//@TODO config: undefined?
        // const selectedMonitorId = thunkApi.getState().monitorDetails.selectedMonitorId
        const monitorEvents = await monitorEventsApi.findByMonitorId(monitorId);
        return {
            monitorId,
            monitorEvents: monitorEvents
        }
    }
);

export const monitorDetailsSlice = createSlice({
    name: 'monitorDetails',//@TODO rename to selectedMonitor or something?
    initialState: {
        selectedMonitorId: null as string | null, //@TODO type better?
        selectedMonitorEvents: monitorEventsAdapter.getInitialState(),
        // selectedMonitorEventsLoaded: false,
        detailsUiMode: DetailsUiMode.View, //@TODO type better, use enum?
    },
    reducers: {
        showCreateMonitorForm: (state) => {
            state.detailsUiMode = DetailsUiMode.Create;
            state.selectedMonitorId = null;
            state.selectedMonitorEvents = monitorEventsAdapter.getInitialState(); //@TODO call removeAll() instead
        },
        // showMonitorDetails: (state, action: PayloadAction<string | null>) => {
        //     state.detailsUiMode = DetailsUiMode.View;
        //     state.selectedMonitorId = action.payload;
        //     state.selectedMonitorEvents = monitorEventsAdapter.getInitialState(); //@TODO call removeAll() instead
        // },
        showMonitorEditForm: (state, action: PayloadAction<string>) => {
            state.detailsUiMode = DetailsUiMode.Edit;
            state.selectedMonitorId = action.payload;
            state.selectedMonitorEvents = monitorEventsAdapter.getInitialState(); //@TODO call removeAll() instead
        },
        showMonitorDeleteForm: (state, action: PayloadAction<string>) => {
            state.detailsUiMode = DetailsUiMode.Delete;
            state.selectedMonitorId = action.payload;
            state.selectedMonitorEvents = monitorEventsAdapter.getInitialState(); //@TODO call removeAll() instead
        },
    },
    extraReducers: builder => builder
        .addCase(
            showMonitorDetails.fulfilled,
            (state, action: PayloadAction<{ monitorId: string, monitorEvents: MonitorEvent[] }>) => {
                state.detailsUiMode = DetailsUiMode.View;
                state.selectedMonitorId = action.payload.monitorId;
                monitorEventsAdapter.setAll(state.selectedMonitorEvents, action.payload.monitorEvents);
                // state.selectedMonitorEventsLoaded = true;
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

// Can create a set of memoized selectors based on the location of this entity state
const monitorEventSelectors = monitorEventsAdapter.getSelectors<RootState>((state) => state.monitorDetails.selectedMonitorEvents);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitorEvents = (state: RootState) => monitorEventSelectors.selectAll(state);

// export const getSelectedMonitorEventsLoaded = (state: RootState) => state.monitorDetails.selectedMonitorEventsLoaded;


export const monitorDetailsReducer = monitorDetailsSlice.reducer;
