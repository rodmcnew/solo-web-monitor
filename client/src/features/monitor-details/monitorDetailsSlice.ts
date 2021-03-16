import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode } from '../../types';

export const monitorsSlice = createSlice({
    name: 'monitorDetails',
    initialState: {
        selectedMonitorId: null as string | null, //@TODO type better?
        detailsUiMode: DetailsUiMode.View, //@TODO type better, use enum?
    },
    reducers: {
        showCreateMonitorForm: (state) => {
            state.detailsUiMode = DetailsUiMode.Create;
            state.selectedMonitorId = null;
        },
        showMonitorDetails: (state, action: PayloadAction<string | null>) => {
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
});

export const {
    showMonitorDeleteForm,
    showMonitorDetails,
    showMonitorEditForm,
    showCreateMonitorForm
} = monitorsSlice.actions;


export const getDetailsUiMode = (state: RootState) => state.monitorDetails.detailsUiMode;

export const getSelectedMonitorId = (state: RootState) => state.monitorDetails.selectedMonitorId;

export default monitorsSlice.reducer;
