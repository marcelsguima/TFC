import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team.model';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: true,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: true,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
