import jwt from "jsonwebtoken";
import { User } from "@root/domain/entities/User";
import { RequestError } from "@root/domain/errors/RequestError";
import { getRepository, Repository } from "typeorm";
import { UserLoginDTO } from "../../router/validation/auth/UserLoginDTO";
import { PasswordManager } from "@root/domain/services/PasswordManager";
import { BaseCommand } from "./BaseCommand";
import { UserRegisterDTO } from "../../router/validation/auth/UserRegisterDTO";

export class UserAuthCommand extends BaseCommand {

    private readonly _repo: Repository<User>;

    public constructor() {
        super();
        this._repo = getRepository(User);
    }

    public async register(userRegisterDto: UserRegisterDTO) {
        const user = await this._repo.findOne({ email: userRegisterDto.email });
        if (user) throw new RequestError(400, "provided email already taken");

        const created = await this._repo.create({ ...userRegisterDto });
        await this._repo.save(created);

        const authorizationToken = jwt.sign({ id: created.id }, process.env.TOKEN_SECRET!, { expiresIn: 6048000 });

        return this.serializeResult(201, { authorizationToken });
    }

    public async login(userLoginDto: UserLoginDTO) {
        const user = await this._repo.findOne({ email: userLoginDto.email });
        if (!user) throw new RequestError(400, "invalid login or password");

        if (!(await PasswordManager.compare(user.password, userLoginDto.password))) throw new RequestError(400, "invalid login or password");

        const authorizationToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!, { expiresIn: 6048000 });

        return this.serializeResult(200, { authorizationToken });
    }

}