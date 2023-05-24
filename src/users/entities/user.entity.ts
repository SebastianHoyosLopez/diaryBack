import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResponsibleOfEntity } from './responsibleOf.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; //encript

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => ResponsibleOfEntity, (responsibleOf) => responsibleOf.user, {
    nullable: true
  })
  @JoinColumn({
    name: 'responsible_of'
  })
  responsibleOf: ResponsibleOfEntity; 
}