import { Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Products{

    @PrimaryColumn()
    id: number;

    @Column()
    description: string;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    quantity: number;

    @Column()
    image: string;



}