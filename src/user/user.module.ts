import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tokens } from '../auth/entities/tokens.entity';
import { CompanyInvite } from 'src/company-invite/entities/company-invite.entity';
import { UserRequest } from 'src/user-request/entities/user-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tokens, CompanyInvite, UserRequest]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
