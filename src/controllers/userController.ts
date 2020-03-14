import { Request, Response, json } from "express"
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

            const users = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).find()


            return res.json(users);

        } catch (error) {


            return res.status(404).json({ message: "UsersNotFound", error })

        }

    }


    public async getUser(req: Request, res: Response): Promise<Response> {

        try {

            const email = req.params.email;

            const user = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).findByEmail(email) as User;
            return res.json(user);

        } catch (error) {

            return res.status(404).json({ message: "UserNotFound", error })

        }

    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {

            const email = req.params.email;
            const user = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).findByEmail(email) as User;

            if (user) {

                getCustomRepository(UserRepository, process.env.CONNECTION_MG).merge(user, req.body);

                const result = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).save(user);
                return res.json(result);

            }

            return res.status(404).json({ message: 'Not user found' });


        } catch (error) {

            return res.status(404).json({ message: "UpdateUserNotFound", error });

        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {


            const email = req.params.email;

            const user = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).findByEmail(email) as User;


            if (user) {


                const result = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).remove(user) as User;

                if (result) {

                    return res.json({ message: "The user " + user.name + " " + user.lastname + " was deleted ", data: { result } });

                }

                return res.status(404).json({ message: 'Not user was deleted' });

            }

            return res.status(404).json({ message: 'Not user found' });

        } catch (error) {

            return res.status(404).json({ message: "DeleteUserNotFound", error });

        }
    }


    public async signUp(req: Request, res: Response): Promise<Response> {

        try {

            const validateCredentials = await validator.validateCredentials(req.body.email, req.body.password);


            if (validateCredentials) {
                return res.status(400).json({ message: validateCredentials })
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

                return res.status(404).json({ message: 'Validate Credentials' });
            }


            const token = await jwtauth.createToken(validateCredentials);

            return res.json({ token: token })



        } catch (error) {

            return res.status(404).json({ message: "Error", error })

        }

    }



}

const usercontroller = new userController;
export default usercontroller;