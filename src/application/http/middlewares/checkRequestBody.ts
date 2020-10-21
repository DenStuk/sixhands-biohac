import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { RequestError } from "@root/domain/errors/RequestError";

export const checkRequestBody = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const output: any = plainToClass(dtoClass, req.body);
        const errors = await validate(output, { skipMissingProperties: true });

        if (errors.length > 0) throw new RequestError(400, serializeErrors(errors));

        next();
    }
}

const serializeErrors = (errors: ValidationError[]): string => {
    let errorMessage = "";
    for (const error of errors) {
        for (const constrain in error.constraints) {
            errorMessage += error.constraints[constrain] + "; ";
        }
    }
    return errorMessage.slice(0, -2);
}