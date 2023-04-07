import { Router } from 'express';
import { TeamController } from '../controller/index';
import { TeamService } from '../service/index';
import TeamModel from '../database/models/Team.model';

const teamRouter = Router();
const teamService = new TeamService(TeamModel);
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.getAllTeams);
teamRouter.get('/:id', teamController.getTeamById);

export default teamRouter;
