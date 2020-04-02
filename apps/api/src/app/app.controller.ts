import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import {
  ClientKafka,
  Ctx,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka-options.interface';
import { Message } from '@nx-nestjs-kafka-project/api-interfaces';

import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');
  constructor(
    @Inject('LOCATION_SERVICE') private readonly client: ClientKafka,
    private readonly appService: AppService,
    private readonly gateway: EventsGateway
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('location');
    this.logger.log('subscribing to location response...');
    await this.client.connect();
  }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @MessagePattern('location')
  getLocation(@Payload() location: any, @Ctx() context): any {
    const message: KafkaMessage = context.getMessage();
    this.gateway.getWebSocketServer().emit('events', message.value);
    this.logger.log(message.value);
  }
}
