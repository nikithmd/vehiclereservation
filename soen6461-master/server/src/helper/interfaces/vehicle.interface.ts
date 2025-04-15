export interface ICreateOrUpdateVehiclePayload {
	licensePlate: string
	type: string
	make: string
	model: string
	year: number
	color: string
}

export interface GetVehiclePayload {
	license_plate?: string
	type?: string
	make?: string
	model?: string
	year?: number
	color?: string
	sortLp?: "ASC" | "DESC"
	sortType?: "ASC" | "DESC"
	sortMake?: "ASC" | "DESC"
	sortModel?: "ASC" | "DESC"
	sortYear?: "ASC" | "DESC"
	sortColor?: "ASC" | "DESC"
}