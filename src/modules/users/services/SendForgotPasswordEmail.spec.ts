import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmail';
import FakeMailProvider from '../../../shared/container/Provider/MailProvider/fakes/FakeMailProvider';

describe('UpdateUserAvatar', () => {
  it('should be able to send recovery password email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

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

  it('should not be able to send recovery password email to a unregistered user email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    expect(
      sendForgotPasswordEmail.execute({
        email: 'foolano@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
