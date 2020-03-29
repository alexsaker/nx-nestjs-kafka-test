import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');
  constructor(
    @Inject('LOCATION_SERVICE') private readonly client: ClientKafka,
    private readonly appService: AppService
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('location')
  addTemperatureData(@Body() location: Location): Observable<Location> {
    this.logger.log(
      `Receiving temperature and sending data to kafka topic location:`
    );
    this.logger.log(location);
    return this.client.emit<Location>('location', location).pipe(take(1));
  }
}
