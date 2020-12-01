import axios from "axios";
import path from "path";
import fs from "fs";
const sendpulse = require("sendpulse-api");

interface IMailOptions {
    from: string,
    to: string,
    subject: string,
    text: string
}

var API_USER_ID = "b9e2842ff3ad0acefd30570fb9eb2e96";
var API_SECRET = "6124f26c1e7d471cd65a9e396572029a";
var TOKEN_STORAGE = "/tmp/";

export class MailerFacade {

    public constructor() { }

    public async sendMail(resetCode: string): Promise<void> {
        const buffer = fs.readFileSync(path.join(__dirname, "/templates/reset.html"));

        let template = buffer.toString();
        template = template.replace("{code}", resetCode);

        sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE, function() {
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