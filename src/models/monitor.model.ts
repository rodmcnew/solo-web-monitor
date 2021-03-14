import {Entity, model, property} from '@loopback/repository';

//@TODO move to types file?
export enum MonitorStatus {
  Up = 'u',
  Down = 'd',
  Starting = 's',
}
@model()
export class Monitor extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'number',
    required: true,
  })
  interval: number;

  @property({
    type: 'string',
    required: true,
  })
  status: MonitorStatus

  constructor(data?: Partial<Monitor>) {
    super(data);
  }
}

export interface MonitorRelations {
  // describe navigational properties here
}

export type MonitorWithRelations = Monitor & MonitorRelations;
