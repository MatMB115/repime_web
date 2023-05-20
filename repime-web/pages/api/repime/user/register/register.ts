import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from "../../../../../src/app/libs/prisma_db";
import { json } from 'stream/consumers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    res.status(200).send(req.body)

}