import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, hashedPassword: string, salt: string) {
    const user = await this.read(id);

    if (user) {
      throw new ConflictException('해당 아이디의 사용자가 이미 존재합니다.');
    } else {
      return this.prisma.user.create({
        data: {
          id,
          password: hashedPassword,
          salt,
          accounts: {
            createMany: {
              data: [
                {
                  name: '자산',
                  accountType: 'ASSETS',
                  debitOrCredit: 'DEBIT',
                },
                {
                  name: '부채',
                  accountType: 'LIABILITIES',
                  debitOrCredit: 'CREDIT',
                },
                {
                  name: '자본',
                  accountType: 'EQUITY',
                  debitOrCredit: 'CREDIT',
                },
                {
                  name: '비용',
                  accountType: 'EXPENSES',
                  debitOrCredit: 'DEBIT',
                },
                {
                  name: '수익',
                  accountType: 'REVENUE',
                  debitOrCredit: 'CREDIT',
                },
              ],
            },
          },
        },
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
