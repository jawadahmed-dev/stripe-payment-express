
import { IUserRepository } from "../application/contracts/repositories/user.repository";
import { User } from "../domain/entities/user.entity";
import { container } from "./container";
import TYPES from "./types";

export async function seedUsers(): Promise<void> {
  const userRepository = container.resolve<IUserRepository>(TYPES.UserRepository);

  const users: User[] = Array.from({ length: 1 }).map(
    () =>
      new User({
        email: "jenny.rosen@gmail.com",
        customerId: "cus_SwOi6VdwuBQnZi",
      })
  );

  await userRepository.createMany(users);
  console.log(`✅ Inserted ${users.length} random users`);
}
