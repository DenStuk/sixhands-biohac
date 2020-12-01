import axios from "axios";
import path from "path";
import fs from "fs";
const sendpulse = require("sendpulse-api");

var API_USER_ID = process.env.PULSE_ID;
var API_SECRET = process.env.PULSE_SECRET;
var TOKEN_STORAGE = "/tmp/";
export class MailerFacade {

    public constructor() { }

    public async sendMail(email: string, resetCode: string): Promise<void> {
          const buffer = fs.readFileSync(path.join(__dirname, "/templates/reset.html"));

          let template = buffer.toString();
          template = template.replace("{code}", resetCode);

          try {
            let credentials = await axios({
              method: "POST",
              url: "https://api.sendpulse.com/oauth/access_token",
              data: {
                "grant_type": "client_credentials",
                "client_id": process.env.PULSE_ID,
                "client_secret": process.env.PULSE_SECRET
              }
            });

            const { data } = await axios({
              method: "POST",
              url: "https://api.sendpulse.com/smtp/emails",
              headers: { "Authorization": "Bearer " + credentials.data.access_token },
              data: {
                email: {
                  "html" : template,
                  "text" : "Код восстановления: " + resetCode,
                  "subject" : "Восстановление пароля",
                  "from" : {
                    "name" : "BioHac",
                    "email" : "we@biohac.io"
                  },
                  "to" : [
                    {
                      "name" : "Denis",
                      "email" : email
                    },
                  ]
                }
              }
            });

            console.log(data);
            
          } catch (err) {
            console.log(err);
          }





        //     sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function(token) {

        //       console.log(token)

        //       const email = {
        //           "html" : template,
        //           "text" : "Восстановление пароля",
        //           "subject" : "Восстановление пароля",
        //           "from" : {
        //             "name" : "BioHac",
        //             "email" : "we@biohac.io"
        //           },
        //           "to" : [
        //             {
        //               "name" : "Denis",
        //               "email" : "den.stuk00@gmail.com"
        //             },
        //           ]
        //         };

        //         const answerGetter = function(data = "nothing") {
        //           console.log(data);
        //         }

        //         console.log(email);

        //         sendpulse.smtpSendMail(answerGetter,email);
        //   });
        // } catch (err) {
        //   console.log(err);
        // }
        
    }

}