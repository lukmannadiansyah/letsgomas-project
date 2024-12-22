/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { retriveDataByField } from '@/lib/firebase/service';

export async function signIn(email: string) {
  const data = await retriveDataByField('user', 'email', email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}
