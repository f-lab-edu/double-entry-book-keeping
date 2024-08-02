import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 1000,
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 1000,
    });

    return { message };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('is-authenticated')
  async isAuthenticated(@Req() request: Request) {
    const user = request['user'];

    return { user };
  }
}
