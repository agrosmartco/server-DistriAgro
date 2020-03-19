import chai, { expect } from 'chai'
import 'mocha'
import { User } from "../../entities/mg/User"
import jwt from "../../services/jwt-auth"
import { hashPassword, comparePassword } from "../../services/hash.password.bcrypt";


describe('Services authentication', () => {

    const userData: User | any = {
        id: '0',
        name: 'Example',
        lastname: 'User',
        email: 'test@loopback.io',
        roles: ['customer']
    };

    let result: string = '';
    const password = 'Black7180';

    it('jwt-auth create token', async () => {

        result = await jwt.createToken(userData)
        expect(result).exist;

    })

    it('jwt-auth validate token', (done) => {

        const validtedToken = jwt.validateToken(result);

        expect(validtedToken).to.not.null;

        done();
    })


    it('jwt-auth validate token error', (done) => {

        const validtedToken = jwt.validateToken('');

        expect(validtedToken).to.not.null;

        done();
    })


    it('hash-password encrypt password', (done) => {

        const hassPass = hashPassword(password, 10);

        expect(hassPass).to.not.null;

        done();
    })

})