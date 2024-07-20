import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(
    @Body() body: Pick<Prisma.UserCreateInput, 'id' | 'password'>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { message, access_token } = await this.authService.signup(body);

    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { message };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() body: Pick<Prisma.UserCreateInput, 'id' | 'password'>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, message } = await this.authService.signin(body);

    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { message };
  }
}
