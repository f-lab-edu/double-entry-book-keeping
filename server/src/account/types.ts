import { Account } from '@prisma/client';

export type CreateAccountInput = Pick<Account, 'userId' | 'name' | 'parentId'>;

export type UpdateAccountInput = {
  id: Account['id'];
  data: Partial<Pick<Account, 'parentId' | 'name' | 'isActive'>>;
};
