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

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dateTimeService: DateTimeService,
  ) {}

  async create(createAccountInput: CreateAccountInput) {
    const { userId, name, parentName } = createAccountInput;

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
      userId_name: {
        userId,
        name: parentName,
      },
    });

    if (!parentAccount) {
      throw new NotFoundException(
        `${parentAccount}라는 부모 계정과목이 존재하지 않습니다.`,
      );
    }

    return this.prisma.account.create({
      data: {
        userId,
        parentName,
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
    const { userId, name, data } = updateAccountInput;

    const account = await this.readUnique({
      userId_name: {
        userId,
        name,
      },
    });

    if (!account) {
      throw new NotFoundException(
        '업데이트하려는 계정과목이 존재하지 않습니다.',
      );
    }

    if (data.name) {
      const accountWithChangedName = await this.readUnique({
        userId_name: {
          userId,
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
            userId,
            name: data.name,
          },
        },
        data,
      });
    }

    if (data.parentName) {
      const accountWithParentName = await this.readUnique({
        userId_name: {
          userId,
          name: data.parentName,
        },
      });

      if (!accountWithParentName) {
        throw new NotFoundException(
          `${data.parentName}이라는 계정과목이 존재하지 않아 부모 계정과목으로 지정할 수 없습니다.`,
        );
      }

      return this.prisma.account.update({
        where: {
          userId_name: {
            userId,
            name,
          },
        },
        data: {
          ...data,
          accountType:
            accountWithParentName.accountType !== account.accountType
              ? accountWithParentName.accountType
              : undefined,
          debitOrCredit:
            accountWithParentName.debitOrCredit !== account.debitOrCredit
              ? accountWithParentName.debitOrCredit
              : undefined,
        },
      });
    }

    throw new BadRequestException(
      '계정과목 이름이나 부모 계정과목 중 바꿀 것을 적어도 하나 이상 지정해야 합니다.',
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
