import { inject, injectable } from "tsyringe";
import { Log } from "../../../domain/entities/log.entity";
import { ILogRepository } from "../../contracts/repositories/logs.repository";
import { ILoggerService } from "../../contracts/services/logger.service";
import TYPES from "../../../config/types";

@injectable()
export class LoggerService implements ILoggerService {
  constructor(@inject(TYPES.LogRepository) private readonly repo: ILogRepository) {}

  async log(
    level: "info" | "warn" | "error",
    event: string,
    message: string,
    details?: any,
    userId?: string
  ): Promise<Log> {
    const log = new Log({ level, event, message, details, userId });
    return await this.repo.create(log);
  }

  async logInfo(event: string, message: string, details?: any, userId?: string) {
    return this.log("info", event, message, details, userId);
  }

  async logWarn(event: string, message: string, details?: any, userId?: string) {
    return this.log("warn", event, message, details, userId);
  }

  async logError(event: string, message: string, details?: any, userId?: string) {
    return this.log("error", event, message, details, userId);
  }
}
