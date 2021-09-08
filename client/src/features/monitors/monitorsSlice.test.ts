import { api } from '../../api';
import { DetailsUiMode } from '../../types';
import monitorsSlice, { showCreateMonitorForm, showMonitorDeleteForm, showMonitorDetails, showMonitorEditForm } from './monitorsSlice';
jest.mock('../../api');

const reducer = monitorsSlice;
const monitorId = 'fha8sd3d';

describe('monitorsSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('shows the create monitor form', () => {
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      showCreateMonitorForm()
    )).toEqual({
      detailsUiMode: DetailsUiMode.Create,
      selectedMonitorId: null
    });
  });

  test('shows monitor details', () => {
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      showMonitorDetails(monitorId)
    )).toEqual({
      detailsUiMode: DetailsUiMode.View,
      selectedMonitorId: monitorId
    });
  });

  test('shows monitor edit form', () => {
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      showMonitorEditForm(monitorId)
    )).toEqual({
      detailsUiMode: DetailsUiMode.Edit,
      selectedMonitorId: monitorId
    });
  });

  test('shows monitor delete form', () => {
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      showMonitorDeleteForm(monitorId)
    )).toEqual({
      detailsUiMode: DetailsUiMode.Delete,
      selectedMonitorId: monitorId
    });
  });

  test('when getMonitors is fulfilled, it selects the first monitor if none is selected', () => {
    const actionType = 'test/getMonitors/matchFulfilled';
    //@ts-ignore 
    api.endpoints.getMonitors.matchFulfilled.mockImplementation((action: any) => action.type === actionType);
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      { type: actionType, payload: [{ id: monitorId }, { id: 'otherId' }] }
    )).toEqual({
      detailsUiMode: DetailsUiMode.View,
      selectedMonitorId: monitorId
    });
  });

  test('when deleteMonitor is fulfilled, and we deleted the selected monitor, un-select it', () => {
    const actionType = 'test/deleteMonitor/matchFulfilled';
    //@ts-ignore 
    api.endpoints.deleteMonitor.matchFulfilled.mockImplementation((action: any) => action.type === actionType);
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      { type: actionType, meta: { arg: { originalArgs: monitorId } } }
    )).toEqual({
      detailsUiMode: DetailsUiMode.View,
      selectedMonitorId: null
    });
  });

  test('when updateMonitor is fulfilled, show its details', () => {
    const actionType = 'test/updateMonitor/matchFulfilled';
    //@ts-ignore 
    api.endpoints.updateMonitor.matchFulfilled.mockImplementation((action: any) => action.type === actionType);
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      { type: actionType, payload: { id: monitorId } }
    )).toEqual({
      detailsUiMode: DetailsUiMode.View,
      selectedMonitorId: monitorId
    });
  });

  test('when createMonitor is fulfilled, show its details', () => {
    const actionType = 'test/createMonitor/matchFulfilled';
    //@ts-ignore 
    api.endpoints.createMonitor.matchFulfilled.mockImplementation((action: any) => action.type === actionType);
    expect(reducer(
      { selectedMonitorId: null, detailsUiMode: DetailsUiMode.View },
      { type: actionType, payload: { id: monitorId } }
    )).toEqual({
      detailsUiMode: DetailsUiMode.View,
      selectedMonitorId: monitorId
    });
  });
})