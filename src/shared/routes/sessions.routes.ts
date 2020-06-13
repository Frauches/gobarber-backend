import { Request, Response, Router } from 'express';
import CreateSessionService from '../../modules/users/services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionService();

  const { user, token } = await createSession.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
