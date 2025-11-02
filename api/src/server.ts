// src/server.ts
import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import paymentRoutes from "./presentation/contracts/routes/payments.routes";
import userRoutes from "./presentation/contracts/routes/users.routes";
import webhookRoutes from "./presentation/contracts/routes/webhooks.routes";
import { globalErrorHandler } from "./presentation/middlewares/exception-handler";
import path from "path";
import { connectRabbitmq } from "./config/rabbitmq";
import { setupSwagger } from "./config/swagger";
import { seedUsers } from "./config/seed-users";

const app = express();

app.use(cors());
setupSwagger(app);

// ✅ Webhook route MUST come before express.json()
// because Stripe needs the raw body
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }), // raw body for Stripe
  webhookRoutes
);

// ✅ Normal JSON parsing for the rest
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public"))); // Serves JS, CSS
app.use("/pages", express.static(path.join(__dirname, "../public/pages")));

//app.use('/api/payment-methods', paymentMethodRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);

// Optional: 404 handler before error handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ Global error handler — MUST be last
app.use(globalErrorHandler);

(async () => {
  try {
    await connectDB();
    await connectRabbitmq();

    if (process.env.SEED_USERS === "true") {
      await seedUsers();
    }

    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
})();
