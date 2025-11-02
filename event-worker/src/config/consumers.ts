import { MainConsumer } from "../consumers/main-consumer";
import { container } from "./container";

export async function startMainConsumer() {
    const consumer = container.resolve(MainConsumer);
    await consumer.start();
}
