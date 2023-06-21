import { Context } from 'koa';

class ApiResponse<T> {
  constructor(public message: string, public data: T, public statusCode: number, public isError: boolean) { }
}

export function successResponse<T>(ctx: Context, message: string, data: T, statusCode = 200) {
  const response = new ApiResponse<T>(message, data, statusCode, false);
  apiResponse(ctx, response);
}

export function errorResponse(ctx: Context, message: string, statusCode = 500) {
  const response = new ApiResponse<null>(message, null, statusCode, true);
  apiResponse(ctx, response);
}

function apiResponse<T>(ctx: Context, response: ApiResponse<T>) {
  ctx.status = response.statusCode;
  ctx.body = {
    message: response.message,
    data: response.data,
    isError: response.isError,
  };
}
