import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import {validateOrReject, Length, Min, Max, IsInt} from 'class-validator';

@Entity()
export class Products extends BaseEntity {
  @PrimaryColumn() id: number;

  @Column()
  @Length(5, 10)
  reference: string;

  @Column()
  @Length(0, 50)
  description: string;

  @Column()
  @Min(0)
  @Max(3)
  idcategory: number;

  @Column({nullable: true})
  @Min(1)
  @Max(100000)
  price: number;

  @Column({nullable: true})
  @IsInt()
  @Min(0)
  @Max(1000000)
  quantity: number;

  @Column()
  @Length(0, 30)
  barcode: string;

  @Column() image: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validater() {
    await validateOrReject(this);
  }
}
