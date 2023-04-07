import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team.model';
import { allTeams } from './team.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa na rota /teams:', () => {
    let chaiHttpResponse: Response;
    afterEach(() => {
        sinon.restore();
      })
    describe('o GET /teams', () => {    
      it('retorna a lista de times', async () => {
        sinon
          .stub(Team, "findAll")
          .resolves(allTeams as Team[]);
  
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams');
      
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(allTeams);
  
      });
    });
    describe('o GET /teams:id', () => { 
        it('erro quando id não cadastrado', async () => {
          sinon
            .stub(Team, "findByPk")
            .resolves(null);
    
          chaiHttpResponse = await chai
            .request(app)
            .get('/teams/:25');
          const errorMessage = { message: 'Team does not exist in database!'};
          expect(chaiHttpResponse.status).to.be.equal(404);
          expect(chaiHttpResponse.body).to.deep.equal(errorMessage);    
        });

        it('retorna o time correto', async () => {
        sinon
          .stub(Team, "findByPk")
          .resolves(allTeams[0] as Team);
      
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/:1');
      
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(allTeams[0]);    
      });
  
    });
  });
