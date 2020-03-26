import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import {User} from '../../entities/mg/User';
import jwt from '../../services/jwt-auth';

chai.use(chaiHttp);

/*
Before starting be sure to review the next steps
startEnviroment()
1.User Test Should is Created (Manual Process)
  {
        "id": "5e6aab9eb4beb0262cf36f20",
        "name": "Example",
        "lastname": "User",
        "email": "jucacar34@hotmail.com",
        "roles": [
            "admin",
            "customer"
        ]
    }
2. Create User Test (Automatic Process)
{
	"name":"Juan Carlos",
	"lastname":"Cadavid",
	"email":"jucacar36@hotmail.com",
	"password":"Carlos123"
}
2.Delete User
test@hotmail.io
*/

const app = 'http://localhost:3000';
const findEmail = 'jucacar34@hotmail.com';
const deleteEmail = 'jucacar36@hotmail.com';

describe('User Controller and Routes', () => {
  const user: User | any = {
    name: 'Example',
    lastname: 'User',
    email: 'jucacar34@hotmail.com',
    roles: ['admin', 'customer'],
  };

  const userData = {
    name: 'Example',
    lastname: 'User',
    email: 'test@hotmail.io',
    password: 'Test123*',
    roles: ['customer'],
  };

  it('Enviroment', async () => {
    await startEnviroment();
  });

  it('GET /user/  Get All users without authorization', async () => {
    await chai
      .request(app)
      .get('/api/user')
      .then((res) => {
        expect(res.status).to.equal(401);
      });
  });

  it('protects GET /user/email Get One users with authorization', async () => {
    const token = await jwt.createToken(user);

    await chai
      .request(app)
      .get('/api/user/' + findEmail)
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  it('protects GET /user/email Get One users without authorization', async () => {
    await chai
      .request(app)
      .get('/api/user/test@loopback.io')
      .then((res) => {
        expect(res.status).to.equal(401);
      });
  });

  it('protects PUT /user/email Put One users with authorization', async () => {
    const token = await jwt.createToken(user);

    await chai
      .request(app)
      .put('/api/user/jucacar34@hotmail.com')
      .set('Authorization', 'Bearer ' + token)
      .send(user)
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  it('protects DELETE /user/email DELETE One users with authorization', async () => {
    const token = await jwt.createToken(user);

    await chai
      .request(app)
      .delete('/api/user/' + deleteEmail)
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });

  it('Post /api/user/signup Create new user', async () => {
    const res = await chai
      .request(app)
      .keepOpen()
      .post('/api/user/signup')
      .send(userData);
    expect(200);

    expect(res.body.message).to.equal('User created successfully');
  });

  it('Post /api/user/signin signin returns a JWT token', async () => {
    const res = await chai
      .request(app)
      .keepOpen()
      .post('/api/user/signin')
      .send({email: 'jucacar34@hotmail.com', password: 'Carlos123'});
    expect(200);

    const token = res.body.token;
    expect(token).exist;
  });

  it('Put /api/user/recoverpassword/ send new password to email', async () => {
    const res = await chai
      .request(app)
      .keepOpen()
      .put('/api/user/recoverpassword/jucacar28@hotmail.com');
    expect(200);

    const response = res.body.message;
    expect(response).to.equal(
      'Your password generated successfully and was sent to your email address',
    );
  });

  it('Put /api/user/updatepassword/ change password', async () => {
    const res = await chai
      .request(app)
      .keepOpen()
      .put('/api/user/updatepassword/test@hotmail.io')
      .send({oldPassword: 'Test123*', newPassword: 'Test1234*'});
    expect(200);

    const response = res.body.message;
    expect(response).to.equal('your pass was changed successfully');
  });
});

async function startEnviroment() {
  const userTestToCreate: User | any = {
    name: 'Juan Carlos',
    lastname: 'Cadavid',
    email: 'jucacar36@hotmail.com',
    password: 'Carlos123',
  };

  const userTestToken: User | any = {
    name: 'Example',
    lastname: 'User',
    email: 'jucacar34@hotmail.com',
    roles: ['admin', 'customer'],
  };

  const emailDelete = 'test@hotmail.io';

  const token = await jwt.createToken(userTestToken);

  await chai
    .request(app)
    .delete('/api/user/' + emailDelete)
    .set('Authorization', 'Bearer ' + token);

  await chai
    .request(app)
    .keepOpen()
    .post('/api/user/signup')
    .send(userTestToCreate);
  expect(200);
}
