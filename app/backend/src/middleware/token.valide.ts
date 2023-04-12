import { Response, Request, NextFunction } from 'express';
import JWT from '../auth/JWT';
import { ILogin } from '../interfaces';

const verifyTokenLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const toVerify = req.header('Authorization');
    console.log(req.header('Authorization'), 'HEADER');

    if (!toVerify) return res.status(401).json({ message: 'Token not found' });

    const jwt = new JWT();
    const isValidToken = jwt.validateToken(toVerify) as ILogin;
    req.body.data = isValidToken;
    console.log(isValidToken);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyTokenLogin;
