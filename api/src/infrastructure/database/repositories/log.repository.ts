// src/infrastructure/repositories/payment-log.repository.ts
import { Model } from "mongoose";
import { Log } from "../../../domain/entities/log.entity";
import { LogDocument } from "../documents/log.document";
import { BaseRepository } from "./base.repository";
import { ILogRepository } from "../../../application/contracts/repositories/logs.repository";

export class LogRepository extends BaseRepository<Log, LogDocument> implements ILogRepository {
  constructor(model: Model<LogDocument>) {
    super(model);
  }

  protected toEntity(doc: LogDocument): Log {
    return new Log({
      id: doc._id.toString(),
      level: doc.level,
      event: doc.event,
      message: doc.message,
      details: doc.details,
      userId: doc.userId,
      createdAt: doc.createdAt
  });
  }

  protected toDocument(entity: Partial<Log>): Partial<LogDocument> {
    return {
      level: entity.level,
      event: entity.event,
      message: entity.message,
      details: entity.details,
      userId: entity.userId,
    };
  }
}
