export const apiResponse = (ctx, msg, data, statusCode, status) => {

    const resData = {
      status,
      message: msg,
      data
    };
    ctx.body = resData;
    ctx.status = statusCode;
  };
  