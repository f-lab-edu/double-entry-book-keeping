import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountInput, UpdateAccountInput } from './types';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(
    @Request() req,
    @Body() body: Omit<CreateAccountInput, 'userId'>,
  ) {
    return this.accountService.create({
      userId: req.user.sub,
      ...body,
    });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':name')
  async update(
    @Request() req,
    @Param('name') name: string,
    @Body() body: Omit<UpdateAccountInput, 'userId' | 'name'>,
  ) {
    return this.accountService.update({
      userId: req.user.sub,
      name,
      ...body,
    });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async read(@Request() req) {
    return this.accountService.readMany({
      where: {
        userId: req.user.sub,
        parentId: null,
      },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: true,
              },
            },
          },
        },
      },
    });
  }
}
