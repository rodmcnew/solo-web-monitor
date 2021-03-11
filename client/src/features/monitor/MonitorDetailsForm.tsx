import React, {useCallback, useEffect, useState} from 'react';
import {Monitor} from './MonitorType';
import {NewMonitor} from './NewMonitorType';
interface Props {
    monitor: Monitor | NewMonitor;
    onSubmit: (monitor: Monitor | NewMonitor) => void;
}

//@TODO auto generate <option label="Every 10 minutes" value="10">Every 10 minutes</option>?
//@TODO allow monitor interval and contacts edit
//@TODO add a cancel button
export function MonitorDetailsForm({monitor, onSubmit}: Props) {
    const [formData, setFormData] = useState(monitor);

    // If the monitor above us changes, change our form data to reflect this.
    useEffect(() => {
        setFormData(monitor);
    }, [monitor])

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, name: event.target.value})
    }, [formData])

    const handleUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, url: event.target.value})
    }, [formData])

    const handleIntervalChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, interval: Number(event.target.value)})
    }, [formData])

    const handleSubmit = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    }, [onSubmit, formData])

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
                    &nbsp;
                    <select
                    value={formData.interval}
                    onChange={handleIntervalChange}
                >
                    <option label="Every minute" value="1">Every minute</option>
                    <option label="Every 2 minutes" value="2">Every 2 minutes</option>
                    <option label="Every 5 minutes" value="5">Every 5 minutes</option>
                    <option label="Every 10 minutes" value="10">Every 10 minutes</option>
                    <option label="Every 15 minutes" value="15">Every 15 minutes</option>
                    <option label="Every 20 minutes" value="20">Every 20 minutes</option>
                    <option label="Every 30 minutes" value="30">Every 30 minutes</option>
                    <option label="Every 60 minutes" value="60">Every 60 minutes</option>
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

            <button type="submit" className="btn btn-primary pull-right">Save</button>
        </form >
    )
}

