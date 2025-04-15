export const Paths = {
	ADMIN: "/admin",
	CLERK: "/clerk",
	AUTH: "/auth"
}

export const TransactionsRoutes = {
	GET: "/transactions",
	FILTER: "/transactions/filter",
	CREATE: "/transaction",
	DELETE: "/transaction/:id",
	UPDATE: "/transaction/:id",
	GET_PER_VEHICLE: "/transaction/vehicle/:license_plate"
}

export const VehicleRoutes = {
	GET_VALUES: "/vehicle/values/:fieldName",
	POST: "/vehicle",
	PUT: "/vehicle/:id",
	DELETE: "/vehicle/:id",
	IS_AVAILABLE: "/vehicle/:license_plate/isavailable",
	GET: "/vehicles",
	FILTER: "/vehicles/filter",
	GET_VEHICLE: "/vehicles/:lp"
}

export const AuthRoutes = {
	ADD_USER: "/add",
	AUTHENTICATE: "/",
	DELETE: "/:username",
	LOGOUT: "/logout/:username"
}

export const ClientRoutes = {
	GET: "/clients",
	FILTER: "/clients/filter",
	UPDATE: "/clients/:driverLicense",
	CREATE: "/clients",
	DELETE: "/clients/:driverLicense",
	IS_AVAILABLE: "/client/:driverLicense/isavailable"
}