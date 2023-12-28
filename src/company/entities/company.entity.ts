import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CompanyInvite } from 'src/company-invite/entities/company-invite.entity';
import { UserRequest } from 'src/user-request/entities/user-request.entity';
import { IResponsUser } from 'src/types/types';
import { Members } from './members.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn({ name: 'companyId' })
  id: number;

  @Column()
  companyName: string;

  @ManyToOne(() => User, user => user.myCompanies, {
    onDelete: 'CASCADE',
  })
  owner: IResponsUser;

  @Column()
  description: string;

  @OneToMany(() => Members, member => member.companyId, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  employee: Members[];

  @OneToMany(() => CompanyInvite, invitation => invitation.company, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invitations' })
  invitations: CompanyInvite[];

  @OneToMany(() => UserRequest, candidate => candidate.company, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidates' })
  candidates: UserRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
