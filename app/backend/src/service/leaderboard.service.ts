import { ILeaderboardService } from '../interfaces/ILeaderboard';
import models from '../database/models';
import { leaderboardHome, leaderboardAway } from '../database/models/Leaderboard.model';

export default class LeaderboardService {
  getLeaderboardHome = async (): Promise<ILeaderboardService> => {
    const [leaderboard] = await models.query(leaderboardHome);
    return { type: 200, message: leaderboard };
  };

  getLeaderboardAway = async (): Promise<ILeaderboardService> => {
    const [leaderboard] = await models.query(leaderboardAway);
    return { type: 200, message: leaderboard };
  };
}
