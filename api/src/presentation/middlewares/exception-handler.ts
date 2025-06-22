// middlewares/global-error-handler.ts

import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/api-response';

export async function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Default error message and status
  let statusCode = 500;
  let message = 'Internal Server Error';
  const errors: string[] = [];

  if (err instanceof Error) {
    errors.push(err.message)
  } else if (typeof err === 'string') {
    errors.push(err)
  }
    // 🧠 Catch-all fallback for unknown types
  else {
    errors.push('Unexpected error');
  }

  // You can log the full error for debugging (optional)
  console.error('Unhandled error:', err);

  const apiErrorResponse = ApiResponse.error(message, errors, statusCode);
  res.status(apiErrorResponse.statusCode).json(apiErrorResponse);
}
