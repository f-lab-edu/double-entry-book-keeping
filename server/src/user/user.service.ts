import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateTimeService } from 'src/date-time/date-time.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dateTimeService: DateTimeService,
  ) {}

  async create(id: string, hashedPassword: string, salt: string) {
    const user = await this.read(id);

    if (user) {
      throw new ConflictException('해당 아이디의 사용자가 이미 존재합니다.');
    } else {
      return this.prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: {
            id,
            password: hashedPassword,
            salt,
            transactionParties: {
              create: {
                name: '본인',
              },
            },
          },
        });

        const thisYear = this.dateTimeService.getCurrentYear();

        await tx.account.create({
          data: {
            userId: createdUser.id,
            name: '자산',
            accountType: 'ASSETS',
            debitOrCredit: 'DEBIT',
            accountBalances: {
              create: {
                fiscalYear: thisYear,
              },
            },
          },
        });

        await tx.account.create({
          data: {
            userId: createdUser.id,
            name: '부채',
            accountType: 'LIABILITIES',
            debitOrCredit: 'CREDIT',
            accountBalances: {
              create: {
                fiscalYear: thisYear,
              },
            },
          },
        });

        await tx.account.create({
          data: {
            userId: createdUser.id,
            name: '자본',
            accountType: 'EQUITY',
            debitOrCredit: 'CREDIT',
            accountBalances: {
              create: {
                fiscalYear: thisYear,
              },
            },
          },
        });

        await tx.account.create({
          data: {
            userId: createdUser.id,
            name: '비용',
            accountType: 'EXPENSES',
            debitOrCredit: 'DEBIT',
            accountBalances: {
              create: {
                fiscalYear: thisYear,
              },
            },
          },
        });

        await tx.account.create({
          data: {
            userId: createdUser.id,
            name: '수익',
            accountType: 'REVENUE',
            debitOrCredit: 'CREDIT',
            accountBalances: {
              create: {
                fiscalYear: thisYear,
              },
            },
          },
        });

        return createdUser;
      });
    }
  }

  async read(id: Prisma.UserWhereUniqueInput['id']) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
