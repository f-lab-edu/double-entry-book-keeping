import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountInput, UpdateAccountInput } from './types';
import { DateTimeService } from 'src/date-time/date-time.service';
import { isUndefined } from 'lodash';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dateTimeService: DateTimeService,
  ) {}

  async create(createAccountInput: CreateAccountInput) {
    console.log('createAccountInput', createAccountInput);
    const { userId, name, parentId } = createAccountInput;

    const account = await this.readUnique({
      userId_name: {
        userId,
        name,
      },
    });

    if (account) {
      throw new ConflictException('같은 이름의 계정과목이 이미 존재합니다.');
    }

    const parentAccount = await this.readUnique({
      id: parentId,
    });

    if (!parentAccount) {
      throw new NotFoundException(
        `아이디가 ${parentId}인 부모 계정과목이 존재하지 않습니다.`,
      );
    }

    return this.prisma.account.create({
      data: {
        userId,
        parentId,
        name,
        debitOrCredit: parentAccount.debitOrCredit,
        accountType: parentAccount.accountType,
        accountBalances: {
          create: {
            fiscalYear: this.dateTimeService.getCurrentYear(),
          },
        },
      },
    });
  }

  async update(updateAccountInput: UpdateAccountInput) {
    const { id, data } = updateAccountInput;

    const account = await this.readUnique({
      id,
    });

    if (!account) {
      throw new NotFoundException(
        '업데이트하려는 계정과목이 존재하지 않습니다.',
      );
    }

    if (data.name) {
      const accountWithChangedName = await this.readUnique({
        userId_name: {
          userId: account.userId,
          name: data.name,
        },
      });

      if (accountWithChangedName) {
        throw new ConflictException(
          `${data.name}이라는 계정과목이 이미 존재합니다.`,
        );
      }

      return this.prisma.account.update({
        where: {
          userId_name: {
            userId: account.userId,
            name: data.name,
          },
        },
        data,
      });
    }

    if (data.parentId) {
      const parentAccount = await this.readUnique({
        id: data.parentId,
      });

      if (!parentAccount) {
        throw new NotFoundException(
          `아이디가 ${data.parentId}라는 계정과목이 존재하지 않아 부모 계정과목으로 지정할 수 없습니다.`,
        );
      }

      return this.prisma.account.update({
        where: {
          id,
        },
        data: {
          ...data,
          accountType:
            parentAccount.accountType !== account.accountType
              ? parentAccount.accountType
              : undefined,
          debitOrCredit:
            parentAccount.debitOrCredit !== account.debitOrCredit
              ? parentAccount.debitOrCredit
              : undefined,
          isActive:
            parentAccount.isActive !== account.isActive
              ? parentAccount.isActive
              : undefined,
        },
      });
    }

    if (!isUndefined(data.isActive)) {
      return this.prisma.account.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
    }

    throw new BadRequestException(
      '계정과목 이름이나 부모 계정과목, 혹은 계정 활성화 여부 중 바꿀 것을 적어도 하나 이상 지정해야 합니다.',
    );
  }

  async readUnique(where: Prisma.AccountWhereUniqueInput) {
    return this.prisma.account.findUnique({
      where,
    });
  }

  async readMany(args: Prisma.AccountFindManyArgs) {
    return this.prisma.account.findMany(args);
  }
}
