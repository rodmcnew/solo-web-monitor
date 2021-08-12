import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import React, { useCallback, useEffect } from 'react';
import { Monitor } from '../../types';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor;
    onCancel: () => void;
    onDelete: (monitorId: string) => void;
    mutationStatus: QueryStatus;
}

export function MonitorDeleteForm({ monitor, onCancel, onDelete, mutationStatus }: Props) {
    const handleDelete = useCallback(() => {
        onDelete(monitor.id);
    }, [monitor.id, onDelete])

    let deleteSubmitButton = React.createRef<HTMLButtonElement>();
    useEffect(() => {
        if (deleteSubmitButton.current) {
            deleteSubmitButton.current.focus();
        }
    }, [deleteSubmitButton, monitor.id])

    //@TODO error message has too much side margin compared to the form when both show
    return <div>
        {mutationStatus === QueryStatus.pending && <PanelBodySpinner />}
        {mutationStatus === QueryStatus.rejected && <PanelBodyNetworkError />}
        {mutationStatus !== QueryStatus.pending &&
            <>
                <MonitorBasicDetails monitor={monitor} />
                <div className="mt-3">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-danger float-right" onClick={handleDelete} ref={deleteSubmitButton}>Delete Monitor</button>
                </div>
            </>
        }
    </div>
}
