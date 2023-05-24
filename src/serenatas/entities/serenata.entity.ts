import { Exclude } from 'class-transformer';
import { ResponsibleOfEntity } from 'src/users/entities/responsibleOf.entity';
import {
  Entity,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(
    () => ResponsibleOfEntity,
    (responsibleOf) => responsibleOf.serenatas,
  )
  @JoinColumn({ name: 'responsible_Of'})
  responsibleOf: ResponsibleOfEntity;
}
