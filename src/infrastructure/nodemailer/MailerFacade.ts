import axios from "axios";
import path from "path";
import fs from "fs";
const sendpulse = require("sendpulse-api");

var TOKEN_STORAGE = "/tmp/";

export class MailerFacade {

    public constructor() { }

    public async sendMail(resetCode: string): Promise<void> {
        const buffer = fs.readFileSync(path.join(__dirname, "/templates/reset.html"));

        let template = buffer.toString();
        template = template.replace("{code}", resetCode);

        sendpulse.init(process.env.PULSE_ID, process.env.PULSE_SECRET, TOKEN_STORAGE, function() {
            sendpulse.listAddressBooks(console.log);
            var email = {
                "html" : template,
                "text" : "Восстановление пароля",
                "subject" : "Восстановление пароля",
                "from" : {
                  "name" : "BioHac",
                  "email" : "we@biohac.io"
                },
                "to" : [
                  {
                    "name" : "Denis",
                    "email" : "den.stuk00@gmail.com"
                  },
                ]
              };
              var answerGetter = function(data) {
                console.log(data);
              }
              sendpulse.smtpSendMail(answerGetter,email);
        });
    }

}