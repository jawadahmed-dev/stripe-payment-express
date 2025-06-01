// utils/ApiResponse.ts

export class ApiResponse<T> {
  statusCode: number;
  data?: T;
  errors?: string[];
  message?: string;

  constructor(
    statusCode: number,
    data?: T | undefined,
    message?: string,
    errors?: string[]
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse(200, data, message);
  }

  static created<T>(data: T, message = 'Created'): ApiResponse<T> {
    return new ApiResponse(201, data, message);
  }

  static error<T>(message: string, errors: string[] = [], statusCode = 500): ApiResponse<T> {
    return new ApiResponse(statusCode, undefined as T, message, errors);
  }
}
