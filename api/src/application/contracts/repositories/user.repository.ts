import { User } from "../../../domain/entities/user.entity";
import { IBaseRepository } from "./base.repository";

export interface IUserRepository extends IBaseRepository<User>{

}