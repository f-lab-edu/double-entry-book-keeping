import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJwtConfig().secret,
        signOptions: {
          expiresIn: configService.getJwtConfig().expiresIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
