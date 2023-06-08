import { nearConnectionContext } from '@/pages/_app';
import axios from 'axios';
import { Near } from 'near-api-js';
import { AccountBalance } from 'near-api-js/lib/account';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

type Transaction = {
  transaction_hash: string;
  block_timestamp: string;
  signer_account_id: string;
  receiver_account_id: string;
  action_kind: string;
  args: any;
}

async function getRecentTransactions(accountId: string) {
  const response = await axios.post('/api/getRecentTransactions', {
    accountId: accountId,
  });
  return response.data.rows.sort((a: Transaction, b: Transaction) => (+a.block_timestamp) - (+b.block_timestamp)) as Transaction[];
}

async function getAccountBalance(nearConnection: Near, accountId: string) {
  console.log(nearConnection, accountId);
  const account = await nearConnection.account(accountId);
  return await account.getAccountBalance();
}

export default function Account() {
  const [accountBalance, setAccountBalance] = useState<AccountBalance>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>(undefined);
  const { nearConnection } = useContext(nearConnectionContext);
  const router = useRouter();
  const accountId = router.query.account as string;

  useEffect(() => {
    if (accountId && nearConnection) {
      getAccountBalance(nearConnection, accountId)
        .then(balance => setAccountBalance(balance));
      getRecentTransactions(accountId)
        .then(transactions => setTransactions(transactions));
    }
  }, [nearConnection, accountId]);

  return (
    <main className='flex min-h-screen flex-col items-center gap-10 h-screen'>
      <div className='flex flex-col gap-2 bg-neutral-800 py-8 px-16 rounded-2xl items-center w-fit'>
        <span className='text-3xl'>{accountId}&apos;s account balance</span>
      {accountBalance &&
        <ul className='flex flex-col gap-2 bg-neutral-700 p-4  rounded-2xl w-fit'>
          <li className='grid grid-cols-2 bg-neutral-600 p-2'>
            <span>Total:</span>
            <span>{accountBalance.total}</span>
          </li>
          <li className='grid grid-cols-2 bg-neutral-600 p-2'>
            <span>State staked:</span>
            <span>{accountBalance.stateStaked}</span>
          </li>
          <li className='grid grid-cols-2 bg-neutral-600 p-2'>
            <span>Staked:</span>
            <span>{accountBalance.staked}</span>
          </li>
          <li className='grid grid-cols-2 bg-neutral-600 p-2'>
            <span>Available:</span>
            <span>{accountBalance.available}</span>
          </li>
        </ul>
      }
      {!accountBalance &&
        <>Loading balance...</>
      }
      </div>
      <div className='flex flex-col items-center w-full'>
        <span className='text-3xl self-start'>Transactions</span>
        <hr className=' bg-neutral-300 w-full mb-4 p-0.5'/>
        <ul className='w-full'>
          {transactions && transactions.map((transaction: Transaction) => (
            <>
            <li key={transaction.transaction_hash}
              className='flex flex-row justify-between w-full'>

              <div className='flex flex-col gap-1'>
                <span>Action: {transaction.action_kind}</span>
                <span>Signed by: {transaction.signer_account_id}</span>
                <span>Receiver: {transaction.receiver_account_id}</span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis'>
                  {'Transaction hash: '}
                  <Link className='text-purple-600'
                        href={`/transactions/${transaction.transaction_hash}`}>
                    {transaction.transaction_hash}
                  </Link>
                </span>
                  {new Date(+transaction.block_timestamp/1000000).toUTCString()}
                <span>

                </span>
              </div>
            </li>
            <hr className='my-2'/>
            </>
          ))}
          {!transactions &&
            <>Loading transactions....</>
          }
        </ul>
      </div>
    </main>
  )
}
