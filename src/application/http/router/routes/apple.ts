import express, { Request, Response } from "express";

const appleRouter = express.Router();

appleRouter.post("callback/subscriptions/apple", async (req: Request, res: Response) => {
    res.status(200).end();
});

appleRouter.get("callback/subscriptions/apple", async (req: Request, res: Response) => {
    res.status(200).end();
});

export default appleRouter;