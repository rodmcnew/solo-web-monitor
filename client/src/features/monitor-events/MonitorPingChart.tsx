import React from 'react';
import { MonitorEvent } from '../../types';

// import ChartJs from '@reactchartjs/react-chart.js';
const ChartJs = require('@reactchartjs/react-chart.js');

const PING_DISPLAY_COUNT = 12;
interface Props {
  monitorEvents: MonitorEvent[];
}

export function MonitorPingChart({ monitorEvents }: Props) {
  let pingChart = {
    data: [] as number[],
    labels: [] as string[]
  };
  monitorEvents.slice(0, PING_DISPLAY_COUNT).forEach(function (ping) {
    //Infinity causes it to render no line, this is used for downtime pings
    pingChart.data.unshift(ping.latency === -1 ? Infinity : ping.latency);
    let date = new Date(ping.date);
    let minutes = date.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    pingChart.labels.unshift(date.getHours() + ':' + minutes);
  });
  //Fix 1 point charts which don't display properly
  if (pingChart.data.length === 1) {
    pingChart.data.unshift(pingChart.data[0]);
    pingChart.labels.unshift(pingChart.labels[0]);
  }
  const chartData = {
    labels: pingChart.labels,
    datasets: [{ data: pingChart.data }]
  };

  return (
    <ChartJs.Line
      data={chartData}
      options={{ animation: false, legend: { display: false } }}
      width="605"
      height="181"
    />
  )
}
