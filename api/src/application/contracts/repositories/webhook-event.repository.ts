import { WebhookEvent } from "../../../domain/entities/webhook.entity";
import { IBaseRepository } from "./base.repository";

export interface IWebhookEventRepository extends IBaseRepository<WebhookEvent>{

}