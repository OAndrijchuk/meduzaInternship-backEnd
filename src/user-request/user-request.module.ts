import { Module } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { UserRequestController } from './user-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { UserRequest } from './entities/user-request.entity';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // User,
      // Tokens,
      // CompanyInvite,
      UserRequest,
      Company,
      // CompanyService,
    ]),
    // UserModule,
    CompanyModule,
  ],
  controllers: [UserRequestController],
  providers: [UserRequestService],
})
export class UserRequestModule {}
