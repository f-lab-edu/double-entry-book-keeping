import { Account } from '@prisma/client';

export type CreateAccountInput = Pick<Account, 'userId' | 'name' | 'parentId'>;

export type UpdateAccountInput = Pick<Account, 'userId' | 'name'> & {
  data: Partial<Pick<Account, 'parentId' | 'name'>>;
};
