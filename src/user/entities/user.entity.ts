import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tokens } from '../../auth/entities/tokens.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyInvite } from 'src/company-invite/entities/company-invite.entity';
import { UserRequest } from 'src/user-request/entities/user-request.entity';
import { Exclude } from 'class-transformer';
import { Members } from 'src/company/entities/members.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user', nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(() => Company, company => company.owner, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'myCompanies' })
  myCompanies: Company[];

  @OneToMany(() => Members, member => member.userId, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  myWork: Members[];

  @OneToMany(() => CompanyInvite, invitation => invitation.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'offers' })
  offers: CompanyInvite[];

  @OneToMany(() => UserRequest, candidate => candidate.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'candidates' })
  candidates: UserRequest[];

  @OneToOne(() => Tokens, tokens => tokens.userId, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'tokenId' })
  tokenId: Tokens;

  @Column({ default: false })
  isVerify: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ default: '', select: false })
  verificationKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
