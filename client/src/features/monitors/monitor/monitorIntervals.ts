/**
 * This is a list of the currently allowed monitor intervals and their labels.
 * 
 * @possibleImprovement: Share this with the server and do server side validation when saving a monitor
 */
export const monitorIntervals = [
    { value: 1, label: 'Every minute' },
    { value: 2, label: 'Every 2 minutes' },
    { value: 3, label: 'Every 3 minutes' },
    { value: 4, label: 'Every 4 minutes' },
    { value: 5, label: 'Every 5 minutes' },
    { value: 10, label: 'Every 10 minutes' },
    { value: 15, label: 'Every 15 minutes' },
    { value: 20, label: 'Every 20 minutes' },
    { value: 30, label: 'Every 30 minutes' },
    { value: 60, label: 'Every 60 minutes' },
];

export function getMonitorIntervalLabel(intervalValue: number) {
    return monitorIntervals.find(interval => interval.value === intervalValue)?.label;
}