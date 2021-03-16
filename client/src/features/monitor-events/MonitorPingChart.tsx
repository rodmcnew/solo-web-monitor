import React from 'react';
import { MonitorEvent } from '../../types';

//@TODO import somehow?
const ChartJs = require('@reactchartjs/react-chart.js');
const pingDisplayCount = 12; //TODO
interface Props {
  monitorEvents: MonitorEvent[];
}

export function MonitorPingChart({ monitorEvents }: Props) {
  let pingChart = {
    data: [] as number[], //@TODO type better?
    labels: [] as string[] //@TODO type better?
  };
  monitorEvents.slice(0, pingDisplayCount).forEach(function (ping) {
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

  //@TODO hard coded sizes?
  return (
    <ChartJs.Line
      data={chartData}
      options={{ animation: false, legend: { display: false } }}
      width="605"
      height="181"
    />
  )
}


