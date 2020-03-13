import { Request, Response, NextFunction } from "express"
import jwtauth from "../services/jwt-auth";
import _ from 'lodash'


interface payload {

    _id: string,
    email: string,
    roles: string[],
    iat: number,
    exp: number
}

export default function permit(roles: any) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return async (request: Request, response: Response, next: NextFunction) => {

        let token: string | any = request.headers.authorization;

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        let decifreToken = await jwtauth.validateToken(token) as payload

    
        let contains = _.intersection(roles, decifreToken.roles);

        if (roles.length && !contains.length) {

            return response.status(401).json({ message: 'Unauthorized' });
        }

        next()
    }
}