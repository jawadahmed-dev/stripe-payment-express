// middlewares/global-error-handler.ts
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../contracts/common/api-response";

export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = 500;
  let message = "Internal Server Error";
  let errors: string[] = [];

  if (err instanceof Error) {
    message = err.message;
    errors = [err.message];
  } else if (typeof err === "string") {
    message = err;
    errors = [err];
  } else {
    errors = ["Unexpected error"];
  }

  console.error("Unhandled error:", err);

  res
    .status(statusCode)
    .json(ApiResponse.error(message, errors, statusCode));
}
