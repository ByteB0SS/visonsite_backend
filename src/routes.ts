import { FastifyInstance } from "fastify";
import { NotificationCotroller } from "./notification/presentation/controllers/notification.controller";

export function Routes (app: FastifyInstance) {
    app.register(NotificationCotroller)
}