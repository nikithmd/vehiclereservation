import { bindDbConfig } from "../src/containers/bind.db"
import { ICreateTransaction, IUpdateTransaction } from "../src/helper/interfaces/transaction.interface"
import { ClerkActions } from "../src/actions/clerk.actions"
import { container } from "../src/containers/container"
import { Types } from "../src/containers/types"
import { expect } from "chai";
import { AdminActions } from "../src/actions/admin.actions"

describe("Transaction Functionality", () => {
	let id: any = 2
	const licensePlate: string = "UTE 001"

	it("should be able to post a transaction", () => {
		bindDbConfig()

		const payload: ICreateTransaction = {
			driverLicense: "UTE 001",
			licensePlate,
			dueDate: "2019-09-25",
			startDate: "2019-09-23",
			cancelled: false,
			type: "Rent"
		}

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)
		const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

		return clerkActions.createTransactions(payload)
			.then((res: { ok: boolean }) => {
				expect(res.ok).equals(true, "should be able to post a transaction")
				return res
			})
			.then(() => adminActions.processGetTransaction({ licensePlate: payload.licensePlate }))
			.then((data: ICreateTransaction[]) => {
				const transaction: ICreateTransaction = data.shift()
				id = transaction["id"]
				expect(transaction["driver_license"]).equals(payload.driverLicense)
				expect(transaction.type).equals(payload.type)
			})
	})

	it("should be able to put a transaction", () => {
		bindDbConfig()

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)
		const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)
		const payload: IUpdateTransaction = {
			id,
			dueDate: "2019-09-25",
			startDate: "2019-09-23",
			type: "Return"
		}

		return clerkActions.updateTransactions(String(id), payload)
			.then((res: { ok: boolean }) => {
				expect(res.ok).equals(true, "should be able to post a transaction")
				return res
			})
			.then(() => adminActions.processGetTransaction({ licensePlate }))
			.then((data: ICreateTransaction[]) => {
				const transaction: ICreateTransaction = data.shift()
				id = transaction["id"]
				expect(transaction.type).equals(payload.type)
			})
	})

	it("should delete transaction", () => {
		bindDbConfig()

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return clerkActions.deleteTransactions(id).then((status: boolean) => {
			expect(status).equals(true)
		})
	})

	it("should get transactions", () => {
		bindDbConfig()

		const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

		return adminActions.processGetTransaction({ type: "Rent" })
			.then((transactions: ICreateTransaction[]) => {
				const rent: ICreateTransaction[] = transactions.filter(transaction => transaction.type == "Rent")

				expect(transactions.length).equals(rent.length)
			})
	})
})