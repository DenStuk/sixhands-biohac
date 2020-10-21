import { Logger } from "@root/domain/services/Logger";
import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`${req.method}  ${req.url}`);
    next();
}