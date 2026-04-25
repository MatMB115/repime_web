import { NextApiResponse } from "next";

import { getErrorMessage, getErrorStatus } from "./errors";

export function success(res: NextApiResponse, msg_ret: string, result?: unknown) {
  return res.status(200).json({
    repime: {
      cod_ret: 0,
      msg_ret,
      ...(result === undefined ? {} : { result }),
    },
  });
}

export function failure(res: NextApiResponse, error: unknown) {
  return res.status(getErrorStatus(error)).json({
    repime: {
      cod_ret: 1,
      msg_ret: getErrorMessage(error),
    },
  });
}
