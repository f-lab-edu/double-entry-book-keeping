import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: Pick<Prisma.UserCreateInput, 'id' | 'password'>) {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await this.userService.create(data.id, hashedPassword, salt);

    const payload = { sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    return { message: '정상적으로 회원가입되었습니다.', access_token };
  }

  async signin(data: Pick<Prisma.UserCreateInput, 'id' | 'password'>) {
    const user = await this.userService.read(data.id);

    if (!user) {
      throw new NotFoundException();
    }

    const { salt, password: hashedPassword } = user;

    const hash = await bcrypt.hash(data.password, salt);

    if (hash !== hashedPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: '정상적으로 로그인되었습니다.',
      access_token,
    };
  }
}
