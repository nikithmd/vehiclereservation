import { bindDbConfig } from "../src/containers/bind.db"
import { AdminActions } from "../src/actions/admin.actions"
import { container } from "../src/containers/container"
import { Types } from "../src/containers/types"
import { expect } from "chai";
import { ClerkActions } from "../src/actions/clerk.actions"
import { ICreateOrUpdateVehiclePayload } from "../src/helper/interfaces/vehicle.interface"


describe("Vehicle Functionality", () => {
	let id: any = 2

	it("should add a vehicle", () => {
		bindDbConfig()

		const inputVehicle: ICreateOrUpdateVehiclePayload = {
			licensePlate: "UTE 001",
			type: "SUV",
			make: "Nissan",
			model: "Rouge",
			year: 2018,
			color: "Yellow"
		}

		const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)
		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return adminActions.createVehicle(inputVehicle).then((res: { ok: boolean }) => {
			expect(res.ok).equals(true, "It should add a vehicle")
		}).then(() => clerkActions.getVehicle(inputVehicle.licensePlate).then((vehicles: ICreateOrUpdateVehiclePayload[]) => {
			const vehicle: ICreateOrUpdateVehiclePayload = vehicles.shift()
			id = vehicle["id"]
			expect(vehicle.type).equals(inputVehicle.type, "it should have the same vehicle type")
			expect(vehicle.make).equals(inputVehicle.make, "it should have the same vehicle make")
			expect(vehicle.model).equals(inputVehicle.model, "it should have the same vehicle model")
			expect(vehicle.year).equals(inputVehicle.year, "it should have the same vehicle year")
			expect(vehicle.color).equals(inputVehicle.color, "it should have the same vehicle color")
		}))
	})

	it("should update a vehicle", () => {
		bindDbConfig()

		const inputVehicle: ICreateOrUpdateVehiclePayload = {
			licensePlate: "UTE 001",
			type: "SUV",
			make: "Audi",
			model: "Q7",
			year: 2018,
			color: "Red"
		}

		const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)
		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return adminActions.editVehicle(id, inputVehicle).then((res: { ok: boolean }) => {
			expect(res.ok).equals(true, "It should update a vehicle")
		}).then(() => clerkActions.getVehicle(inputVehicle.licensePlate).then((vehicles: ICreateOrUpdateVehiclePayload[]) => {
			const vehicle: ICreateOrUpdateVehiclePayload = vehicles.shift()
			id = vehicle["id"]
			expect(vehicle.type).equals(inputVehicle.type, "it should have the same vehicle type")
			expect(vehicle.make).equals(inputVehicle.make, "it should have the same vehicle make")
			expect(vehicle.model).equals(inputVehicle.model, "it should have the same vehicle model")
			expect(vehicle.year).equals(inputVehicle.year, "it should have the same vehicle year")
			expect(vehicle.color).equals(inputVehicle.color, "it should have the same vehicle color")
		}))
	})

	it("should delete the vehicle", () => {
		bindDbConfig()

		const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

		return adminActions.deleteVehicle(id).then((success: true) => {
			expect(success).equals(true)
		})
	})

	it("should get the filtered vehicles", () => {
		bindDbConfig()

		const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

		return clerkActions.getVehicles({ type: "SUV" })
			.then((vehicles: ICreateOrUpdateVehiclePayload[]) => {
				const SUVs: ICreateOrUpdateVehiclePayload[] = vehicles.filter((vehicle) => vehicle.type == "SUV")

				expect(vehicles.length).equals(SUVs.length)
			})
	})
})