import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';

import User from '../database/models/User.model';
import { ILogin, IUser } from '../interfaces/IUser';

export default class LoginService {
  constructor(private model: ModelStatic<User> = User) {
    // this.userModel = model;
  }

  async login(userLogin: IUser): Promise<ILogin> {
    const { email, password } = userLogin;
    console.log(userLogin, 'USERLOGIN');

    const user = await this.model.findOne({
      where: { email } });

    console.log(user, 'USER');

    if (!user) {
      throw new Error('Invalid email or password');
    }
    if (bcrypt.compareSync(user.password, password)) {
      throw new Error('Invalid email or password');
    }

    return user;
  }
}
