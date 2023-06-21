
export const apiResponse = (ctx: any, msg: string, data: any, statusCode: number, status: boolean): void => {
  const resData = {
    status,
    message: msg,
    data
  };
  ctx.body = resData;
  ctx.statusCode = statusCode;
};
