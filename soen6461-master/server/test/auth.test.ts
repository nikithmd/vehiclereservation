import { bindDbConfig } from "../src/containers/bind.db"
import { AuthDb } from "../src/database/auth.db"
import { container } from "../src/containers/container"
import { Types } from "../src/containers/types"
import { AuthInterface, ICreateUser } from "../src/helper/interfaces/auth.interface"
import { authenticate, logout } from "../src/routes/auth.routes"
import { Response } from "express"
import { expect } from "chai";


describe("Auth Functionality", () => {
	it("should authenticate user", () => {
		bindDbConfig()

		const authDb: AuthDb = container.get<AuthDb>(Types.AuthDb)
		const payload: AuthInterface = {
			username: "shareenali",
			password: "password"
		}
		const res: Response = <Response>{}
		res.status = () => <any>({ send: () => { } })

		return authDb.get()
			.then((users: ICreateUser[]) => authenticate(authDb, payload, users, res))
			.then((success: boolean) => {
				expect(success).equals(true, "should be able to login")
			})
	})

	it("should logout the user", () => {
		bindDbConfig()

		const authDb: AuthDb = container.get<AuthDb>(Types.AuthDb)
		const res: Response = <Response>{}
		res.status = () => <any>({ send: () => { } })

		return authDb.getByUsername("shareenali")
			.then((users: ICreateUser[]) => logout(users, authDb, res))
			.then((success: boolean) => {
				expect(success).equals(true, "should be able to logout")
			})
	})
})