import "reflect-metadata"
import { MysqlRepository } from "./mysql.repository";
import { MySqlConfig } from "../config";
import { ICreateUser } from "../helper/interfaces/auth.interface";
import { hashSync } from "bcrypt";
import { inject, injectable } from "inversify";
import { Types } from "../containers/types";
import * as Knex from "knex";

@injectable()
export class AuthDb extends MysqlRepository {
	private readonly authTable: Knex.QueryBuilder<any, any[]>

	constructor(@inject(Types.MySQLConfig) connection: MySqlConfig) {
		super(connection)

		this.authTable = this.databaseKnex("users")
	}

	get = () => this.authTable

	getByUsername = (username: string) => this.authTable.where("username", "=", username)

	update = (payload: ICreateUser) => this.databaseKnex.transaction((transaction: Knex.Transaction) => {
		return this.authTable.transacting(transaction).update(payload).where("username", "=", payload.username)
			.then(transaction.commit)
			.catch(transaction.rollback)
	})

	create = (payload: ICreateUser) => Promise.resolve(payload)
		.then((payload: ICreateUser) => {
			payload.password = hashSync(payload.password, 10)
			return payload
		}).then((payload: ICreateUser) => this.databaseKnex.transaction((transaction: Knex.Transaction) => {
			return this.databaseKnex.insert({
				username: payload.username,
				password: payload.password,
				type: Number(payload.type),
				first_name: payload.firstName,
				last_name: payload.lastName
			}).into("users").transacting(transaction)
				.then(transaction.commit)
				.catch(transaction.rollback)
		})).then(() => this.authTable.where("username", "=", payload.username)).then((users: ICreateUser[]) => {
			const user: ICreateUser = users.shift()
			delete user.password
			return user
		})

	remove = (username: string): Promise<boolean> =>
		this.databaseKnex.transaction((transaction: Knex.Transaction) =>
			this.databaseKnex.delete().from("users").where("username", "=", username)
				.transacting(transaction).then(transaction.commit).catch(transaction.rollback))
			.then(() => Promise.resolve(true)).catch(() => Promise.reject(false))
}