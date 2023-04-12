import { Router } from 'express';
import User from '../database/models/User.model';
import LoginController from '../controller/login.controller';
import LoginService from '../service/login.service';
import LoginValidation from '../middleware/login.validate';
import JWT from '../auth/JWT';
import verifyTokenLogin from '../middleware/token.valide';

const loginRouter = Router();
const loginService = new LoginService(User);
const jtw2 = new JWT();
const loginController = new LoginController(jtw2, loginService);

loginRouter.post('/', LoginValidation, (req, res) => loginController.login(req, res));
loginRouter.get('/role', verifyTokenLogin, (req, res) => loginController.verifyToken(req, res));

export default loginRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjgxMzAyOTcyLCJleHAiOjE2ODE5MDc3NzJ9.x4ewYXiI3vt4LsTiO1otYoiWws70dVaFYd0KVS4SubM
