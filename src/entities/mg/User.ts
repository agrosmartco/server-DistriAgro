import {
  Entity,
  Column,
  ObjectIdColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {UserCredentials} from './User-Credentials';
import {validateOrReject, Length, IsString} from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  @Length(1, 20)
  @IsString()
  name: string;

  @Column()
  @Length(1, 30)
  @IsString()
  lastname: string;

  @Column({unique: true})
  email: string;

  @Column()
  roles: string[];

  @BeforeInsert()
  @BeforeUpdate()
  async validater() {
    await validateOrReject(this);
  }

  @OneToOne(() => UserCredentials, (usercredentials) => usercredentials.user)
  @JoinColumn()
  usercredentials: UserCredentials;
}
