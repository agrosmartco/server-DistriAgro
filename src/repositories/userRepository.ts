import { EntityRepository, Repository, Like } from "typeorm"
import { User } from "../entities/mg/User"

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByEmail(Email: string) {
        return this.findOne({email: Email });
    }
}
