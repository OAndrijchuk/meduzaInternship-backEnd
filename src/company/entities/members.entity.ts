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
import { Company } from './company.entity';
import { RoleType } from 'src/types/types';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.myWork, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userId: User;

  @ManyToOne(() => Company, company => company.employee, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  companyId: Company;

  @Column({
    type: 'enum',
    enum: [RoleType.Member, RoleType.Owner, RoleType.Admin],
    default: RoleType.Member,
  })
  role: RoleType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
