import { Response } from "express";
import { Subscriber } from "most";
import { MysqlRepository } from "../database/mysql.repository";

export const subscribeToDataStream = (res: Response, transactionName: string): Subscriber<any> => ({
	next(value: any[]): void { res.status(200).send(value) },
	error(err: Error): void {
		console.log(err);
		res.status(500).send(err)
	},
	complete(): void {
		console.log("Request processed for", transactionName)
	}
})