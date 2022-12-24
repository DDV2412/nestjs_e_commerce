import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { UserDTOLogin, UserDTORegister } from '../dto/user.dto';
import { Inject } from '@nestjs/common';
import { compareSync } from 'bcrypt';

export class UserRepo {
  constructor(@Inject('User') private readonly userModel: Model<IUser>) {}

  getRegister = async (userData: UserDTORegister): Promise<UserDTORegister> => {
    return await new this.userModel(userData).save();
  };

  getLogin = async (userData: UserDTOLogin): Promise<UserDTOLogin | null> => {
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
}
