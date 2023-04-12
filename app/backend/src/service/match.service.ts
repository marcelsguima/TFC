import { ModelStatic } from 'sequelize';
import { IMatch } from '../interfaces/IMatch';
import Matches from '../database/models/Match.model';
import Teams from '../database/models/Team.model';

import { ITeam } from '../interfaces/ITeam';

export default class ServiceMatches {
  constructor(
    private matches: ModelStatic<Matches>,
    private team: ModelStatic<Teams>,
  ) {
    this.matches = matches;
    this.team = team;
  }

  async getAll(): Promise<Matches[]> {
    const result = await this.matches.findAll({
      include: [
        {
          model: this.team,
          as: 'awayTeam',
        },
        {
          model: this.team,
          as: 'homeTeam',
        }],
    });
    return result;
  }

  async inProgressMatch(id: number): Promise<void> {
    await this.matches.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(match: IMatch): Promise<IMatch> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;
    const newMatch = await this.matches.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress });
    return newMatch;
  }

  async getTeamById(id: number): Promise<ITeam | null> {
    const team = await this.team.findByPk(id);
    return team;
  }
}
