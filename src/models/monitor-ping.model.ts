import {Entity, model, property} from '@loopback/repository';

@model()
export class MonitorPing extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: Date;

  @property({
    type: 'number',
    required: true,
  })
  latency: number;

  constructor(data?: Partial<MonitorPing>) {
    super(data);
  }
}

export interface MonitorPingRelations {
  // describe navigational properties here
}

export type MonitorPingWithRelations = MonitorPing & MonitorPingRelations;
