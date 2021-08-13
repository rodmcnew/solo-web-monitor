import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteMonitorMutation } from '../../api';
import { Monitor } from '../../types';
import { showMonitorDetails } from '../dashboard/dashboardSlice';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorBasicDetails } from '../monitor-details/MonitorBasicDetails';

interface Props {
    monitor: Monitor
}

export function DeleteMonitorConfirmPage({ monitor }: Props) {
    const dispatch = useDispatch();
    const [deleteMonitor, { status: mutationStatus }] = useDeleteMonitorMutation();

    const handleDelete = useCallback(() => {
        deleteMonitor(monitor.id)
    }, [monitor, deleteMonitor])

    const handleCancel = useCallback(() => {
        dispatch(showMonitorDetails(monitor.id))
    }, [monitor, dispatch]);

    // Set default focus to the delete button to improve user experience.
    let deleteSubmitButton = React.createRef<HTMLButtonElement>();
    useEffect(() => {
        if (deleteSubmitButton.current) {
            deleteSubmitButton.current.focus();
        }
        // deleteSubmitButton must not be in the deps so that this logic only happens on the first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monitor])

    //@TODO error message has too much side margin compared to the form when both show
    return <div className="card card-danger">
        <div className="card-header">
            <h3 className="card-title">Delete Monitor?</h3>
        </div>
        <div className="card-body">
            <div>
                {mutationStatus === QueryStatus.pending && <PanelBodySpinner />}
                {mutationStatus === QueryStatus.rejected && <PanelBodyNetworkError />}
                {mutationStatus !== QueryStatus.pending && monitor && <MonitorBasicDetails monitor={monitor} />}
            </div>
        </div>
        <div className="card-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-danger float-right" onClick={handleDelete} ref={deleteSubmitButton}>
                Delete Monitor
            </button>
        </div>
    </div>
}
