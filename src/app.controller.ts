import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

interface InfoResponse {
  status_code: number;
  detail: string;
  result: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async getInfo(): Promise<InfoResponse> {
    return this.appService.getInfo();
  }
}
