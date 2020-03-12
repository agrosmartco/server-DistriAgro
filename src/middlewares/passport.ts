import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/userRepository";

const opts: StrategyOptions = {

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret

}

export default new Strategy(opts, async (payload, done) => {

    const user = await getCustomRepository(UserRepository,process.env.CONNECTION_MG).findByEmail(payload.email);

    try {

        if (user) {

            return done(null, user);

        }

        return done(null, false)

    } catch (error) {

        console.log(error);

    }

});