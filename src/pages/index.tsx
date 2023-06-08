import {  useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [accountId, setAccountId] = useState('');
  const router = useRouter();

  async function checkIfAccountExists(accountId: string) {
    axios.post('/api/checkIfAccountExists', {
      accountId: accountId,
    })
      .then(res => {
        if (res.data.rowCount > 0) {
          router.push('/accounts/' + accountId)
        } else {
          setAccountId('Invalid username');
        }
      });
  }

  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='flex flex-col items-center gap-4 w-full'>
        <span className='text-xl'>Your <strong>near</strong> account id:</span>
        <input 
          className='text-black p-1 rounded-xl w-1/3 min-w-[300px] border-4
            invalid:border-red-600
            valid:border-green-600'
          type='text'
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          pattern='.*\.near'/>
        {/* i hope that this pattern is okay */}
        <button
          className='p-2 bg-white text-black rounded-xl text-center'
          onClick={() => checkIfAccountExists(accountId)}>
            Submit
        </button>
      </div>

    </main>
  )
}
