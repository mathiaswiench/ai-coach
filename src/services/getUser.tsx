import { useMutation } from '@tanstack/react-query';
import { db } from '../db/client';
import { userTable } from '../db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

interface UserLoginProps {
  email: string;
  password: string;
}

export const useGetUser = () => {
  return useMutation<boolean, Error, UserLoginProps>({
    mutationFn: async ({ email, password }) => {
      const result = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

      if (result.length === 0) {
        throw new Error('User not found');
      }

      const hash = result[0].pw;

      const response = await bcrypt.compare(password, hash);

      console.log(response);

      return response;
    },
    onError: (error) => {
      console.error('Error fetching user:', error.message);
    },
    onSuccess: (dbRes) => {
      if (dbRes) {
        console.log('User authenticated');
      }
    },
  });
};
