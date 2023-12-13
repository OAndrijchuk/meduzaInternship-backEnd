import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { StatusType } from 'src/types/types';

@Entity()
export class CompanyInvite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.invitations)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => User, user => user.myCompanies)
  @JoinColumn()
  user: User;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'fulfilled', 'rejected'],
    default: 'pending',
  })
  status: StatusType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
