export const Types = {
	// database connection
	MySQLConfig: Symbol("MySQLConfig"),
	// database repository
	AuthDb: Symbol("AuthDb"),
	ClientsDb: Symbol("ClientsDb"),
	TransactionsDb: Symbol("TransactionsDb"),
	VehiclesDb: Symbol("VehiclesDb"),
	// actions
	AdminActions: Symbol("AdminActions"),
	ClerkActions: Symbol("ClerkActions")
}