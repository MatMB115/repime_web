import { NextApiRequest, NextApiResponse } from "next";
import { universidadeSchema } from "./schemas/universidade";
import { validate } from "./validate";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({...req.body, method: req.method});
};

export default validate(universidadeSchema, handler);