import chai, { expect, should } from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import userController from "../controllers/userController"
import { UserRepository } from "../repositories/userRepository"
import { User } from "../entities/mg/User"
import usercontroller from '../controllers/userController'
import jwt from "../services/jwt-auth"

chai.use(chaiHttp)

const app = 'http://localhost:3000';


describe('User Controller', () => {

    let client: User;
    let userRepo: UserRepository;
    const userPassword = 'p4ssw0rd';

    const userData = {
        name: 'Example',
        lastName: 'User',
        email: 'test@loopback.io',
        roles: ['customer'],
    };


    it('Get All users', (done) => {
        const result = userController.getUsers
        expect(result)
        done();
    });


    it('protects GET /user/ with authorization', async () => {
        await chai
            .request(app)
            .get('/api/user')
            .then(
                res => {
                    expect(res.status).to.equal(401);
                }
            );
    });



    it('GET /products/ ', async () => {
        await chai
            .request(app)
            .get('/api/products')
            .then(
                res => {
                   
                    expect(res.status).to.equal(200);
                }
            );
    });

});




describe('authentication', () => {

    const userData = {
        id: '0',
        name: 'Example',
        lastname: 'User',
        email: 'test@loopback.io',
        roles: ['customer']
    };

    it('login returns a JWT token', async () => {

        const res = await chai
            .request(app).keepOpen()
            .post('/api/user/signin')
            .send({ email: 'jucacar34@hotmail.com', password: 'Carlos123' })
        expect(200);

        const token = res.body.token;
        expect(token).exist;
    });


    it('jwt-auth create token', (done) => {

        const result = jwt.createToken(userData as User)
        expect(result).exist;

        done();
    });


});
