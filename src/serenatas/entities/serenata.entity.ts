import { ResponsibleOfEntity } from 'src/users/entities/responsibleOf.entity';
import {
  Entity,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class SerenataEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  date: string;

  @Column()
  hour: string;

  @Column()
  municipality: string;

  @Column()
  description: string;

  @DeleteDateColumn()
  deletedAt?: Date;

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

  @ManyToOne(
    () => ResponsibleOfEntity,
    (responsibleOf) => responsibleOf.serenatas,
  )
  responsibleOf: ResponsibleOfEntity;
}
