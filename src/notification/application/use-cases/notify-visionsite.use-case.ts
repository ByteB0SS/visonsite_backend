import { BrevoNotifierAdapter } from "../../infrastructure/adapters/notifiers/by_email/brevo-notifier.adapter";
import { NotifierPort } from "../ports/notifier.port";
import { UseCasePort } from "../ports/use-case.port";

export interface NotifyVisionSiteInput {
    name: string,
    email: string,
    whatsappNumber: number,
    service: "Site de Alta Performance" | "Tráfego Pago" | "SEO & Conteúdo"
}

export class NotifyVisionSiteUseCase implements UseCasePort<NotifyVisionSiteInput, boolean> {
    constructor(
        private readonly notifier: NotifierPort
    ) { }

    public async execute(input: NotifyVisionSiteInput): Promise<boolean> {
        const message = this.buildMessage(input)
        return await this.notifier.execute({ message: message })
    }

    private buildMessage(data: NotifyVisionSiteInput): string {
        return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #001f3f; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Vision<span style="color: #c5a059;">Site</span></h1>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #333;">🚀 Novo Lead Chegou!</h2>
            <p style="color: #666; font-size: 16px;">Um novo potencial cliente acabou de preencher o formulário de contacto no site.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #c5a059; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Nome:</strong> ${data.name}</p>
                <p style="margin: 5px 0;"><strong>Serviço:</strong> <span style="color: #001f3f; font-weight: bold;">${data.service}</span></p>
                <p style="margin: 5px 0;"><strong>E-mail:</strong> ${data.email}</p>
                <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${data.whatsappNumber}</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <a href="https://wa.me/${data.whatsappNumber}" 
                   style="background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                   Chamar no WhatsApp
                </a>
            </div>
        </div>

        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            © 2026 VisionSite - Desenvolvimento de softwares
        </div>
    </div>
    `.trim();
    }
}