import { Account } from '@prisma/client';

export type CreateAccountInput = Pick<
  Account,
  'userId' | 'name' | 'debitOrCredit' | 'accountType'
>;

export type UpdateAccountInput = Pick<Account, 'userId' | 'name'> & {
  data: Partial<Pick<Account, 'parentName' | 'name'>>;
};
