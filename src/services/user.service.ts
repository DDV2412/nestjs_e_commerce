import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { Status } from 'src/utils/enum';
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

  updateStatus = async (
    id: string,
    isStatus: Status,
  ): Promise<UserDTO | null> => {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    return await this.userRepo.updateUser(id, { isStatus: isStatus });
  };

  deleteUser = async (id: string): Promise<UserDTO | null> => {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }
    return await this.userRepo.deleteUser(id);
  };
}
