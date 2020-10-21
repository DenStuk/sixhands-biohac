import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { PasswordManager } from "../services/PasswordManager";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await PasswordManager.toHash(this.password);
    }

}