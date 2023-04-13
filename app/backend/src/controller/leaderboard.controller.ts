import { Request, Response } from 'express';

import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;
  constructor(leaderboardService: LeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  async getHomeLeaderboard(req: Request, res: Response) {
    const { type, message } = await this.leaderboardService.getLeaderboardHome();
    return res.status(type).json(message);
  }

  async getAwayLeaderboard(req: Request, res: Response) {
    const { type, message } = await this.leaderboardService.getLeaderboardAway();
    return res.status(type).json(message);
  }
}
