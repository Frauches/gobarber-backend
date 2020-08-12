import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '../../../shared/container/Provider/MailProvider/models/IMailProvider';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User is not registered', 404);
    }

    await this.mailProvider.sendMail(
      email,
      'Corpo do email de recuperação de senha',
    );
  }
}

export default SendForgotPasswordEmailService;
