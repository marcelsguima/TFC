import { Request, Response } from 'express';

import { LoginService } from '../service';
import { ILogin } from '../interfaces';
import JWT from '../auth/JWT';

export default class LoginController {
  constructor(private _tokenJWT: JWT, private _service = new LoginService()) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await this._service.login({ email, password });

    const { id, username, role } = user;
    const data: ILogin = { username, email, role, id };
    const token = await this._tokenJWT.generateToken(data);

    res.status(200).json({ token });
  }
}
