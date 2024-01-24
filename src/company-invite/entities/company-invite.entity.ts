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
  @JoinColumn({ name: 'company' })
  company: Company;

  @ManyToOne(() => User, user => user.myCompanies)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ default: '' })
  description: string;

  @Column({
    type: 'enum',
    enum: [StatusType.Pending, StatusType.Fulfilled, StatusType.Rejected],
    default: StatusType.Pending,
  })
  status: StatusType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
