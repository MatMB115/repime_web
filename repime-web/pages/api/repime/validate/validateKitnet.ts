import { NextApiRequest, NextApiResponse } from "next";
import { kitnetSchema } from "./schemas/kitnet";
import { validate } from "./validate";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({...req.body, method: req.method});
};

export default validate(kitnetSchema, handler);