import { Injectable } from '@nestjs/common';

interface InfoResponse {
  status_code: number;
  detail: string;
  result: string;
}

@Injectable()
export class AppService {
  getInfo(): InfoResponse {
    return {
      status_code: 200,
      detail: `ok`,
      result: `working`,
    };
  }
}
