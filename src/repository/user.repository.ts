import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { UserDTOLogin, UserDTORegister } from '../dto/user.dto';
import { hashSync, compareSync } from 'bcrypt';

export class UserRepo {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  getRegister = async (userData: UserDTORegister): Promise<UserDTORegister> => {
    const customer = await new this.userModel(userData);

    customer.password = hashSync(customer.password, 12);

    return customer.save();
  };

  getLogin = async (userData: UserDTOLogin): Promise<UserDTOLogin | null> => {
    const customer = await this.userModel
      .findOne({ email: userData.email })
      .select('+password');

    if (!customer) {
      return null;
    }

    const isPasswordMatched = compareSync(userData.password, customer.password);

    if (!isPasswordMatched) {
      return null;
    }

    return customer;
  };
}
