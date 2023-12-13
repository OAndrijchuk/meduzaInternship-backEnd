import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CompanyInvite } from 'src/company-invite/entities/company-invite.entity';
import { UserRequest } from 'src/user-request/entities/user-request.entity';
import { IResponsUser } from 'src/types/types';

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

  @ManyToMany(() => User, user => user.myWork, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  employee: User[];

  @OneToMany(() => CompanyInvite, invitation => invitation.company)
  @JoinColumn({ name: 'invitations' })
  invitations: CompanyInvite[];

  @OneToMany(() => UserRequest, candidate => candidate.user)
  @JoinColumn({ name: 'candidates' })
  candidates: UserRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
