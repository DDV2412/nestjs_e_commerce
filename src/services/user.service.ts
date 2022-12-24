import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserRepo } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}
  addUser = async (userData: UserDTO): Promise<UserDTO> => {
    return await this.userRepo.addUser(userData);
  };

  getAllUser = async (): Promise<UserDTO[]> => {
    return await this.userRepo.getAllUser();
  };

  getUserById = async (id: string): Promise<UserDTO | null> => {
    return await this.userRepo.getUserById(id);
  };

  updateUser = async (
    id: string,
    userUpdate: UserDTO,
  ): Promise<UserDTO | null> => {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    return await this.userRepo.updateUser(id, userUpdate);
  };

  deleteUser = async (id: string): Promise<UserDTO | null> => {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }
    return await this.userRepo.deleteUser(id);
  };
}
