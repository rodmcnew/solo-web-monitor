import {Entity, model, property} from '@loopback/repository';
import {MonitorStatus} from './monitor.model';

@model()
export class MonitorEvent extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  monitorId: string;

  @property({
    type: 'date',
    required: true,
  })
  date: Date;

  @property({
    type: 'string',
    required: true,
  })
  status: MonitorStatus

  @property({
    type: 'string',
    required: true,
  })
  reason: string;

  @property({
    type: 'number',
    required: true,
  })
  latency: number;

  @property({
    type: 'boolean',
    required: true,
  })
  statusChanged: boolean;

  constructor(data?: Partial<MonitorEvent>) {
    super(data);
  }
}

export interface MonitorEventRelations {
  // describe navigational properties here
}

export type MonitorEventWithRelations = MonitorEvent & MonitorEventRelations;
