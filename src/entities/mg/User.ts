import { Entity,Column,ObjectIdColumn,OneToOne,JoinColumn } from "typeorm";
import { UserCredentials } from "./User-Credentials";

@Entity()
export class User{

    @ObjectIdColumn()
    id:string

    @Column()
    name:string

    @Column()
    lastname:string

    @Column({ unique: true })
    email:string

    @Column()
    roles: string[];

    @OneToOne(type=>UserCredentials, usercredentials => usercredentials.user)
    @JoinColumn()
    usercredentials: UserCredentials;


}