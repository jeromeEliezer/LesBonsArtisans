import { Response } from "express";
import { Request } from "express";

class ApiError extends Error {
  public status;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

const handleError = (
  err: ApiError,
  req: Request,
  res: Response,
) => {
  const { message } = err;
  const status = err.status ? err.status : 500;
  res.status(status).json({
    status,
    message,
  });
};

export { ApiError, handleError };
