import { Request, Response } from "express"
import { getRepository, getCustomRepository } from "typeorm"
import { User } from "../entities/mg/User";
import { UserRepository } from "../repositories/userRepository"
import { UserCredentials } from "../entities/mg/User-Credentials"
import validator from "../services/validator";
import { comparePassword } from "../services/hash.password.bcrypt";
import jwtauth from "../services/jwt-auth";


class userController {

    public async getUsers(req: Request, res: Response): Promise<Response> {

        try {

            const users = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).findOne()


            return res.json(users);

        } catch (error) {


            return res.status(404).json({ message: "UserNotFound", error })

        }

    }

    public async signUp(req: Request, res: Response): Promise<Response> {

        try {

            const validateCredentials = await validator.validateCredentials(req.body.email, req.body.password);


            if (validateCredentials) {
                return res.status(400).json({ msg: validateCredentials })
            }

            const user = new User();
            user.name = req.body.name;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.roles = ["customer"]
            await getCustomRepository(UserRepository, process.env.CONNECTION_MG).save(user)

            const userCredentials = new UserCredentials;
            userCredentials.password = req.body.password;
            userCredentials.userId = user.id;
            await getRepository(UserCredentials, process.env.CONNECTION_MG).save(userCredentials)


            return res.json({ message: "User created successfully", user: { user } })


        } catch (error) {

            return res.status(404).json({ message: "Error", error })

        }

    }


    public async signIn(req: Request, res: Response): Promise<Response> {

        try {

            const providedEmail = req.body.email;
            const providedPass = req.body.password;

            const validateCredentials = await comparePassword(providedPass, providedEmail);


            if (!validateCredentials) {

                return res.status(404).json({ msg: 'Validate Credentials' });
            }


            const token = await jwtauth.createToken(validateCredentials);

            return res.json(token)



        } catch (error) {

            return res.status(404).json({ message: "Error", error })

        }

    }



}

const usercontroller = new userController;
export default usercontroller;