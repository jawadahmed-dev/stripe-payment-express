// base/BaseController.ts

import { Response } from 'express';
import { ApiResponse } from '../contracts/common/api-response';

export abstract class BaseController {
  protected ok<T>(res: Response, data: T, message = "Success") {
    res.status(200).json(ApiResponse.success(data, message));
  }

  protected created<T>(res: Response, data: T, message = "Created") {
    res.status(201).json(ApiResponse.created(data, message));
  }

  protected fail(res: Response, error: Error | string, statusCode = 500) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(statusCode).json(ApiResponse.error(errorMessage, [errorMessage], statusCode));
  }
}

