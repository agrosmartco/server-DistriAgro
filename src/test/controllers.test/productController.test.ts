import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import userController from "../../controllers/userController"
import { UserRepository } from "../../repositories/userRepository"
import { User } from "../../entities/mg/User"
import usercontroller from '../../controllers/userController'
import jwt from "../../services/jwt-auth"


describe('Product Controller', () => {

    const app = 'http://localhost:3000';

    it('GET /products/  Get All products', (done) => {
        chai
            .request(app)
            .get('/api/products')
            .then(
                res => {

                    expect(res).to.have.status(200);

                    done();
                }
            );
    });



});