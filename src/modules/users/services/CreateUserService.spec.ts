import AppError from '../../../shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Matheus Frauches',
      email: 'frauches.27@gmail.com',
      password: '123123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Matheus Frauches',
      email: 'frauches.27@gmail.com',
      password: '123123123',
    });

    await expect(
      createUser.execute({
        name: 'Matheus Frauches',
        email: 'frauches.27@gmail.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
