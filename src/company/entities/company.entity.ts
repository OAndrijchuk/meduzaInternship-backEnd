import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Invitation } from './invitations.entity';
import { Candidates } from 'src/user/entities/candidates.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn({ name: 'companyId' })
  id: number;

  @Column()
  companyName: string;

  @ManyToOne(() => User, user => user.myCompanies)
  owner: User;

  @Column()
  description: string;

  @ManyToMany(() => User, user => user.myWork)
  @JoinColumn({ name: 'employee' })
  employee: User[];

  @OneToMany(() => Invitation, invitation => invitation.company)
  @JoinColumn({ name: 'invitations' })
  invitations: Invitation[];

  @OneToMany(() => Candidates, candidate => candidate)
  @JoinColumn({ name: 'candidates' })
  candidates: Candidates[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
