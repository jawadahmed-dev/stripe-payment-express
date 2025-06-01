// base/BaseController.ts

import { Response } from 'express';
import { ApiResponse } from '../utils/api-response';

export abstract class BaseController {
  protected ok<T>(res: Response, data: T, message?: string) {
    const response = ApiResponse.success(data, message);
    res.status(response.statusCode).json(response);
  }

  protected created<T>(res: Response, data: T, message?: string) {
    const response = ApiResponse.created(data, message);
    res.status(response.statusCode).json(response);
  }

  protected fail(res: Response, error: Error | string, statusCode = 500) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const response = ApiResponse.error(errorMessage, [errorMessage], statusCode);
    res.status(response.statusCode).json(response);
  }
}
