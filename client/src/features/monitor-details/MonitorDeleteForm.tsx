import React, { useCallback, useEffect } from 'react';
import { Monitor } from '../../types';
import { MonitorBasicDetails } from './MonitorBasicDetails';

interface Props {
    monitor: Monitor,
    onCancel: () => void
    onDelete: (monitorId: string) => void
}

export function MonitorDeleteForm({ monitor, onCancel, onDelete }: Props) {
    const handleDelete = useCallback(() => {
        onDelete(monitor.id);
    }, [monitor.id, onDelete])

    let deleteSubmitButton = React.createRef<HTMLButtonElement>();
    useEffect(() => {
        if (deleteSubmitButton.current) {
            deleteSubmitButton.current.focus();
        }
    }, [deleteSubmitButton, monitor.id])

    return (
        <div>
            <MonitorBasicDetails monitor={monitor} />
            <br />
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-danger float-right" onClick={handleDelete} ref={deleteSubmitButton}>Delete Monitor</button>
        </div>
    )
}
