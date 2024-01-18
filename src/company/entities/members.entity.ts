import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  // JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Company } from './company.entity';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.myWork, {
    onDelete: 'CASCADE',
  })
  // @JoinTable()
  @JoinColumn()
  userId: User;

  @ManyToOne(() => Company, company => company.employee, {
    onDelete: 'CASCADE',
  })
  // @JoinTable()
  @JoinColumn()
  companyId: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
