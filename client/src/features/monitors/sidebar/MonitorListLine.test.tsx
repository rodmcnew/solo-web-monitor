import { render, screen } from '@testing-library/react';
import React from 'react';
import { Monitor } from '../../../types';
import { MonitorStatus } from '../../../types/MonitorStatus';
import { MonitorListLine } from './MonitorListLine';

const monitor = {
  id: 'ya7f9q32ta24',
  name: 'Fun Site',
  url: 'https://funsite.com',
  interval: 60,
  status: MonitorStatus.Up
}

const onDeleteMonitor = jest.fn();
const onSelectMonitor = jest.fn();
const onEditMonitor = jest.fn();

const renderMonitorListLine = (monitor: Monitor, selectedMonitorId: string) => {
  return render(<table>
    <tbody>
      <MonitorListLine
        monitor={monitor}
        onDeleteMonitor={onDeleteMonitor}
        onEditMonitor={onEditMonitor}
        onSelectMonitor={onSelectMonitor}
        selectedMonitorId={selectedMonitorId}
      />
    </tbody>
  </table>);
}

test('calls onDeleteMonitor properly when delete button is clicked', () => {
  renderMonitorListLine(monitor, monitor.id);
  screen.getByTitle('Delete Monitor').click()
  expect(onDeleteMonitor).toHaveBeenCalledWith(monitor.id);
  expect(onEditMonitor).not.toHaveBeenCalled();
  expect(onSelectMonitor).not.toHaveBeenCalled();
});

describe('MonitorListLine', () => {
  test('calls onEditMonitor properly when edit button is clicked', () => {
    renderMonitorListLine(monitor, monitor.id);
    screen.getByTitle('Edit Monitor').click()
    expect(onDeleteMonitor).not.toHaveBeenCalled();
    expect(onEditMonitor).toHaveBeenCalledWith(monitor.id);
    expect(onSelectMonitor).not.toHaveBeenCalled();
  });

  test('calls onSelectMonitor properly when monitor name is clicked', () => {
    renderMonitorListLine(monitor, monitor.id);
    screen.getByText(monitor.name).click()
    expect(onDeleteMonitor).not.toHaveBeenCalled();
    expect(onEditMonitor).not.toHaveBeenCalled();
    expect(onSelectMonitor).toHaveBeenCalledWith(monitor.id)
  });

  test('renders up icon when monitor is up', () => {
    renderMonitorListLine(monitor, monitor.id);
    screen.getByText('Status: Up');
  });

  test('renders down icon when monitor is down', () => {
    renderMonitorListLine({ ...monitor, status: MonitorStatus.Down }, monitor.id);
    screen.getByText('Status: Down');
  });

  test('renders started icon when monitor is starting', () => {
    renderMonitorListLine({ ...monitor, status: MonitorStatus.Starting }, monitor.id);
    screen.getByText('Status: Started');
  });

  test('renders started icon when monitor is starting', () => {
    renderMonitorListLine({ ...monitor, status: MonitorStatus.Starting }, monitor.id);
    screen.getByText('Status: Started');
  });

  test('renders with active class if it is the selected monitor', () => {
    const { container } = renderMonitorListLine(monitor, monitor.id);
    expect(container.querySelector('tr')).toHaveClass('table-active')
  });

  test('renders without active class if it is not the selected monitor', () => {
    const { container } = renderMonitorListLine(monitor, monitor.id + 'not');
    expect(container.querySelector('tr')).not.toHaveClass('table-active')
  });
});