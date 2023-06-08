
import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../lib/db";

const checkIfAccountExists = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = `
            SELECT
                account_id
            FROM
                accounts a
            WHERE a.account_id = $1`;
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

export default checkIfAccountExists;