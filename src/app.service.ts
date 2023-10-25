import { Injectable, HttpStatus } from '@nestjs/common';

interface InfoResponse {
  status_code: number;
  detail: string;
  result: string;
}

@Injectable()
export class AppService {
  async getInfo(): Promise<InfoResponse> {
    return {
      status_code: HttpStatus.OK,
      detail: `ok`,
      result: `working`,
    };
  }
}
