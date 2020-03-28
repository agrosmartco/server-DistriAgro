import {EntityRepository, Repository, Like} from 'typeorm';
import {OrderBody} from '../entities/pg/orderBody';

@EntityRepository(OrderBody)
export class OrderBodyRepository extends Repository<OrderBody> {
  findByOrderHeader(id_order: number) {
    return this.find({where: {id_order: id_order}});
  }
}
