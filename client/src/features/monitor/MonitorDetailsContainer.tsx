import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MonitorDetailsDisplay} from './MonitorDetailsDisplay';
import {MonitorDetailsForm} from './MonitorDetailsForm';
import {createMonitor, getAllMonitors, getDetailsUiMode, getGelectedMonitorId, getInitialMonitorFetchDone, patchMonitor, showCreateMonitorForm} from './monitorSlice';
import {Monitor} from './MonitorType';
import {NewMonitor} from './NewMonitorType';
export function MonitorDetailsContainer() {
  const dispatch = useDispatch();
  const detailsUiMode = useSelector(getDetailsUiMode);
  const selectedMonitorId = useSelector(getGelectedMonitorId);
  const monitors = useSelector(getAllMonitors);
  const initialMonitorFetchDone = useSelector(getInitialMonitorFetchDone);
  //@TODO move this to the slice file? or at least memoize?
  const selectedMonitor = monitors.find(monitor => monitor.id === selectedMonitorId) || null;
  const newMonitorTemplate = {name: '', url: '', interval: 5};

  //@TODO should this kind of logic be here?
  //If there are no monitors, show the "create monitor" form.
  useEffect(() => {
    if (initialMonitorFetchDone && monitors.length === 0) {
      dispatch(showCreateMonitorForm());
    }
  }, [monitors])

  const handleNewMonitorSubmit = useCallback((monitor: NewMonitor) => {
    console.log('handleNewMonitorSubmit', monitor);
    dispatch(createMonitor(monitor))
  }, [dispatch])

  const handleMonitorEditSubmit = useCallback((monitor: Monitor | NewMonitor) => {
    //@ts-ignore   //@TODO fix types? maybe use <>?
    dispatch(patchMonitor(monitor));
  }, [dispatch])

  return <div>
    {detailsUiMode === 'create' &&
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Create New Monitor</h3>
        </div>
        <div className="panel-body">
          <MonitorDetailsForm monitor={newMonitorTemplate} onSubmit={handleNewMonitorSubmit} />
        </div>
      </div>
    }
    {detailsUiMode === 'view' && selectedMonitor !== null &&
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Selected Monitor</h3>
        </div>
        <div className="panel-body">
          <MonitorDetailsDisplay monitor={selectedMonitor} />
        </div>
      </div>
    }
    {detailsUiMode === 'edit' && selectedMonitor !== null &&
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Edit Monitor</h3>
        </div>
        <div className="panel-body">
          <MonitorDetailsForm monitor={selectedMonitor} onSubmit={handleMonitorEditSubmit} />
        </div>
      </div>
    }
  </div>
}
