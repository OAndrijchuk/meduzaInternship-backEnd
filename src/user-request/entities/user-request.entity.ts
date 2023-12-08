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
export class UserRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.candidates)
  @JoinColumn({ name: 'company' })
  company: Company;

  @ManyToOne(() => User, user => user.candidates)
  @JoinColumn({ name: 'user' })
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
