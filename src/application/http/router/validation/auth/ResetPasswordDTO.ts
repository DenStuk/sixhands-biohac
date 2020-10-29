import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class ResetPasswordDTO {

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    resetCode: string;

    @IsDefined()
    @IsString()
    @MinLength(5, { message: "password must be at least 5 characters" })
    password: string;

}