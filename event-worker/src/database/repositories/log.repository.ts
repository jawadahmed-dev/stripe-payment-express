import { Model } from "mongoose";
import { Log } from "../../entities/log.entity";
import { LogDocument, LogModel } from "../documents/log.document";
import { IBaseRepository, BaseRepository } from "./base-repository";

export interface ILogRepository extends IBaseRepository<Log> {

}

export class LogRepository extends BaseRepository<Log, LogDocument> {
  constructor() {
    super(LogModel);
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
