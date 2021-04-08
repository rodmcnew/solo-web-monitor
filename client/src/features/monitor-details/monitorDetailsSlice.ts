import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor, MonitorEvent, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { monitorEventsApi } from '../monitor-events/monitorEventsApi';
import { monitorApi } from '../monitor/monitorApi';
import { monitorSelectors, fetchAllMonitors, getAllMonitors, deleteMonitorFulfilled, createMonitorFulfilled, patchMonitorFulfilled } from '../monitor/monitorsSlice';

