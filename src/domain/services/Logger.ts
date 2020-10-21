import fs from "fs";
import path from "path";
import chalk from "chalk";
import dayjs from "dayjs";

export class Logger {

    public static clear(): void {
        console.clear();
    }

    public static info(message: string): void {
        console.log("[" + chalk.blue("INFO") + `][` + chalk.gray.bold(dayjs().format("HH:mm:ss")) + `]  ${message}`);
    }

    public static error(message: string): void {
        console.log("[" + chalk.red("ERROR") + `][` + chalk.gray.bold(dayjs().format("HH:mm:ss")) + `]  ${message}`);
    }

    public static cron(message: string): void {
        console.log("[" + chalk.magenta("CRON") + `][` + chalk.gray.bold(dayjs().format("HH:mm:ss")) + `]  ${message}`);
    }

    public static application(message: string): void {
        console.log("[" + chalk.yellow("APP") + `][` + chalk.gray.bold(dayjs().format("HH:mm:ss")) + `]  ${message}`);
    }

    public static database(message: string): void {
        console.log("[" + chalk.green("DB") + `][` + chalk.gray.bold(dayjs().format("HH:mm:ss")) + `]  ${message}`);
    }

}