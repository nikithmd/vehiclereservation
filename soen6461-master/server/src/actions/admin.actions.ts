import { GetTransactionPayload } from "../helper/interfaces/transaction.interface";
import { TransactionsDb } from "../database/transactions.db";
import { mysqlConfig } from "../config";
import { Connection, createConnection, MysqlError } from "mysql";
import { VehiclesDb } from "../database/vehicles.db";
import { ICreateOrUpdateVehiclePayload } from "../helper/interfaces/vehicle.interface";
import { container } from "../containers/container";
import { Types } from "../containers/types";
import { inject, injectable } from "inversify"

@injectable()
export class AdminActions {
	constructor(@inject(Types.TransactionsDb) private transactionDb: TransactionsDb,
				@inject(Types.VehiclesDb) private vehicleDb: VehiclesDb) { }

	processGetTransaction = (payload: GetTransactionPayload) => this.transactionDb.getTransactions(payload)

	getDistinctValuesFromVehicles = (fieldName: string) => new Promise(((resolve, reject) => {
		const query: string = "SELECT DISTINCT " + fieldName + " FROM vehicles"
		const database: Connection = createConnection(mysqlConfig)

		database.connect((err: MysqlError) => {
			if (err) {
				reject(err)
				return
			}

			database.query(query, (error: MysqlError, result: any) => {
				if (result) {
					result = result.map((item) => {
						if (item instanceof Object)
							return item[fieldName]
						return item
					})
				}
				if (err)
					reject(error)
				else
					resolve(result)
				database.destroy()
			})
		})
	}))

	createVehicle = (payload: ICreateOrUpdateVehiclePayload) => this.vehicleDb.create(payload)

	editVehicle = (id: string, payload: ICreateOrUpdateVehiclePayload) => this.vehicleDb.update(payload, Number(id))

	deleteVehicle = (id: string) => this.vehicleDb.remove(Number(id)).then(() => true).catch(() => false)
}