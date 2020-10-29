import { IsDefined, IsEmail } from "class-validator";

export class EmailDTO {

    @IsDefined()
    @IsEmail()
    email: string;

}