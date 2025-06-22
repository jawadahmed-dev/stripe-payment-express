export abstract class BaseEntity {
  public id?: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public modifiedBy?: string;
  public createdBy: string;

  constructor(props?: Partial<BaseEntity>) {
    this.id = props?.id;
    this.createdAt = props?.createdAt as Date;
    this.updatedAt = props?.updatedAt as Date;
    this.modifiedBy = props?.modifiedBy;
    this.createdBy = props?.createdBy ?? '';
  }
}