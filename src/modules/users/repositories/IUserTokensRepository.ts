import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken | undefined>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
