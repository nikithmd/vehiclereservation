export interface GetClientPayload {
	driverLicense?: string
	expiryDate?: string
	phoneNumber?: string
	firstName?: string
	lastName?: string
	sortDL?: "ASC" | "DESC"
	sortExpiryDate?: "ASC" | "DESC"
	sortPhoneNumber?: "ASC" | "DESC"
	sortFirstName?: "ASC" | "DESC"
	sortLastName?: "ASC" | "DESC"
}

export interface ICreateOrUpdateClient {
	driverLicense: string
	expiryDate: string
	phoneNumber: string
	firstName: string
	lastName: string
}