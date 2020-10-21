import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RequestError } from "@root/domain/errors/RequestError";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) throw new RequestError(401, "Not authorized");
    const token = req.headers.authorization.split(" ")[1] || null;

    let payload: any;
    try { payload = jwt.verify(token!, process.env.TOKEN_SECRET!) } 
    catch (err) { throw new RequestError(401, err.message) }

    if (!payload.role) throw new RequestError(400, "Invalid token");
    if (!req.user) throw new RequestError(404, "User not found");

    next();
};
