import { Module } from '@nestjs/common';
import { CompanyInviteService } from './company-invite.service';
import { CompanyInviteController } from './company-invite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { CompanyModule } from 'src/company/company.module';
import { UserModule } from 'src/user/user.module';
import { CompanyInvite } from './entities/company-invite.entity';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CompanyInvite, Company]),
    UserModule,
    CompanyModule,
  ],
  controllers: [CompanyInviteController],
  providers: [CompanyInviteService, CompanyService],
})
export class CompanyInviteModule {}
