import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NewMonitor } from '../../types';
import { monitorIntervals } from '../monitor/monitorIntervals';
interface Props<MonitorType extends NewMonitor> {
    monitor: MonitorType;
    onSubmit: (monitor: MonitorType) => void;
    onCancel: () => void;
}

export function MonitorDetailsForm<MonitorType extends NewMonitor>({ monitor, onSubmit, onCancel }: Props<MonitorType>) {
    const [formData, setFormData] = useState(monitor);

    // If the monitor above us changes, change our form data to reflect this.
    useEffect(() => {
        const incomingId = 'id' in monitor ? monitor.id : null;
        const formDataId = 'id' in formData ? formData.id : null;
        //Ensure that monitor status updates don't constantly reset the form data
        if (incomingId !== formDataId) {
            setFormData(monitor);
        }
    }, [monitor, formData])

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: event.target.value })
    }, [formData])

    const handleUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, url: event.target.value })
    }, [formData])

    const handleIntervalChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, interval: Number(event.target.value) })
    }, [formData])

    const handleSubmit = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    }, [onSubmit, formData])

    const monitorIntervalSelectOptions = useMemo(() => {
        return monitorIntervals.map(interval =>
            <option key={interval.value} value={interval.value}>{interval.label}</option>
        )
    }, []);

    let nameInputElement = React.createRef<HTMLInputElement>();
    useEffect(() => {
        if (nameInputElement.current) {
            nameInputElement.current.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monitor])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    ref={nameInputElement}
                    onChange={handleNameChange}
                    value={formData.name}
                    type="text"
                    className="form-control" id="name" />
            </div>
            <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                    onChange={handleUrlChange}
                    value={formData.url}
                    type="text"
                    className="form-control" id="url" />
            </div>
            <div className="form-group">
                <label htmlFor="interval">Monitoring Interval</label>
                    &nbsp;&nbsp;
                    <select
                    value={formData.interval}
                    onChange={handleIntervalChange}
                >
                    {monitorIntervalSelectOptions}
                </select>
            </div>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary float-right">Save</button>
        </form >
    )
}

