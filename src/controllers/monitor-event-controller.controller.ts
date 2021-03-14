import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,






  response
} from '@loopback/rest';
import {MonitorEvent} from '../models';
import {MonitorEventRepository} from '../repositories';

export class MonitorEventControllerController {
  constructor(
    @repository(MonitorEventRepository)
    public monitorEventRepository: MonitorEventRepository,
  ) { }

  @get('/monitor-events/count')
  @response(200, {
    description: 'MonitorEvent model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MonitorEvent) where?: Where<MonitorEvent>,
  ): Promise<Count> {
    return this.monitorEventRepository.count(where);
  }

  @get('/monitor-events')
  @response(200, {
    description: 'Array of MonitorEvent model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MonitorEvent, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MonitorEvent) filter?: Filter<MonitorEvent>,
  ): Promise<MonitorEvent[]> {
    return this.monitorEventRepository.find(filter);
  }

  @get('/monitor-events/{id}')
  @response(200, {
    description: 'MonitorEvent model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MonitorEvent, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MonitorEvent, {exclude: 'where'}) filter?: FilterExcludingWhere<MonitorEvent>
  ): Promise<MonitorEvent> {
    return this.monitorEventRepository.findById(id, filter);
  }
}
