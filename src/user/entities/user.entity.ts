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
import { Invitation } from 'src/company/entities/invitations.entity';
import { Candidates } from './candidates.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user', nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Company, company => company.owner, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'myCompanies' })
  myCompanies: Company[];

  @ManyToMany(() => Company, company => company.employee)
  @JoinColumn({ name: 'myWork' })
  myWork: Company[];

  @OneToMany(() => Invitation, invitation => invitation.user)
  @JoinColumn({ name: 'offers' })
  offers: Invitation[];

  @OneToMany(() => Candidates, candidate => candidate.user)
  @JoinColumn({ name: 'candidates' })
  candidates: Candidates[];

  @OneToOne(() => Tokens, tokens => tokens.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tokenId' })
  tokenId: Tokens;

  @Column({ default: false })
  isVerify: boolean;

  @Column({ default: '' })
  verificationKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
