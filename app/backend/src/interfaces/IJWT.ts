import { ILogin } from './IUser';

export type IJWT = string;

export interface IToken {
  generateToken(payload: ILogin): IJWT,
  validateToken(token: IJWT): ILogin,
}
