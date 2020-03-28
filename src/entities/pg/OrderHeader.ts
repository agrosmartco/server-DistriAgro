import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import {validateOrReject, IsInt, IsString, IsDate} from 'class-validator';

@Entity()
export class OrderHeader extends BaseEntity {
  @PrimaryColumn() id: number;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsString()
  name_client: string;

  @Column()
  @IsInt()
  id_client: number;

  @Column()
  @IsString()
  address: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validater() {
    await validateOrReject(this);
  }
}
