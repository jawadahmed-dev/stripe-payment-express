import { BaseRepository, IBaseRepository } from "./base-repository";
import { UserDocument, UserModel } from "../documents/user.document";
import { User } from "../../entities/user.entity";

export interface IUserRepository extends IBaseRepository<User>{
  findByCustomerId(id: string): Promise<User | null>
}

export class UserRepository extends BaseRepository<User, UserDocument> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async findByCustomerId(customerId: string): Promise<User | null> {
    const doc = await this.model.findOne({customerId: customerId}).lean<UserDocument>().exec();
    return doc ? this.toEntity(doc) : null;
  }

  protected toEntity(doc: UserDocument): User {
    return new User({
      id: doc._id.toString(),
      email: doc.email,
      customerId: doc.customerId,
      deleted: doc.deleted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toDocument(entity: Partial<User>): Partial<UserDocument> {
    return {
      customerId: entity.userCustomerId,
      deleted: entity.isDeleted,
      createdAt: entity.createdOn,
      updatedAt: entity.lastUpdated,
    } as Partial<UserDocument>;
  }
}