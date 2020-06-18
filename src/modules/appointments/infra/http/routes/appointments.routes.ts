import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request: Request, response: Response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
