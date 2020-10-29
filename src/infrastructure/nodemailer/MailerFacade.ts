import nodemailer from "nodemailer";

interface IMailOptions {
    from: string,
    to: string,
    subject: string,
    text: string
}

export class MailerFacade {

    private readonly _transporter: any;

    public constructor() {
        this._transporter = nodemailer.createTransport({
            service: process.env.MAILER_SERVICE,
            auth: {}
        });
    }

    public async sendMail(config: IMailOptions): Promise<void>{
        this._transporter.sendMail(config);
    }

}