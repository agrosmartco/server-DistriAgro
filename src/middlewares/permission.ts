import { Request, Response, NextFunction } from "express"
import jwtauth from "../services/jwt-auth";


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

        console.log(roles.includes(decifreToken.roles.toString()),decifreToken.roles.toString(),roles,"admin,customer");
        

        if (roles.length && !roles.includes("admin","customer")) {

            return response.status(401).json({ message: 'Unauthorized' });
        }

        next()
    }
}