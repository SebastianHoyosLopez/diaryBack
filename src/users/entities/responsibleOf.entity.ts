import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { SerenataEntity } from 'src/serenatas/entities/serenata.entity';

@Entity()
export class ResponsibleOfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => UserEntity, (user) => user.responsibleOf, { nullable: true })
  user: UserEntity;

  @OneToMany(() => SerenataEntity, (serenata) => serenata.responsibleOf)
  serenatas: SerenataEntity[];
}
