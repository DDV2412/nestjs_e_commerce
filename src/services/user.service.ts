import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTORegister, UserDTOLogin } from '../dto/user.dto';
import { UserRepo } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
  ) {}

  generateToken = (payload: Record<string, string>) => {
    return this.jwtService.sign(payload, {
      secret: String(process.env.JWT_SECRET),
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
}
