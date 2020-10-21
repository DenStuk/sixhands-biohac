import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class UserLoginDTO {

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @MinLength(5, { message: "password must be at least 5 characters" })
    password: string;

}