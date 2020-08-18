import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmail';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send recovery password email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Foo Lano',
      email: 'foolano@example.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'foolano@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send recovery password email to a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'foolano@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a fogot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Foo Lano',
      email: 'foolano@example.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'foolano@example.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
