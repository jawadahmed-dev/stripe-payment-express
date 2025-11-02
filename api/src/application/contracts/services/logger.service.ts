import { Log } from "../../../domain/entities/log.entity";

export interface ILoggerService
{
    logInfo(event: string, message: string, details?: any, userId?: string): Promise<Log>;

    logWarn(event: string, message: string, details?: any, userId?: string): Promise<Log>;

    logError(event: string, message: string, details?: any, userId?: string): Promise<Log>;
  
}