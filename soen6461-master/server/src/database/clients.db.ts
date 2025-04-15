import { MysqlRepository } from "./mysql.repository";
import { MySqlConfig } from "../config";
import { GetClientPayload, ICreateOrUpdateClient } from "../helper/interfaces/client.interface";
import { inject, injectable } from "inversify";
import { Types } from "../containers/types";
import * as Knex from "knex"

@injectable()
export class ClientsDb extends MysqlRepository {
	private readonly clientsTable: Knex.QueryBuilder<any, any[]>

	constructor(@inject(Types.MySQLConfig) connection: MySqlConfig) {
		super(connection)

		this.clientsTable = this.databaseKnex("clients")
	}

	create = (payload: ICreateOrUpdateClient) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.databaseKnex.insert({
			driver_license: payload.driverLicense,
			first_name: payload.firstName,
			last_name: payload.lastName,
			expiry_date: payload.expiryDate,
			phone_number: payload.phoneNumber
		}).into("clients").transacting(transaction).then(transaction.commit).catch(transaction.rollback))
		.then(() => ({ ok: true }))

	update = (payload: ICreateOrUpdateClient) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.clientsTable.transacting(transaction).update({
			first_name: payload.firstName,
			last_name: payload.lastName,
			expiry_date: payload.expiryDate,
			phone_number: payload.phoneNumber
		}).where("driver_license", "=", payload.driverLicense)
			.then(transaction.commit).catch(transaction.rollback)).then(() => ({ ok: true }))

	remove = (driverLicense: string) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.clientsTable.transacting(transaction).delete()
			.where("driver_license", "=", driverLicense).then(transaction.commit).catch(transaction.rollback))
		.then(() => Promise.resolve(true)).catch(() => Promise.reject(false))

	getClients = (payload: GetClientPayload) => {
		const query: Knex.QueryBuilder<any, any[]> = this.clientsTable

		if (payload.driverLicense)
			query.andWhere("driver_license", "like", "%" + payload.driverLicense + "%")

		if (payload.expiryDate)
			query.andWhere("expiry_date", "like", "%" + payload.expiryDate + "%")

		if (payload.phoneNumber)
			query.andWhere("phone_number", "like", "%" + payload.phoneNumber + "%")

		if (payload.firstName)
			query.andWhere("first_name", "like", "%" + payload.firstName + "%")

		if (payload.lastName)
			query.andWhere("last_name", "like", "%" + payload.lastName + "%")

		if (payload.sortDL)
			query.orderBy("driver_license", payload.sortDL.toLowerCase())

		if (payload.sortExpiryDate)
			query.orderBy("expiry_date", payload.sortExpiryDate.toLowerCase())

		if (payload.sortPhoneNumber)
			query.orderBy("phone_number", payload.sortPhoneNumber.toLowerCase())

		if (payload.sortFirstName)
			query.orderBy("first_name", payload.sortFirstName.toLowerCase())

		if (payload.sortLastName)
			query.orderBy("last_name", payload.sortLastName.toLowerCase())

		return query
	}
}