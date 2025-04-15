import { bindDbConfig } from "../src/containers/bind.db"
import { ICreateOrUpdateClient } from "../src/helper/interfaces/client.interface"
import { ClerkActions } from "../src/actions/clerk.actions"
import { container } from "../src/containers/container"
import { Types } from "../src/containers/types"
import { expect } from "chai"

describe("Clients Functionality", () => {
	let driverLicense: string = "UTE 001"

	it("should add a client", () => {
		bindDbConfig()

		const payload: ICreateOrUpdateClient = {
			driverLicense,
			expiryDate: "2022-03-21",
			phoneNumber: "5252552",
			firstName: "Unit",
			lastName: "Test"
		}

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return clerkActions.createClient(payload)
			.then((res: { ok: boolean }) => {
				expect(res.ok).equals(true)
			})
			.then(() => clerkActions.getClients({ driverLicense: "UTE 001" }))
			.then((clients: ICreateOrUpdateClient[]) => {
				expect(clients.length).equals(1)
			})
	})

	it("should update a client", () => {
		bindDbConfig()

		const payload: ICreateOrUpdateClient = {
			driverLicense,
			expiryDate: "2022-03-21",
			phoneNumber: "5252552",
			firstName: "Unit",
			lastName: "Test 2"
		}

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return clerkActions.updateClient(driverLicense, payload)
			.then((res: { ok: boolean }) => {
				expect(res.ok).equals(true)
			})
	})

	it("should delete a client", () => {
		bindDbConfig()

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return clerkActions.deleteClient(driverLicense)
			.then((success: boolean) => {
				expect(success).equals(true)
			})
	})

	it("should get clients", () => {
		bindDbConfig()

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return clerkActions.getClients({ firstName: "Unit" })
			.then((clients: ICreateOrUpdateClient[]) => {
				const firstNames: ICreateOrUpdateClient[] = clients.filter(client => client.firstName == "Unit")

				expect(clients.length).equals(firstNames.length)
			})
	})
});