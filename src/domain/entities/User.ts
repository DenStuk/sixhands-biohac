import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { PasswordManager } from "../services/PasswordManager";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("varchar", { length: 250 })
    public email: string;

    @Column("varchar", { length: 250 })
    public password: string;

    @Column({ length: 40, nullable: true })
    public resetCode: string | null;

    @BeforeInsert()
    async hashPassword() {
        this.password = await PasswordManager.toHash(this.password);
    }

}