import { Request, Response } from 'express';
import ServiceMatches from '../service/match.service';

export default class ControllerMatches {
  constructor(private matches: ServiceMatches) {
    this.matches = matches;
  }

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let result = await this.matches.getAll();
    if (inProgress) {
      result = result.filter((match) => match.inProgress.toString() === inProgress);
    }
    return res.status(200).json(result);
  };

  inProgressMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matches.inProgressMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matches.updateMatch(homeTeamGoals, awayTeamGoals, Number(id));
    return res.status(200).json({ message: 'OK' });
  };

  teamsExists = async (homeTeamId: number, awayTeamId: number): Promise<boolean> => {
    const homeTeam = await this.matches.getTeamById(homeTeamId);
    const awayTeam = await this.matches.getTeamById(awayTeamId);

    if (!homeTeam || !awayTeam) return true;
    return false;
  };

  createMatch = async (req: Request, res: Response) => {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;

    const teams = await this.teamsExists(homeTeamId, awayTeamId);
    if (teams) return res.status(404).json({ message: 'There is no team with such id!' });

    const newMatch = await this.matches.createMatch({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });
    return res.status(201).json(newMatch);
  };
}
