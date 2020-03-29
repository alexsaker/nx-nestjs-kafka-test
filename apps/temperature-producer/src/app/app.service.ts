import { Injectable } from '@nestjs/common';
import { Location } from '@nx-nestjs-kafka-project/api-interfaces';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to temperature-producer!' };
  }
  postLocation(data: Location): Location {
    console.log(`I am in temperature producer service.`);
    return data;
  }
}
