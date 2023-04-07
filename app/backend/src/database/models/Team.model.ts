import { Model, INTEGER, STRING } from 'sequelize'; // importamos os tipos direto do sequelize!
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
