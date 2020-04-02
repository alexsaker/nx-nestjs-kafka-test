import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventsModule,
    ClientsModule.register([
      {
        name: 'LOCATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          subscribe: { fromBeginning: false },
          client: {
            clientId: 'api',
            brokers: [
              '192.168.99.100:29092',
              '192.168.99.100:29093',
              '192.168.99.100:29094',
            ],
          },
          consumer: {
            allowAutoTopicCreation: true,
            readUncommitted: false,
            groupId: 'location-consumer-api',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
