import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) =>
  password.length >= 6;

const LoginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default LoginValidation;
