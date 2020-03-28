import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import {validateOrReject, IsInt, IsString} from 'class-validator';

@Entity()
export class OrderBody extends BaseEntity {
  @PrimaryColumn() id: number;

  @Column()
  @IsInt()
  id_order: number;

  @Column()
  @IsString()
  reference_product: string;

  @Column()
  @IsString()
  description_product: string;

  @Column()
  @IsInt()
  quantity_product: number;

  @Column()
  @IsInt()
  price_product: number;

  @BeforeInsert()
  @BeforeUpdate()
  async validater() {
    await validateOrReject(this);
  }
}
