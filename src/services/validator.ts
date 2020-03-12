import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/userRepository";
import isemail from "isemail";

export class validator {

    public async validateCredentials(email: string, password: string): Promise<any> {

        const invalidCredentialsError = 'Invalid email or password.';
        const invalidEmail = "Invalid email";
        const invalidPassword = 'password must be minimum 8 characters';
        const emailExists = "This email was registered previously in the app. Please, validate and try again.";


        if (!email || !password) {
            return invalidCredentialsError

        }

        if (!isemail.validate(email)) {
            return invalidEmail
        }

        if (password.length < 8) {
            return invalidPassword
        }

        const userExists = await getCustomRepository(UserRepository, process.env.CONNECTION_MG).findByEmail(email);


        if (userExists) {

            return emailExists
            
        }

    }

}

const valid = new validator();
export default valid;
