import { Request, Response } from 'express';

import { LoginService } from '../service';
import { ILogin } from '../interfaces';
import JWT from '../auth/JWT';

export default class LoginController {
  constructor(private _tokenJWT: JWT, private _service = new LoginService()) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this._service.login({ email, password });

      const { id, username, role } = user;
      const data: ILogin = { username, email, role, id };
      const token = this._tokenJWT.generateToken(data);

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  verifyToken = async (req: Request, res: Response) => {
    const user = req.body.data;
    console.log(req.headers.authorization, 'USER');

    if (user) {
      return res.status(200).json({ role: user.role });
    }
    return res.status(401).json({ message: 'Invalid token' });
  };
}
