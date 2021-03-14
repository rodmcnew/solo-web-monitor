import React, { useCallback } from 'react';
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
    }, [monitor.id])
    return (
        <div>
            <MonitorBasicDetails monitor={monitor} />
            <br />
            <button type="button" className="btn btn-default" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-danger pull-right" onClick={handleDelete}>Delete Monitor</button>
        </div>
    )
}

