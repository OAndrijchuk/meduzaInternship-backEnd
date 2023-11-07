import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tokens } from './tokens.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user', nullable: false })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Tokens, tokens => tokens.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tokenId' })
  tokens: Tokens;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
