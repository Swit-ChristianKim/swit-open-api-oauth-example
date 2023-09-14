import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/callback')
  callback(@Req() request: Request): string {
    new Logger('callback').log(request.query.code);
    const code = request.query.code as string;
    return code;
  }
}
