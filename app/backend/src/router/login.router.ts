import { Router } from 'express';
import User from '../database/models/User.model';
import LoginController from '../controller/login.controller';
import LoginService from '../service/login.service';
import LoginValidation from '../middleware/login.validate';
import JWT from '../auth/JWT';

const loginRouter = Router();
const loginService = new LoginService(User);
const jtw2 = new JWT();
const loginController = new LoginController(jtw2, loginService);

loginRouter.post('/', LoginValidation, (req, res) => loginController.login(req, res));

export default loginRouter;
