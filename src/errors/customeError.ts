export class NotFoundError extends Error {
    statusCode: number;
  
    constructor(message: string,statusCode:number) {
      super(message);
      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  }
  
  export class BadRequestError extends Error {
    statusCode: number;
  
    constructor(message: string,statusCode:number) {
      super(message);
      this.name = 'BadRequestError';
      this.statusCode = 400;
    }
  }
  
  export class ServerError extends Error {
    // statusCode: number;
    constructor(message: string,statusCode:number) {
      super(message);
      this.name = 'ServerError';
      statusCode = 500;
    }
  }
  