import { app } from "../../../../api/server";
import { FastifyInstance } from "fastify";
import { NotifyVisionSiteInput, NotifyVisionSiteUseCase } from "../../application/use-cases/notify-visionsite.use-case";
import { BrevoNotifierAdapter } from "../../infrastructure/adapters/notifiers/by_email/brevo-notifier.adapter";


export async function NotificationCotroller(app: FastifyInstance) {
    app.get("/contact", () => {
        return 'Olá, seja bem-vindo as rotas de notificações'
    })

    app.post<{ Body: NotifyVisionSiteInput }>("/contact", async (request, responser) => {
        const body = request.body
        const notifyUseCase = new NotifyVisionSiteUseCase(new BrevoNotifierAdapter)

        const wasSent = await notifyUseCase.execute(body)

        if (wasSent) {
            return responser
                .code(200)
                .send({
                    message: "Dados enviado com sucesso",
                    success: true
                })
        }

        return responser
            .code(500)
            .send({
                message: "Dados não enviados, algum erro no servidor.",
                success: false
            })
    })
}
