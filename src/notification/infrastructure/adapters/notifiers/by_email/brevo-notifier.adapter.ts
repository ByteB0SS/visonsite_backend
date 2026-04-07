import { NotifierPort } from "../../../../application/ports/notifier.port";

export class BrevoNotifierAdapter implements NotifierPort {
    private readonly brevoApiKey: string;
    private readonly sendToEmails: string[];

    constructor() {
        this.brevoApiKey = process.env.BREVO_API_KEY ?? "";
        this.sendToEmails = String(process.env.SEND_TO_EMAILS ?? "").split(',');
        console.log(this.sendToEmails)
    }

    public async execute(datas: { message: string; }): Promise<boolean> {
        try {
            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": this.brevoApiKey,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    sender: { 
                        name: "VisionSite Alerta", 
                        email: "rubemernesto2@gmail.com" 
                    },
                    to: this.sendToEmails.map(email => ({ 
                        email, 
                        name: email.split("@")[0] 
                    })),
                    subject: "🚀 Novo Lead - VisionSite",
                    htmlContent: datas.message,
                }),
            });

            const result = await response.json();
            console.log("Resposta Brevo:", result);

            return response.ok;
        }
        catch (error) {
            console.error("Erro no Adaptador:", error);
            return false;
        }
    }
}