import { NextApiRequest, NextApiResponse } from "next";
import { vagaSchema } from "./schemas/vaga";
import { validate } from "./validate";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({...req.body, method: req.method});
};

export default validate(vagaSchema, handler);