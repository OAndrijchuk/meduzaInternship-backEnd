import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user', nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Company, company => company.owner, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'myCompanies' })
  myCompanies: Company[];

  @ManyToMany(() => Company, company => company.employee, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'myWork' })
  myWork: Company[];

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

  @Exclude()
  @Column({ default: '' })
  verificationKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
