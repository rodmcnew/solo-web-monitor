import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor } from '../../types';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { //@TODO remove/deal with some of these such as mutatingMonitor stuff
    selectedMonitorId: null as string | null,
    detailsUiMode: DetailsUiMode.View,
  },
  reducers: {
    showCreateMonitorForm: (state) => {
      state.detailsUiMode = DetailsUiMode.Create;
      state.selectedMonitorId = null;
    },
    showMonitorDetails: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.View;
      state.selectedMonitorId = action.payload;
    },
    showMonitorEditForm: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.Edit;
      state.selectedMonitorId = action.payload;
    },
    showMonitorDeleteForm: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.Delete;
      state.selectedMonitorId = action.payload;
    },
  },
  extraReducers: builder => builder
    .addMatcher(
      api.endpoints.getMonitors.matchFulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        // If there is no selected monitor, select the first one and show it's details view
        if (state.selectedMonitorId === null && action.payload.length > 0) {
          state.selectedMonitorId = action.payload[0].id;
          state.detailsUiMode = DetailsUiMode.View;
        }
      })
    .addMatcher(
      api.endpoints.deleteMonitor.matchFulfilled,
      (state, action: PayloadAction<string>) => {//@TODO not string? why?
        //@ts-ignore //@TODO
        const deletedMonitorId = action.meta.arg.originalArgs;
        // If we deleted the selected monitor, un-select it.
        if (state.selectedMonitorId === deletedMonitorId) {
          state.selectedMonitorId = null;
        }
      })
    .addMatcher(
      api.endpoints.updateMonitor.matchFulfilled,
      (state, action: PayloadAction<Monitor>) => {
        // We just successfully updated a monitor so show its details
        state.selectedMonitorId = action.payload.id;
        state.detailsUiMode = DetailsUiMode.View;
      })
    .addMatcher(
      api.endpoints.createMonitor.matchFulfilled,
      (state, action: PayloadAction<Monitor>) => {
        // We just successfully created a monitor so show its details
        state.selectedMonitorId = action.payload.id;
        state.detailsUiMode = DetailsUiMode.View;
      })
});

export default dashboardSlice.reducer;

export const {
  showMonitorDetails,
  showMonitorDeleteForm,
  showMonitorEditForm,
  showCreateMonitorForm
} = dashboardSlice.actions;


export const getDetailsUiMode = (state: RootState) => state.dashboard.detailsUiMode;

export const getSelectedMonitorId = (state: RootState): string | null => state.dashboard.selectedMonitorId;