import {Entity, model, property} from '@loopback/repository';

@model()
export class MonitorEvent extends Entity {
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
    type: 'boolean',
    required: true,
  })
  up: boolean;

  @property({
    type: 'string',
    required: true,
  })
  reason: string;


  constructor(data?: Partial<MonitorEvent>) {
    super(data);
  }
}

export interface MonitorEventRelations {
  // describe navigational properties here
}

export type MonitorEventWithRelations = MonitorEvent & MonitorEventRelations;
