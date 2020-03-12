import { EntityRepository, Repository, Like } from "typeorm"
import { Products } from "../entities/pg/Products"

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {

    findByName(description: string) {
        return this.find({ where: { description: Like(`%${description}%`) } });
    }
}
