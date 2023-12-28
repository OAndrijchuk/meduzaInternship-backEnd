import { Module } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { UserRequestController } from './user-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { UserRequest } from './entities/user-request.entity';
import { CompanyModule } from 'src/company/company.module';
import { CompanyService } from 'src/company/company.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Members } from 'src/company/entities/members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRequest, Company, Members]),
    UserModule,
    CompanyModule,
  ],
  controllers: [UserRequestController],
  providers: [UserRequestService, CompanyService],
})
export class UserRequestModule {}
