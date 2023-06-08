import { nearConnectionContext } from '@/pages/_app';
import axios from 'axios';
import { Near } from 'near-api-js';
import { AccountBalance } from 'near-api-js/lib/account';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

async function getRecentTransactions(accountId: string) {
  const response = await axios.post('/api/getRecentTransactions', {
    accountId: accountId,
  });
  return response.data;
}

async function getAccountBalance(nearConnection: Near, accountId: string) {
  console.log(nearConnection, accountId);
  const account = await nearConnection.account(accountId);
  return await account.getAccountBalance();
}

export default function Account() {
  const [accountBalance, setAccountBalance] = useState<AccountBalance>(undefined);
  const { nearConnection } = useContext(nearConnectionContext);
  const router = useRouter();
  const accountId = router.query.account as string;

  useEffect(() => {
    getAccountBalance(nearConnection, accountId)
      .then(balance => setAccountBalance(balance));
    getRecentTransactions(accountId)
      .then(transactions => console.log(transactions));
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center'>

        KAJ JE OVO
    </main>
  )
}
