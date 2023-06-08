import conn from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const getRecentTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = `
            SELECT
                t.transaction_hash,
                t.block_timestamp,
                t.signer_account_id,
                r.receiver_account_id,
                ta.action_kind,
                ta.args
            FROM
                receipts r
                JOIN transactions t
                    ON r.originated_from_transaction_hash = t.transaction_hash
                JOIN transaction_actions ta
                    ON t.transaction_hash = ta.transaction_hash
            WHERE r.receiver_account_id = $1 
            LIMIT 5`;
        const values = [req.body.accountId];
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