import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import userController from "../../controllers/userController"
import { UserRepository } from "../../repositories/userRepository"
import { User } from "../../entities/mg/User"
import usercontroller from '../../controllers/userController'
import jwt from "../../services/jwt-auth"


describe('Product Controller', () => {

    const Newproduct = {

        reference: "V0001",
        description: "Arveja",
        idcategory: "2",
        price: "1500",
        quantity: "500",
        barcode: "0000011111",
        image: ""

    }

    const user: User | any = {

        name: 'Example',
        lastname: 'User',
        email: 'jucacar34@hotmail.com',
        roles: ['admin', 'customer']

    };

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

    it('GETONE /products/  GetOne product', (done) => {
        chai
            .request(app)
            .get('/api/products/V0001')
            .then(
                res => {

                    expect(res).to.have.status(200);

                    done();
                }
            );
    });

    it('POST /products/  Post failed product (No Authorized)', async () => {
        chai
            .request(app)
            .post('/api/products')
            .send(Newproduct)
            .then(
                res => {

                    expect(res).to.have.status(401);

                }
            );
    });

    it('POST /products/  Post failed product (Authorized but without image)', async () => {

        const token = await jwt.createToken(user)

        chai
            .request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(Newproduct)
            .then(
                res => {
            
                    expect(res).to.have.status(404);

                }
            );
    });

});

