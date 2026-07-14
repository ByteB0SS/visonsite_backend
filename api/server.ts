import fastify from "fastify";
import * as dotenv from "dotenv";
import cors = require("@fastify/cors");
import { Routes } from "../src/routes";

dotenv.config({ path: "./.env" });

export const app = fastify({
    logger: true
});

app.register(cors, {
    origin: "*", // Permite qualquer origem (podes mudar para o teu link de produção depois)
    methods: ["GET", "POST", "PUT", "DELETE"],
});

app.get('/', async () => {
    return "Holla, seja bem-vindo."
});

app.register(Routes);

export default async (req: any, res: any) => {
    await app.ready();
    app.server.emit('request', req, res);
}