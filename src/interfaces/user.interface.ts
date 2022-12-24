import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;

  readonly email: string;

  password: string;

  readonly roleName: string;

  readonly isVerify: boolean;

  readonly isStatus: boolean;

  readonly photoProfile: string;
}
