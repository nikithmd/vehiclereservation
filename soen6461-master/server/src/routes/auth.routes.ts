import { Request, Response, Router } from "express";
import { AuthRoutes } from "../helper/routes.constants";
import { AuthInterface, ICreateUser } from "../helper/interfaces/auth.interface";
import { compareSync } from "bcrypt";
import { subscribeToDataStream } from "../helper/query.helper";
import { AuthDb } from "../database/auth.db";
import { fromPromise } from "most";
import { container } from "../containers/container"
import { Types } from "../containers/types"
import * as jwt from "jsonwebtoken";
import { VerifyErrors } from "jsonwebtoken"

const router = Router()

const verifyToken = (token: string) => new Promise((resolve, reject) => {
	jwt.verify(token, "SDM", (error: VerifyErrors, decoded: any) => {
		if (error)
			reject(error)
		else
			resolve(decoded)
	})
})

export const authenticate = (authDb: AuthDb, payload: AuthInterface, users: ICreateUser[], res: Response): Promise<boolean> => {
	const value = users.filter((u: ICreateUser) => u.username === payload.username)
	if (value && (value.length > 0) && compareSync(payload.password, value[0].password)) {
		const user: ICreateUser = value.shift()
		delete user.password

		user.token = jwt.sign({ user }, "SDM", {
			expiresIn: "2h"
		})

		if (user.type === 0) {
			return Promise.resolve(users.filter((u: ICreateUser) => u.type === 0))
				.then((data: ICreateUser[]) => {
					const allUsers: ICreateUser[] = data.filter((u: ICreateUser) => (u.token !== null))
					const alreadyLoggedInUsers: ICreateUser[] = allUsers.filter((u: ICreateUser) => u.username !== payload.username)

					if (alreadyLoggedInUsers.length === 0) {
						return authDb.update(user).then(() => {
							res.status(200).send(user)
							return true
						})
					}

					return Promise.all(alreadyLoggedInUsers.map((alreadyUser: ICreateUser) => verifyToken(alreadyUser.token)))
						.then(() => {
							return Promise.resolve({}).then(() => {
								res.status(403).send("Another admin is already logged in!")
								return false
							})
						}).catch(() => {
							return authDb.update(user).then(() => {
								res.status(200).send(user)
								return true
							})
						})
				})
		}

		return authDb.update(user).then(() => {
			res.status(200).send(user)
			return true
		})
	}
	res.status(403).send(value ? value.length > 0 ? "Invalid Password" : "User not Found!" :
		"Invalid username/password")

	return Promise.resolve(true)
}

export const logout = (value: ICreateUser[], authDb: AuthDb, res: Response): Promise<boolean> => {
	const user: ICreateUser = value.shift()

	if (user) {
		user.token = null
		return authDb.update(user).then(() => {
			res.status(200).send(true)
			return true
		})
	}

	res.status(404).send("User not found!")

	return Promise.resolve(false)
}

router.get(AuthRoutes.LOGOUT, (req: Request, res: Response) => {
	const authDb: AuthDb = container.get<AuthDb>(Types.AuthDb)

	fromPromise(authDb.getByUsername(req.params.username))
		.subscribe({
			next(value: ICreateUser[]): Promise<boolean> {
				return logout(value, authDb, res)
			},
			error(err: Error): void {
			},
			complete(value?: any): void {
			}
		})
})

router.post(AuthRoutes.AUTHENTICATE, (req: Request, res: Response) => {
	const payload: AuthInterface = req.body
	const authDb: AuthDb = container.get<AuthDb>(Types.AuthDb)

	fromPromise(authDb.get())
		.subscribe({
			next: function (users: ICreateUser[]): Promise<boolean> {
				return authenticate(authDb, payload, users, res)
			},
			error(err: Error): void {
				console.log(err);
				res.status(403).send("You exceeded login limit!")
			},
			complete(): void {
				console.log("Request processed for AUTHENTICATE")
				authDb.destroy()
			}
		})
})

router.post(AuthRoutes.ADD_USER, (req: Request, res: Response) => {
	const payload: ICreateUser = req.body
	const authDb: AuthDb = container.get<AuthDb>(Types.AuthDb)

	fromPromise(authDb.create(payload).then(() => ({ ok: true })))
		.subscribe(subscribeToDataStream(res, "CREATE_USER"))
})

router.delete(AuthRoutes.DELETE, (req: Request, res: Response) => {
	const username: string = req.params.username
	const authDb: AuthDb = container.get<AuthDb>(Types.AuthDb)

	fromPromise(authDb.remove(username))
		.subscribe(subscribeToDataStream(res, "DELETE USER"))
})

export const authRouter = router