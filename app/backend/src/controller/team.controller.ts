import { NextFunction, Request, Response } from 'express';
import TeamService from '../service/team.service';

export default class TeamController {
  private _teamService: TeamService;

  constructor(teamService: TeamService) {
    this._teamService = teamService;
  }

  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    try {
      const teams = await this._teamService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
    }
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this._teamService.getTeamById(id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
