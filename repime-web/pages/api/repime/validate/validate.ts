import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectSchema, AnyObject } from "yup";

export function validate(schema: ObjectSchema<AnyObject>, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if(['POST', 'PUT'].includes(String(req.method))){
            try{
                req.body = await schema.validate(req.body, {stripUnknown: true, abortEarly:false});
            }
            catch(error) {
                return res.status(400).json(error);
            }
        }
        await handler(req, res);
    }
}