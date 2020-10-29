import express, { Request, Response } from "express";
import { UserAuthCommand } from "../../controllers/commands/UserAuthCommand";
import { checkRequestBody } from "../../middlewares/checkRequestBody";
import { EmailDTO } from "../validation/auth/EmailDTO";
import { ResetPasswordDTO } from "../validation/auth/ResetPasswordDTO";
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

authRouter.post(
    "/forgot-password", 
    checkRequestBody(EmailDTO), 
    async (req: Request, res: Response) => {
    const command = new UserAuthCommand();
    res.status(200).send(await command.forgotPassword(req.body));
});

authRouter.post(
    "/forgot-password/reset", 
    checkRequestBody(ResetPasswordDTO), 
    async (req: Request, res: Response) => {
    const command = new UserAuthCommand();
    res.status(200).send(await command.resetPassword(req.body));
});


export default authRouter;