// exports.apiResponse = (ctx, msg, data, statusCode) => {
//   const resData = {
//     message: msg,
//     data
//   };
//   ctx.body = resData;
//   ctx.statusCode = statusCode;
// };

export class SuccessResponse<T> {
  statusCode: number;
  data: T;
  message:String;

  constructor(data: T,message:String) {
    this.statusCode = 200;
    this.message= message
    this.data = data;
  }
}

// //TYPESCRIPT
// import { Context } from 'koa';

export const apiResponse = (ctx: any, msg: string, data: any, statusCode: number): void => {
  const resData = {
    message: msg,
    data
  };
  ctx.body = resData;
  ctx.statusCode = statusCode;
};
