import {  useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [accountId, setAccountId] = useState('');
  const router = useRouter();

  async function onSubmit(accountId: string) {
    axios.post('/api/checkIfAccountExists', {
      accountId: 'sandi-fatic.near',
    })
      .then(res => {
        if (res.data.rowCount > 0) {
          router.push('/accounts/' + accountId)
        }
      });
  }

  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='flex flex-col items-center gap-4 w-full'>
        <span className='text-xl'>Your <strong>near</strong> account id:</span>
        <input 
          className='text-black p-1 rounded-xl w-1/3 min-w-[300px]'
          type='text'
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          pattern='.*\.near'/>
        <button 
          className='p-2 bg-white text-black rounded-xl text-center'
          onClick={() => onSubmit(accountId)}>
            Submit
        </button>
      </div>

    </main>
  )
}
