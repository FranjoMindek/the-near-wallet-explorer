import conn from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const getRecentTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const query = `
            SELECT
                t.transaction_hash,
                t.block_timestamp,
                t.signer_account_id,
                t.included_in_block_hash,
                t.included_in_chunk_hash,
                t.status,
                r.receiver_account_id,
                ta.action_kind
            FROM
                receipts r
                JOIN transactions t
                    ON r.originated_from_transaction_hash = t.transaction_hash
                JOIN transaction_actions ta
                    ON t.transaction_hash = ta.transaction_hash
            WHERE t.transaction_hash = $1
            LIMIT 1`; // Missing domain knowledge to ascertain what really is transaction, and how it works
		const values = [req.body.transaction_hash];
		const result = await conn.query(
			query,
			values
		);
		res.status(200).json(result);
	} catch(error) {
		res.status(503).end();
	}
};

export default getRecentTransactions;