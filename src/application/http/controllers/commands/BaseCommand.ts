import { IRequestOk } from "@root/domain/interfaces/IRequestOk";

export class BaseCommand {

    protected serializeResult(statusCode: number, data?: any): IRequestOk {
        if (data) return { statusCode, status: "SUCCESS", data };
        return { statusCode, status: "SUCCESS" };
    }

}