import { inject, injectable } from "tsyringe";
import { CreatePaymentIntentCommand, CreatePaymentIntentResult } from "../../contracts/models/create-payment-intent";
import { CreateSetupIntentCommand, CreateSetupIntentResult } from "../../contracts/models/create-setup-intent";
import { HandleWebhookEventCommand } from "../../contracts/models/webhook-event";
import { IPaymentProvider } from "../../contracts/providers/payment.provider";
import { IPaymentService } from "../../contracts/services/payment.services";
import TYPES from "../../../config/types";
import { PaymentMapper } from "../mappers/payment.mapper";
import { IPaymentRepository } from "../../contracts/repositories/payment.repository";
import { IWebhookEventRepository } from "../../contracts/repositories/webhook-event.repository";
import { getPaymentMethodsResult } from "../../contracts/models/get-payment-methods";
import { IPaymentMethodRepository } from "../../contracts/repositories/payment-method.repository";
import { CreateRefundCommand, CreateRefundResult } from "../../contracts/models/create-refund";
import { IRefundRepository } from "../../contracts/repositories/refund.repository";

@injectable()
export class PaymentService implements IPaymentService
{
    private readonly paymentProvider : IPaymentProvider;
    private readonly paymentrepository : IPaymentRepository;
    private readonly webhookEventRepository : IWebhookEventRepository;
    private readonly paymentMethodRepository : IPaymentMethodRepository;
    private readonly refundRepository : IRefundRepository;
    
    constructor(
        @inject(TYPES.PaymentProvider) paymentProvider: IPaymentProvider,
        @inject(TYPES.PaymentRepository) paymentRepository: IPaymentRepository,
        @inject(TYPES.PaymentMethodRepository) paymentMethodRepository: IPaymentMethodRepository,
        @inject(TYPES.WebhookEventRepository) webhookEventRepository: IWebhookEventRepository,
        @inject(TYPES.RefundRepository) refundRepository: IRefundRepository,
    
    ) {
        this.paymentProvider = paymentProvider; 
        this.paymentrepository = paymentRepository; 
        this.paymentMethodRepository = paymentMethodRepository; 
        this.webhookEventRepository = webhookEventRepository;
        this.refundRepository = refundRepository;
    }

    async createRefund(command: CreateRefundCommand): Promise<CreateRefundResult | null> {
        const paymentEntity = await this.paymentrepository.findByOrderId(command.orderId);
        if(!paymentEntity) return null;
        console.log("creating refund handler : "+ paymentEntity);
        console.log("creating refund handler - id : "+ paymentEntity.paymentIntentId);
        const createRefundResult = await this.paymentProvider.createRefund(command, paymentEntity.paymentIntentId);
        const refundEntityToCreate = PaymentMapper.toRefundEntity(createRefundResult, paymentEntity.paymentIntentId);
        await this.refundRepository.create(refundEntityToCreate);
        return createRefundResult;
    }

    async getPaymentMethods(userId?: string): Promise<getPaymentMethodsResult[]> {
        var paymentMethodEntities = await this.paymentMethodRepository.get(userId);
        var result = PaymentMapper.toGetPaymentMethodsResult(paymentMethodEntities);
        return result;
    }

    async createSetupIntent(command: CreateSetupIntentCommand): Promise<CreateSetupIntentResult> {
        var result = await this.paymentProvider.createSetupIntent(command);
        return result;
    }

    async createPaymentIntent(command: CreatePaymentIntentCommand): Promise<CreatePaymentIntentResult> {
        var createPaymentIntentResult = await this.paymentProvider.createPaymentIntent(command);
        var paymentEntity = PaymentMapper.toPaymentEntity(command, createPaymentIntentResult);
        await this.paymentrepository.create(paymentEntity);
        return createPaymentIntentResult;
    }

    async handleWebhookEvent(command: HandleWebhookEventCommand): Promise<void> {
        let webhookEvent = await this.paymentProvider.makeWebhookEvent(command);
        var webhookEventEntity = PaymentMapper.toWebhookEventEntity(webhookEvent);
        await this.webhookEventRepository.create(webhookEventEntity);
        let PublishWebhookEventCommand = PaymentMapper.toPublishWebhookEventCommand(webhookEventEntity);
        console.log(`Publishing event to worker : ${JSON.stringify(PublishWebhookEventCommand)}`)
        await this.paymentProvider.publishWebhookEvent(PublishWebhookEventCommand);
    }

}