import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractJwtFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getJwtConfig().secret,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractJwtFromHeader(request: Request): string | undefined {
    if (!request.headers.cookie) {
      throw new UnauthorizedException();
    }

    const cookies: string[] = request.headers.cookie.split('; ');

    if (cookies.length == 0) {
      return undefined;
    }

    const jwtCookie = cookies.find((cookie) => cookie.startsWith('jwt='));

    if (!jwtCookie) return undefined;

    const [_, jwtValue] = jwtCookie.split('=');

    return jwtValue;
  }
}
