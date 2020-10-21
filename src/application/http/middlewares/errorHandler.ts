import { RequestError } from "@root/domain/errors/RequestError";
import { Logger } from "@root/domain/services/Logger";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== "test") Logger.error(err.message);

    if (err instanceof RequestError) {
        err.statusCode = err.statusCode || 400;
        return res.status(err.statusCode).send({ status: "ERROR", statusCode: err.statusCode, message: err.message });
    }
    
    res.status(500).send({ status: "ERROR", statusCode: 500, message: "Internal error" });
}