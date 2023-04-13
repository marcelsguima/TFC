import { Router, Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';
import LeaderboardController from '../controller/leaderboard.controller';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response) =>
  leaderboardController.getHomeLeaderboard(req, res));

leaderboardRouter.get('/away', (req: Request, res: Response) =>
  leaderboardController.getAwayLeaderboard(req, res));

export default leaderboardRouter;
