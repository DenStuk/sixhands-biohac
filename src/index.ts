import "module-alias/register";
import "reflect-metadata";
import dotenv from "dotenv";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { Application } from "./application/http/app";

class Program {

    public static async Main() {
        dotenv.config();
        const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
        console.log(connectionOptions);
        await createConnection({ ...connectionOptions, name: "default" } as any)
        const application: Application = new Application();
        application.initialize();
    }

}

Program.Main();