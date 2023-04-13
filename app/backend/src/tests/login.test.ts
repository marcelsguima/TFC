import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bycrypt from "bcryptjs";
import { app } from '../app';

import * as jwt from 'jsonwebtoken';
import User from '../database/models/User.model';
import { login, wrongLogin, invalidEmail, token, user } from './login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa se login:', () => {
    afterEach(sinon.restore);
    it('retorna o token', async () => {
        sinon.stub(User, 'findOne').resolves(user)
        sinon.stub(bycrypt, 'compareSync').returns(true)
        const signMock = sinon.mock(jwt);
        signMock.expects('sign').returns(token);
        const response = await chai.request(app).post('/login').send(login)
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.equal({token:token});
    });
    it('retorna o erro correto ao logar com senha errada', async () => {
        sinon.stub(User, 'findOne').resolves(user)
        sinon.stub(bycrypt, 'compareSync').returns(false)
        const response = await chai.request(app).post('/login').send(login)
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
      });

    it('retorna o erro correto ao logar com email errado', async () => {
        const response = await chai.request(app).post('/login').send(invalidEmail)
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
        });
    it('login invalido', async () => {
        const response = await chai.request(app).post('/login').send(wrongLogin)
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
         });
    });
  