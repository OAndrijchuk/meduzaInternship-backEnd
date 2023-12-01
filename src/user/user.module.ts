import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tokens } from '../auth/entities/tokens.entity';
import { Candidates } from './entities/candidates.entity';
import { Invitation } from 'src/company/entities/invitations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tokens, Candidates, Invitation])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
