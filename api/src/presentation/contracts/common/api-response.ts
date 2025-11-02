// utils/ApiResponse.ts
export class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public data?: T,
    public message?: string,
    public errors?: string[]
  ) {}

  static success<T>(data: T, message = "Success") {
    return new ApiResponse(200, data, message);
  }

  static created<T>(data: T, message = "Created") {
    return new ApiResponse(201, data, message);
  }

  static error<T>(message: string, errors: string[] = [], statusCode = 500) {
    return new ApiResponse<T>(statusCode, undefined, message, errors);
  }
}
