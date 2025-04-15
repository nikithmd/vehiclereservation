export interface AuthInterface {
	username: string
	password: string
}

export interface ICreateUser {
	username: string
	password?: string
	type: number
	firstName: string
	lastName: string
	token?: string
}