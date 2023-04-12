import { Router } from 'express';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import MatchService from '../service/match.service';
import MatchController from '../controller/match.controller';
import verifyTokenLogin from '../middleware/token.valide';
import validateMatch from '../middleware/match.validate';

const matchRouter = Router();
const service = new MatchService(MatchModel, TeamModel);
const controller = new MatchController(service);
matchRouter.get('/', controller.getAllMatches);
matchRouter.patch('/:id/finish', verifyTokenLogin, controller.inProgressMatch);
matchRouter.patch('/:id', verifyTokenLogin, controller.updateMatch);
matchRouter.post('/', verifyTokenLogin, validateMatch, controller.createMatch);

export default matchRouter;
