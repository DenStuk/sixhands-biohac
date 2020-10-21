import express, { Request, Response } from "express";
import { UserAuthCommand } from "../../controllers/commands/UserAuthCommand";
import { checkRequestBody } from "../../middlewares/checkRequestBody";
import { UserLoginDTO } from "../validation/auth/UserLoginDTO";
import { UserRegisterDTO } from "../validation/auth/UserRegisterDTO";

const authRouter: express.Router = express.Router();

authRouter.post(
    "/register", 
    checkRequestBody(UserRegisterDTO),
    async (req: Request, res: Response) => {
    const command = new UserAuthCommand();
    res.status(201).send(await command.register(req.body));
});

authRouter.post(
    "/login", 
    checkRequestBody(UserLoginDTO),
    async (req: Request, res: Response) => {
    const command = new UserAuthCommand()
    res.status(200).send(await command.login(req.body));
});


export default authRouter;