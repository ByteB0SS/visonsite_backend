import fastify from "fastify";
import * as dotenv from "dotenv";
import { Routes } from "../src/routes";

dotenv.config({ path: "./.env" });

export const app = fastify({
    logger: true
});

app.get('/', async () => {
    return "Holla, seja bem-vindo."
});

app.register(Routes);

export default async (req: any, res: any) => {
    await app.ready();
    app.server.emit('request', req, res);
}