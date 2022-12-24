import { Document } from 'mongoose';
import { Status } from 'src/utils/enum';

export interface IUser extends Document {
  readonly name: string;

  readonly email: string;

  readonly password: string;

  readonly roleName: string;

  readonly isStatus: Status;

  readonly photoProfile: string;
}
