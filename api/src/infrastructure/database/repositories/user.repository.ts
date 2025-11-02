import { IUserRepository } from "../../../application/contracts/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";
import { UserDocument, UserModel } from "../documents/user.document";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User, UserDocument> implements IUserRepository {
  constructor() {
    super(UserModel);
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
