import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { IMatch } from '../interfaces/IMatch';
import Matches from '../database/models/Match.model';
import { allMatches } from './match.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('testa a rota /matches', () => {
  afterEach(function() {
    sinon.restore();
  });

  it('Testa se retorna todas as partidas ao acessar a rota /matches', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatches as any);
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allMatches)
  })
});
