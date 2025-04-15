export const mysqlConfig: MySqlConfig = {
	host: "localhost",
	user: "root",
	password: "databAse123",
	database: "carrentalsystem"
}

export interface MySqlConfig {
	host: string
	user: string
	password: string
	database: string
}

export const SERVER_PORT = 8000