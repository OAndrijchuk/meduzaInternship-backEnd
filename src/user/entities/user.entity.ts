import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tokens } from '../../auth/entities/tokens.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user', nullable: false })
  userName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Tokens, tokens => tokens.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tokenId' })
  tokenId: Tokens;

  @Column({ default: false })
  isVerify: boolean;

  @Column({ default: '' })
  verificationKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
