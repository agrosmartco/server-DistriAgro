import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import {User} from '../../entities/mg/User';
import jwt from '../../services/jwt-auth';

chai.use(chaiHttp);

/*
Before starting be sure to review the next steps
startEnviroment()
1.Product Test Should is Created (Manual Process) and add image (form-data file = file  &&  product= Text)
 {
	"reference":"V0001",
    "description": "Naranja",
    "idcategory":"1",
    "price": "1500",
    "quantity": "500",
    "barcode":"0000011111",
    "image": ""
		
	}

*/

describe('Product Controller', () => {
  const Newproduct = {
    reference: 'V0001',
    description: 'Arveja',
    idcategory: '2',
    price: '1500',
    quantity: '500',
    barcode: '0000011111',
    image: '',
  };

  const UpdateProduct = {
    reference: 'V0001',
    description: 'Arvejitas',
    idcategory: '2',
    price: '1600',
    quantity: '500',
    barcode: '0000011111',
    image: '',
  };

  const user: User | any = {
    name: 'Example',
    lastname: 'User',
    email: 'jucacar34@hotmail.com',
    roles: ['admin', 'customer'],
  };

  const app = 'http://localhost:3000';

  it('GET /products/  Get All products', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .then((res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it('GETONE /products/  GetOne product', (done) => {
    chai
      .request(app)
      .get('/api/products/V0001')
      .then((res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it('POST /products/  Post failed product (No Authorized)', async () => {
    chai
      .request(app)
      .post('/api/products')
      .send(Newproduct)
      .then((res) => {
        expect(res).to.have.status(401);
      });
  });

  it('POST /products/  Post failed product (Authorized but without image)', async () => {
    const token = await jwt.createToken(user);

    chai
      .request(app)
      .post('/api/products')
      .set('Authorization', 'Bearer ' + token)
      .send(Newproduct)
      .then((res) => {
        expect(res).to.have.status(404);
      });
  });

  it('Update /products/:referece  Update product V0001', async () => {
    const token = await jwt.createToken(user);

    chai
      .request(app)
      .delete('/api/products/V0001')
      .set('Authorization', 'Bearer ' + token)
      .send(UpdateProduct)
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('Delete /products/:referece  Delete product V0001', async () => {
    const token = await jwt.createToken(user);

    chai
      .request(app)
      .delete('/api/products/V0001')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
});
