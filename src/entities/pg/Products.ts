import { Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Products{

    @PrimaryColumn()
    id: number;

    @Column()
    reference:string;

    @Column()
    description: string;

    @Column()
    idcategory: number;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    quantity: number;

    @Column()
    barcode:number;

    @Column()
    image: string;

}