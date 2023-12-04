import { Module } from '@nestjs/common';
import { CompanyInviteService } from './company-invite.service';
import { CompanyInviteController } from './company-invite.controller';

@Module({
  controllers: [CompanyInviteController],
  providers: [CompanyInviteService],
})
export class CompanyInviteModule {}
