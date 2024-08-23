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
import { ConfigService } from 'src/config/config.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(
    @Body() body: Pick<Prisma.UserCreateInput, 'id' | 'password'>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { message, access_token } = await this.authService.signup(body);

    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: this.configService.getEnvironment() === 'production',
      sameSite: 'strict',
      maxAge: this.configService.getJwtConfig().cookie.maxAge,
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
      secure: this.configService.getEnvironment() === 'production',
      sameSite: 'strict',
      maxAge: this.configService.getJwtConfig().cookie.maxAge,
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
