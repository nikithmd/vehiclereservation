import { MysqlRepository } from "./mysql.repository";
import { MySqlConfig } from "../config";
import {
	GetTransactionPayload,
	ICreateTransaction,
	IUpdateTransaction
} from "../helper/interfaces/transaction.interface";
import * as moment from "moment";
import { inject, injectable } from "inversify";
import { Types } from "../containers/types";
import * as Knex from "knex";

@injectable()
export class TransactionsDb extends MysqlRepository {
	private readonly transactionTable: Knex.QueryBuilder<any, any[]>

	constructor(@inject(Types.MySQLConfig) connection: MySqlConfig) {
		super(connection)

		this.transactionTable = this.databaseKnex("transactions")
	}

	create = (payload: ICreateTransaction) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.transactionTable.transacting(transaction).insert({
			driver_license: payload.driverLicense,
			license_plate: payload.licensePlate,
			timestamp: payload.timestamp,
			duedate: payload.dueDate,
			type: payload.type,
			startdate: payload.startDate,
			cancelled: payload.cancelled,
			vehicle_id: payload.vehicleId
		}).then(transaction.commit).catch(transaction.rollback))
		.then(() => ({ ok: true }))

	update = (payload: IUpdateTransaction, timestamp: string) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.transactionTable.transacting(transaction).update({
			timestamp,
			duedate: payload.dueDate,
			type: payload.type,
			startdate: payload.startDate
		}).where("id", "=", payload.id).then(transaction.commit).catch(transaction.rollback))
		.then(() => ({ ok: true }))

	getPerVehicle = (licensePlate: string) => this.transactionTable
		.where("license_plate", "=", licensePlate)
		.andWhere("startdate", ">", moment().format("YYYY-MM-DD HH:mm:ss"))
		.orderBy("startdate")

	delete = (id: number) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.transactionTable.transacting(transaction).delete().where("id", "=", id)
			.then(transaction.commit).catch(transaction.rollback)).then(() =>
		Promise.resolve(true)).catch(() => Promise.reject(false))

	isClientAvailable = (driverLicense: string, today: string) => this.transactionTable
		.where("startdate", "<", today)
		.andWhere("duedate", ">", today)
		.andWhere("driver_license", "=", driverLicense)
		.andWhere("type", "<>", "Return")

	isVehicleAvailable = (licensePlate: string, today: string) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.transactionTable.transacting(transaction)
			.where("startdate", "<", today)
			.andWhere("duedate", ">", today)
			.andWhere("license_plate", "=", licensePlate)
			.andWhere("type", "<>", "Return")
			.then(transaction.commit).catch(transaction.rollback))

	getTransactions = (payload: GetTransactionPayload) => {
		let query: Knex.QueryBuilder<any, any[]> = this.transactionTable

		query = query.select(["transactions.*", "clients.first_name", "clients.last_name"])
			.leftJoin("clients", "transactions.driver_license", "clients.driver_license")

		if (payload.driverLicense)
			query.andWhere("transactions.driver_license", "like", "%" + payload.driverLicense + "%")

		if (payload.licensePlate)
			query.andWhere("transactions.license_plate", "like", "%" + payload.licensePlate + "%")

		if (payload.dueDate)
			query.andWhere("transactions.duedate", "like", "%" + payload.dueDate + "%")

		if (payload.startDate)
			query.andWhere("transactions.startdate", "like", "%" + payload.startDate + "%")

		if (payload.type)
			query.andWhere("transactions.type", "like", "%" + payload.type + "%")

		if (payload.sortDL)
			query.orderBy("transactions.driver_license", payload.sortDL.toLowerCase())

		if (payload.sortLp)
			query.orderBy("transactions.license_plate", payload.sortLp.toLowerCase())

		if (payload.sortDdate)
			query.orderBy("transactions.duedate", payload.sortDdate.toLowerCase())

		if (payload.sortSdate)
			query.orderBy("transactions.startdate", payload.sortSdate.toLowerCase())

		if (payload.sortType)
			query.orderBy("transactions.type", payload.sortType.toLowerCase())

		return query
	}
}