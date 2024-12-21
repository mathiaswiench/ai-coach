import { useMutation } from '@tanstack/react-query';
import { db } from '../db/client';
import { userTable } from '../db/schema';
import { NeonHttpQueryResult } from 'drizzle-orm/neon-http';
import bcrypt from 'bcryptjs';

interface UserSignUpProps {
  email: string;
  pw: string;
}

export const useSaveUser = () => {
  return useMutation<NeonHttpQueryResult<never>, Error, UserSignUpProps>({
    mutationFn: async ({ email, pw }) => {
      const saltRounds = 10;
      return await bcrypt.hash(pw, saltRounds).then(async function (hash) {
        return await db.insert(userTable).values({
          email,
          pw: hash,
        });
      });
    },
    onError: (error) => {
      console.error('Error saving user:', error.message);
    },
    onSuccess: (dbRes) => {
      if (dbRes.rowCount > 0) {
        console.log('User saved successfully');
      }
    },
  });
};
