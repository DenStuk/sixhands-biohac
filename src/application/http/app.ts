import express, { Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./router/routes/auth";
import { errorHandler } from "./middlewares/errorHandler";
import { RequestError } from "@root/domain/errors/RequestError";
import { logger } from "./middlewares/logger";
import appleRouter from "./router/routes/apple";

export class Application {

    private readonly app: express.Application;

    public constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(logger);
        this.app.use(morgan("combined"))
    }

    public initialize(): void {
        this.registerRoutes();
        this.app.listen(process.env.PORT, () => console.log(`Server: https://${process.env.HOST}:${process.env.PORT}`));
    }

    public get(): express.Application {
        return this.app;
    }

    private registerRoutes(): void {
        this.app.use("api/auth", authRouter);
        this.app.use("api", appleRouter);
        this.app.all("*", async (req: Request, res: Response) => {
            throw new RequestError(404, "Route not found");
        });
        this.app.use(errorHandler);
    }

}