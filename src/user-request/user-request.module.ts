import { Module } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { UserRequestController } from './user-request.controller';

@Module({
  controllers: [UserRequestController],
  providers: [UserRequestService],
})
export class UserRequestModule {}
