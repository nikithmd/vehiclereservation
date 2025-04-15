import { MysqlRepository } from "./mysql.repository";
import { MySqlConfig } from "../config";
import { GetVehiclePayload, ICreateOrUpdateVehiclePayload } from "../helper/interfaces/vehicle.interface";
import { inject, injectable } from "inversify";
import { Types } from "../containers/types";
import * as Knex from "knex";

@injectable()
export class VehiclesDb extends MysqlRepository {
	private readonly vehicleTable: Knex.QueryBuilder<any, any[]>

	constructor(@inject(Types.MySQLConfig) connection: MySqlConfig) {
		super(connection)

		this.vehicleTable = this.databaseKnex("vehicles")
	}

	create = (payload: ICreateOrUpdateVehiclePayload) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.vehicleTable.transacting(transaction).insert({
			license_plate: payload.licensePlate,
			type: payload.type,
			make: payload.make,
			model: payload.model,
			year: Number(payload.year),
			color: payload.color
		}).then(transaction.commit).catch(transaction.rollback))
		.then(() => ({ ok: true }))

	update = (payload: ICreateOrUpdateVehiclePayload, id: number) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.vehicleTable.transacting(transaction).update({
			license_plate: payload.licensePlate,
			type: payload.type,
			make: payload.make,
			model: payload.model,
			year: Number(payload.year),
			color: payload.color
		}).where("id", "=", id).then(transaction.commit).catch(transaction.rollback))
		.then(() => ({ ok: true }))

	remove = (id: number) => this.databaseKnex.transaction((transaction: Knex.Transaction) =>
		this.vehicleTable.transacting(transaction).delete().where("id", "=", id)
			.then(transaction.commit).catch(transaction.rollback)).then(() =>
		Promise.resolve(true)).catch(() => Promise.reject(false))

	get = (licensePlate: string) => this.vehicleTable
		.where("license_plate", "=", licensePlate)

	getVehicles = (payload: GetVehiclePayload) => {
		const query: Knex.QueryBuilder<any, any[]> = this.vehicleTable

		if (payload.license_plate)
			query.andWhere("license_plate", "like", "%" + payload.license_plate + "%")

		if (payload.type)
			query.andWhere("type", "like", "%" + payload.type + "%")

		if (payload.make)
			query.andWhere("make", "like", "%" + payload.make + "%")

		if (payload.model)
			query.andWhere("model", "like", "%" + payload.model + "%")

		if (payload.year)
			query.andWhere("year", "like", "%" + payload.year + "%")

		if (payload.color)
			query.andWhere("color", "like", "%" + payload.color + "%")

		if (payload.sortLp)
			query.orderBy("license_plate", payload.sortLp.toLowerCase())

		if (payload.sortType)
			query.orderBy("type", payload.sortType.toLowerCase())

		if (payload.sortMake)
			query.orderBy("make", payload.sortMake.toLowerCase())

		if (payload.sortModel)
			query.orderBy("model", payload.sortModel.toLowerCase())

		if (payload.sortYear)
			query.orderBy("year", payload.sortYear.toLowerCase())

		if (payload.sortColor)
			query.orderBy("color", payload.sortColor.toLowerCase())

		return query
	}
}