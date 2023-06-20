exports.apiResponse = (ctx, msg, data, statusCode, status) => {
  const resData = {
    status,
    message: msg,
    data
  };
  ctx.body = resData;
  ctx.status = statusCode;
};

// //TYPESCRIPT
// import { Context } from 'koa';

// export const apiResponse = (ctx: Context, msg: string, data: any, statusCode: number, status: boolean): void => {
//   const resData = {
//     status,
//     message: msg,
//     data
//   };
//   ctx.body = resData;
//   ctx.status = statusCode;
// };
