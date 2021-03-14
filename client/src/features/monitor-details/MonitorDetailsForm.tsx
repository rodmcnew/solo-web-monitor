import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Monitor, NewMonitor } from '../../types';
import { monitorIntervals } from '../monitor/monitorIntervals';
interface Props {
    monitor: Monitor | NewMonitor;
    onSubmit: (monitor: Monitor | NewMonitor) => void;
    onCancel: () => void;
}

//@TODO auto generate <option label="Every 10 minutes" value="10">Every 10 minutes</option>?
//@TODO allow monitor interval and contacts edit
//@TODO add a cancel button
export function MonitorDetailsForm({ monitor, onSubmit, onCancel }: Props) {
    const [formData, setFormData] = useState(monitor);

    // If the monitor above us changes, change our form data to reflect this.
    useEffect(() => {
        const incomingId = 'id' in monitor ? monitor.id : null;
        const formDataId = 'id' in formData ? formData.id : null;
        //Ensure that monitor status updates don't constantly reset the form data
        if (incomingId !== formDataId) {
            setFormData(monitor);
        }
    }, [monitor])

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
    }, [monitorIntervals]);

    return (
        <form role="form" onSubmit={handleSubmit}>
            {/* {this.props.errorMessage &&
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
            } */}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
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

            {/* <div className="form-group">
                <label>Contacts to Alert</label>
                {this.props.contacts.map((contact, i) =>
                    <div key={i}>
                        <label style={{fontWeight: 'normal'}}>
                            <input type="checkbox"
                                checked={this.state.contactIds.indexOf(contact.id) !== -1}
                                value="1"
                                onChange={(event) => this.handleContactCheckChange(event.target.checked, contact.id)} />
                            <span>&nbsp;</span>
                            <span className="ng-binding">{contact.email}</span>
                        </label>
                    </div>
                )}
            </div> */}
            <button type="button" className="btn btn-default" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary pull-right">Save</button>
        </form >
    )
}

