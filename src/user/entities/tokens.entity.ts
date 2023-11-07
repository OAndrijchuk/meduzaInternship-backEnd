import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.tokens)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column()
  acesToken: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
