import { nearConnectionContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type TransactionDetailed = {
	transaction_hash: string;
	block_timestamp: string;
	signer_account_id: string;
	receiver_account_id: string;
	action_kind: string;
	status: string;
	included_in_block_hash: string;
	included_in_chunk_hash: string;
}

async function getTransaction(transaction_hash: string) {
	const response = await axios.post('/api/getTransaction', {
		transaction_hash: transaction_hash,
	});
	console.log(response.data.rows);
	return response.data.rows[0] as TransactionDetailed;
}


export default function Account() {
	const { nearConnection } = useContext(nearConnectionContext);
	const router = useRouter();
	const transaction_hash = router.query.transaction as string;
	const [transaction, setTransaction] = useState<TransactionDetailed>(undefined);

	useEffect(() => {
		if (transaction_hash) {
			getTransaction(transaction_hash)
				.then(transaction => setTransaction(transaction));
		}
	}, [transaction_hash]);


	return (
		<main className='flex min-h-screen flex-col items-center gap-10 h-screen'>
			<div className='flex flex-col gap-4 bg-neutral-800 py-8 px-16 rounded-2xl items-center w-fit'>
				<span className='text-3xl'>Transaction: {transaction_hash}</span>
				{transaction &&
					<div className='grid grid-cols-4 gap-2 bg-neutral-700 p-2 w-fit'>
						<div className='col-span-2 flex flex-col bg-neutral-600 p-3'>
							<span>Signed by: </span>
							<Link className='text-cyan-300' href={`/accounts/${transaction.signer_account_id}`}>
								{transaction.signer_account_id}
							</Link>
						</div>
						<div className='col-span-2 flex flex-col bg-neutral-600 p-3'>
							<span>Receiver: </span>
							<Link className='text-cyan-300' href={`/accounts/${transaction.receiver_account_id}`}>
								{transaction.receiver_account_id}
							</Link>
						</div>
						<div className='col-span-1 flex flex-col bg-neutral-600 p-3'>
							<span>Status: </span>
							<span>{transaction.status}</span>
						</div>
						<div className='col-span-1 flex flex-col bg-neutral-600 p-3'>
							<span>Action: </span>
							<span>{transaction.action_kind}</span>
						</div>
						<div className='col-span-2 flex flex-col bg-neutral-600 p-3'>
							<span>Created: </span>
							<span>{new Date(+transaction.block_timestamp/1000000).toUTCString()}</span>
						</div>
						<div className='col-span-4 flex flex-col bg-neutral-600 p-3'>
							<span>Block hash:</span>
							<span>{transaction.included_in_block_hash}</span>
						</div>
						<div className='col-span-4 flex flex-col bg-neutral-600 p-3'>
							<span>Chunk hash:</span>
							<span>{transaction.included_in_chunk_hash}</span>
						</div>
					</div>
				}
				{!transaction &&
					<>Loading transaction...</>
				}
			</div>
		</main>
	)
}
