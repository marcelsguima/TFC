import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IJWT, ILogin, IToken } from '../interfaces';

dotenv.config();

export default class JWT implements IToken {
  private _jwt = jwt;
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'secret';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '7d',
    };
  }

  generateToken(payload: ILogin): IJWT {
    const token = this._jwt.sign(payload, this._secret, this._options);
    return token;
  }

  validateToken(token: IJWT): ILogin {
    try {
      const decoded = jwt.verify(token, this._secret);
      return decoded as ILogin;
    } catch (err) {
      throw new Error('Token must be a valid token');
    }
  }
}
