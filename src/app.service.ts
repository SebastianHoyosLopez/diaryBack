import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  getHello(): string {
    const apikey = this.configService.apikey;
    const name = this.configService.database.name;
    // return `Hello World! ${name} ${apikey} `;
    return 
  }
}
