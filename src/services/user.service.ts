import { Injectable } from '@nestjs/common';
import { UserDTORegister, UserDTOLogin } from '../dto/user.dto';
import { UserRepo } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  getRegister = async (userData: UserDTORegister): Promise<UserDTORegister> => {
    return await this.userRepo.getRegister(userData);
  };

  getLogin = async ({
    email,
    password,
  }: UserDTOLogin): Promise<UserDTOLogin | null> => {
    return await this.userRepo.getLogin({
      email: email,
      password: password,
    });
  };
}
