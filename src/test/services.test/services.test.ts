import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import { User } from "../../entities/mg/User"
import jwt from "../../services/jwt-auth"
import { hashPassword, comparePassword } from "../../services/hash.password.bcrypt";


describe('Services authentication', () => {

    const userData = {
        id: '0',
        name: 'Example',
        lastname: 'User',
        email: 'test@loopback.io',
        roles: ['customer']
    };

    const email = 'test@hotmail.io*';
    const password = 'Black7180';

    it('jwt-auth create token', (done) => {

        const result = jwt.createToken(userData as User)
        expect(result).exist;

        done();
    })

    it('jwt-auth validate token', (done) => {

        const validtedToken = jwt.validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwIiwiZW1haWwiOiJ0ZXN0QGxvb3BiYWNrLmlvIiwicm9sZXMiOlsiY3VzdG9tZXIiXSwiaWF0IjoxNTg0MTE3MzM1LCJleHAiOjE1ODQyMDM3MzV9.ZASugU7b8G8I4ZrhHclK0yspV_pTUiMJ-3zYeVz5iOI');

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