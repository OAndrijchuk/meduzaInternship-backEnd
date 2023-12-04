import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tokens } from 'src/auth/entities/tokens.entity';
import { CompanyInvite } from 'src/company-invite/entities/company-invite.entity';
import { UserRequest } from 'src/user-request/entities/user-request.entity';
import { Company } from './entities/company.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Tokens,
      CompanyInvite,
      UserRequest,
      Company,
    ]),
    UserModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
