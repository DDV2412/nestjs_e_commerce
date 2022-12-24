import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { UserDTOLogin, UserDTORegister, UserDTO } from '../dto/user.dto';
import { Inject } from '@nestjs/common';
import { compareSync } from 'bcrypt';

export class UserRepo {
  constructor(@Inject('User') private readonly userModel: Model<IUser>) {}

  getRegister = async (userData: UserDTORegister): Promise<IUser> => {
    return await new this.userModel(userData).save();
  };

  getLogin = async (userData: UserDTOLogin): Promise<IUser | null> => {
    const customer = await this.userModel
      .findOne({ email: userData.email })
      .select('+password');

    if (!customer) {
      return null;
    }

    const isMatch = compareSync(userData.password, customer.password);

    if (!isMatch) {
      return null;
    }
    return customer;
  };

  getUserById = async (id: string): Promise<IUser | null> => {
    return await this.userModel.findById(id);
  };

  getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await this.userModel.findOne({ email: email });
  };

  getAllUser = async (): Promise<UserDTO[]> => {
    return await this.userModel.find();
  };

  addUser = async (userData: UserDTO): Promise<UserDTO> => {
    return await new this.userModel(userData).save();
  };

  updateUser = async (
    id: string,
    userUpdate: UserDTO,
  ): Promise<UserDTO | null> => {
    return await this.userModel.findByIdAndUpdate(id, userUpdate);
  };

  deleteUser = async (id: string): Promise<UserDTO | null> => {
    return await this.userModel.findByIdAndRemove(id);
  };
}
