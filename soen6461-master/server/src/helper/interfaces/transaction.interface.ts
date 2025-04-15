export interface GetTransactionPayload {
	driverLicense?: string
	licensePlate?: string
	dueDate?: string
	startDate?: string
	type?: string
	sortDL?: "ASC" | "DESC"
	sortLp?: "ASC" | "DESC"
	sortDdate?: "ASC" | "DESC"
	sortSdate?: "ASC" | "DESC"
	sortType?: "ASC" | "DESC"
}

export interface ICreateTransaction {
	driverLicense: string
	licensePlate: string
	timestamp?: string
	dueDate: string
	type: string
	startDate: string
	cancelled?: boolean
	vehicleId?: number
}

export interface IUpdateTransaction {
	id: number
	dueDate: string
	type: string
	startDate: string
}