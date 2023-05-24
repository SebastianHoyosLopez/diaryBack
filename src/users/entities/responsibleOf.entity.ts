import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserEntity } from './user.entity';
import { SerenataEntity } from 'src/serenatas/entities/serenata.entity';

@Entity({ name: 'responsibleOf' })
export class ResponsibleOfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 230, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'varchar', length: 40 })
  phone: string;

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

  @OneToOne(() => UserEntity, (user) => user.responsibleOf, { nullable: true })
  user: UserEntity;

  @OneToMany(() => SerenataEntity, (serenata) => serenata.responsibleOf)
  serenatas: SerenataEntity[];
}
