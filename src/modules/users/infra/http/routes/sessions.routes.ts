import { Request, Response, Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const createSession = container.resolve(AuthenticateUserService);

  const { user, token } = await createSession.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
