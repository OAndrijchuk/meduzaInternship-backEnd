import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tokens } from 'src/auth/entities/tokens.entity';
import { Invitation } from './entities/invitations.entity';
import { Candidates } from 'src/user/entities/candidates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tokens, Invitation, Candidates])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
