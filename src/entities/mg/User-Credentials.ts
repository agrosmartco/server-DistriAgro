import { Entity,Column,ObjectIdColumn,OneToOne,BeforeInsert } from "typeorm";
import { User } from "./User";
import bcrypt from "bcrypt";

@Entity()
export class UserCredentials{

    @ObjectIdColumn()
    id:string

    @Column()
    password:string

    @Column({ nullable: true })
    userId: string

    @BeforeInsert()
    async hashpassword(){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password,salt);
        this.password = hash;
    }

    @OneToOne(type=>User, user => user.usercredentials)
    user: User;
}