import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team.model';
import { ITeam } from '../interfaces/ITeam';

export default class TeamService {
  constructor(
    private _teamModel: ModelStatic<Team> = Team,
  ) {
  }

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  async getTeamById(id: string): Promise<ITeam | null> {
    const team = await this._teamModel.findByPk(id);
    return team;
  }
}
