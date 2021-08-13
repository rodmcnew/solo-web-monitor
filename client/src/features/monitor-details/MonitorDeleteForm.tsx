import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteMonitorMutation } from '../../api';
import { showMonitorDetails } from '../dashboard/dashboardSlice';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { useSelectedMonitor } from '../monitor/useSelectedMonitor';
import { MonitorBasicDetails } from './MonitorBasicDetails';

export function MonitorDeleteForm() {
    const { monitor } = useSelectedMonitor();
    const dispatch = useDispatch();
    const [deleteMonitor, { status: mutationStatus }] = useDeleteMonitorMutation();

    const handleDelete = useCallback(() => {
        monitor && deleteMonitor(monitor.id)
    }, [monitor, deleteMonitor])

    const handleCancel = useCallback(() => {
        monitor && dispatch(showMonitorDetails(monitor.id))
    }, [monitor, dispatch]);

    let deleteSubmitButton = React.createRef<HTMLButtonElement>();
    useEffect(() => {
        if (deleteSubmitButton.current) {
            deleteSubmitButton.current.focus();
        }
    }, [deleteSubmitButton, monitor])

    //@TODO error message has too much side margin compared to the form when both show
    return <div>
        {mutationStatus === QueryStatus.pending && <PanelBodySpinner />}
        {mutationStatus === QueryStatus.rejected && <PanelBodyNetworkError />}
        {mutationStatus !== QueryStatus.pending && monitor &&
            <>
                <MonitorBasicDetails monitor={monitor} />
                <div className="mt-3">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-danger float-right" onClick={handleDelete} ref={deleteSubmitButton}>
                        Delete Monitor
                    </button>
                </div>
            </>
        }
    </div>
}
