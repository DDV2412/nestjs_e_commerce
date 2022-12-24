import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces/user.interface';
import { jwtConstants } from '../utils/auth.constant';
import { UserDTORegister, UserDTOLogin, UserDTO } from '../dto/user.dto';
import { UserRepo } from '../repository/user.repository';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: UserDTOLogin): Promise<any> {
    const user = await this.userRepo.getLogin({
      email: email,
      password: password,
    });
    return user;
  }

  generateToken = (payload: Record<string, string>) => {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    });
  };

  getRegister = async (
    userData: UserDTORegister,
  ): Promise<Record<string, string> | null> => {
    const user = await this.userRepo.getRegister(userData);

    if (!user) {
      return null;
    }

    const payload = {
      name: user.name,
      email: user.email,
      roleName: user.roleName,
      photoProfile: user.photoProfile,
    };
    const token = this.generateToken(payload);

    return {
      name: user.name,
      email: user.email,
      roleName: user.roleName,
      photoProfile: user.photoProfile,
      token_access: token,
    };
  };

  getLogin = async ({
    email,
    password,
  }: UserDTOLogin): Promise<Record<string, string> | null> => {
    const user = await this.userRepo.getLogin({
      email: email,
      password: password,
    });

    if (!user) {
      return null;
    }

    const payload = {
      name: user.name,
      email: user.email,
      roleName: user.roleName,
      photoProfile: user.photoProfile,
    };
    const token = this.generateToken(payload);

    return {
      name: user.name,
      email: user.email,
      roleName: user.roleName,
      photoProfile: user.photoProfile,
      token_access: token,
    };
  };

  getProfile = async (email: string): Promise<IUser | null> => {
    return await this.userRepo.getUserByEmail(email);
  };

  updateProfile = async (
    id: string,
    userData: UserDTO,
  ): Promise<UserDTO | null> => {
    return await this.userRepo.updateUser(id, userData);
  };

  updatePassword = async (
    id: string,
    password: string,
  ): Promise<UserDTO | null> => {
    const hashPass = hashSync(password, 12);
    return await this.userRepo.updateUser(id, { password: hashPass });
  };
}
