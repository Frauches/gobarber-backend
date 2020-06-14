import { parseISO } from 'date-fns';
import { Request, Response, Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request: Request, response: Response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
