import React, { useCallback, useEffect } from 'react';
import { Monitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { PanelBodyNetworkError } from '../loading-and-errors/PanelBodyNetworkError';
import { PanelBodySpinner } from '../loading-and-errors/PanelBodySpinner';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor;
    onCancel: () => void;
    onDelete: (monitorId: string) => void;
    operationStatus: OperationStatus;
}

export function MonitorDeleteForm({ monitor, onCancel, onDelete, operationStatus }: Props) {
    const handleDelete = useCallback(() => {
        onDelete(monitor.id);
    }, [monitor.id, onDelete])

    let deleteSubmitButton = React.createRef<HTMLButtonElement>();
    useEffect(() => {
        if (deleteSubmitButton.current) {
            deleteSubmitButton.current.focus();
        }
    }, [deleteSubmitButton, monitor.id])

    return <div>
        {operationStatus === OperationStatus.Loading && <PanelBodySpinner />}
        {operationStatus === OperationStatus.Error && <PanelBodyNetworkError />}
        {operationStatus === OperationStatus.Done &&
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
