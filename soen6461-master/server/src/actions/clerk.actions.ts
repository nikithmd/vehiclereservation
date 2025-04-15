import { ICreateTransaction, IUpdateTransaction } from "../helper/interfaces/transaction.interface";
import { TransactionsDb } from "../database/transactions.db";
import moment = require("moment");
import { GetClientPayload, ICreateOrUpdateClient } from "../helper/interfaces/client.interface";
import { ClientsDb } from "../database/clients.db";
import { GetVehiclePayload } from "../helper/interfaces/vehicle.interface";
import { VehiclesDb } from "../database/vehicles.db";
import { container } from "../containers/container";
import { Types } from "../containers/types";
import { inject, injectable } from "inversify"

@injectable()
export class ClerkActions {
	constructor(@inject(Types.TransactionsDb) private transactionDb: TransactionsDb,
				@inject(Types.ClientsDb) private clientDb: ClientsDb,
				@inject(Types.VehiclesDb) private vehiclesDb: VehiclesDb) { }

	createTransactions = (payload: ICreateTransaction): Promise<any> => {
		if (moment(payload.startDate).isAfter(moment(payload.dueDate)))
			return Promise.reject(new Error("Start date can not be after due date!"))

		payload.timestamp = moment(payload.timestamp).format("YYYY-MM-DD HH:mm:ss")
		payload.dueDate = moment(payload.dueDate).format("YYYY-MM-DD HH:mm:ss")
		payload.startDate = moment(payload.startDate).format("YYYY-MM-DD HH:mm:ss")
		payload.cancelled = payload.cancelled || false

		return this.clientDb.getClients({ driverLicense: payload.driverLicense })
			.then((clients: ICreateOrUpdateClient[]) => {
				const client: ICreateOrUpdateClient = clients.shift()

				if (client) {
					if (moment(client["expiry_date"]).isBefore(moment(payload.dueDate)))
						return Promise.reject(new Error("Client's license expires before the duedate"))

					return this.transactionDb.isVehicleAvailable(payload.licensePlate, payload.startDate)
						.then((data: any[]) => {
							if (data.length > 0)
								return Promise.reject(new Error("Vehicle is not available!"))

							return this.transactionDb.isVehicleAvailable(payload.licensePlate, payload.dueDate)
						}).then((data: any[]) => {
							if (data.length > 0)
								return Promise.reject(new Error("Vehicle is not available!"))

							return this.transactionDb.create(payload)
						})
				}

				return Promise.reject(new Error("Client not found!"))
			})
	}

	deleteTransactions = (id: string) => this.transactionDb.delete(Number(id))

	updateTransactions = (id: string, payload: IUpdateTransaction) => {
		const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")

		payload.id = Number(id)
		payload.dueDate = moment(payload.dueDate).format("YYYY-MM-DD HH:mm:ss")
		payload.startDate = moment(payload.startDate).format("YYYY-MM-DD HH:mm:ss")

		return this.transactionDb.update(payload, timestamp)
	}

	getTransactionsPerVehicle = (licensePlate: string) => this.transactionDb.getPerVehicle(licensePlate)

	getClients = (payload: GetClientPayload) => this.clientDb.getClients(payload)

	updateClient = (driverLicense: string, payload: ICreateOrUpdateClient) => {
		payload.driverLicense = driverLicense
		payload.expiryDate = moment(payload.expiryDate).format("YYYY-MM-DD HH:mm:ss")

		return this.clientDb.update(payload)
	}

	createClient = (payload: ICreateOrUpdateClient) => {
		payload.expiryDate = moment(payload.expiryDate).format("YYYY-MM-DD HH:mm:ss")

		return this.clientDb.create(payload)
	}

	deleteClient = (driverLicense: string) => this.clientDb.remove(driverLicense)

	isClientAvailable = (driverLicense: string, today: string) => {
		const currentDate = moment(today).format("YYYY-MM-DD HH:mm:ss")

		return this.transactionDb.isClientAvailable(driverLicense, currentDate)
	}

	isVehicleAvailable = (license_plate: string, today: string) => {
		const currentDate = moment(today).format("YYYY-MM-DD HH:mm:ss")

		return this.transactionDb.isVehicleAvailable(license_plate, currentDate)
	}

	getVehicles = (payload: GetVehiclePayload) => this.vehiclesDb.getVehicles(payload)

	getVehicle = (license_plate: string) => this.vehiclesDb.get(license_plate)
}