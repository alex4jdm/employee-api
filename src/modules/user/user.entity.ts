import { EUserRoles } from 'src/common/enums/EUserRoles.enum';
import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { IUser } from './interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public username: string;

  @Column({
    type: 'enum',
    enum: EUserRoles,
    default: EUserRoles.USER,
  })
  public role: EUserRoles;

  @ManyToOne(() => User, { nullable: true })
  public boss: User;

  @OneToMany(() => User, user => user.boss)
  @JoinTable()
  public subordinates: User[];

  @Column({ select: false })
  public password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(data: Partial<IUser> = {}) {
    Object.assign(this, data);
  }
}
