import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Monitor} from '../models';
import {MonitorRepository} from '../repositories';

export class MonitorControllerController {
  constructor(
    @repository(MonitorRepository)
    public monitorRepository : MonitorRepository,
  ) {}

  @post('/monitors')
  @response(200, {
    description: 'Monitor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Monitor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Monitor, {
            title: 'NewMonitor',
            exclude: ['id'],
          }),
        },
      },
    })
    monitor: Omit<Monitor, 'id'>,
  ): Promise<Monitor> {
    return this.monitorRepository.create(monitor);
  }

  @get('/monitors/count')
  @response(200, {
    description: 'Monitor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Monitor) where?: Where<Monitor>,
  ): Promise<Count> {
    return this.monitorRepository.count(where);
  }

  @get('/monitors')
  @response(200, {
    description: 'Array of Monitor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Monitor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Monitor) filter?: Filter<Monitor>,
  ): Promise<Monitor[]> {
    return this.monitorRepository.find(filter);
  }

  @patch('/monitors')
  @response(200, {
    description: 'Monitor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Monitor, {partial: true}),
        },
      },
    })
    monitor: Monitor,
    @param.where(Monitor) where?: Where<Monitor>,
  ): Promise<Count> {
    return this.monitorRepository.updateAll(monitor, where);
  }

  @get('/monitors/{id}')
  @response(200, {
    description: 'Monitor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Monitor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Monitor, {exclude: 'where'}) filter?: FilterExcludingWhere<Monitor>
  ): Promise<Monitor> {
    return this.monitorRepository.findById(id, filter);
  }

  @patch('/monitors/{id}')
  @response(204, {
    description: 'Monitor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Monitor, {partial: true}),
        },
      },
    })
    monitor: Monitor,
  ): Promise<void> {
    await this.monitorRepository.updateById(id, monitor);
  }

  @put('/monitors/{id}')
  @response(204, {
    description: 'Monitor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() monitor: Monitor,
  ): Promise<void> {
    await this.monitorRepository.replaceById(id, monitor);
  }

  @del('/monitors/{id}')
  @response(204, {
    description: 'Monitor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.monitorRepository.deleteById(id);
  }
}
