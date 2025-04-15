import { Request, Response, Router } from "express";
import { ClientRoutes, TransactionsRoutes, VehicleRoutes } from "../helper/routes.constants";
import { subscribeToDataStream } from "../helper/query.helper";
import { fromPromise, of } from "most";
import { ClerkActions } from "../actions/clerk.actions"
import { container } from "../containers/container"
import { Types } from "../containers/types"

const router: Router = Router()

router.post(TransactionsRoutes.CREATE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	clerkActions.createTransactions(req.body).then((data: any[]) => res.status(200).send(data))
		.catch((err: Error) => res.status(404).send(err.message))
})

router.delete(TransactionsRoutes.DELETE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.deleteTransactions(req.params.id))
		.subscribe(subscribeToDataStream(res, "DELETE_TRANSACTION"))
})

router.put(TransactionsRoutes.UPDATE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.updateTransactions(req.params.id, req.body))
		.subscribe(subscribeToDataStream(res, "UPDATE_TRANSACTION"))
})

router.get(TransactionsRoutes.GET_PER_VEHICLE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.getTransactionsPerVehicle(req.params.license_plate))
		.subscribe(subscribeToDataStream(res, "GET_PER_VEHICLE_TRANSACTION"))
})

router.get(ClientRoutes.GET, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.getClients(req.query))
		.subscribe(subscribeToDataStream(res, "GET_CLIENTS"))
})

router.post(ClientRoutes.FILTER, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.getClients(req.body))
		.subscribe(subscribeToDataStream(res, "POST_FILTER_CLIENTS"))
})

router.put(ClientRoutes.UPDATE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.updateClient(req.params.driverLicense, req.body))
		.subscribe(subscribeToDataStream(res, "UPDATE_CLIENTS"))
})

router.post(ClientRoutes.CREATE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.createClient(req.body))
		.subscribe(subscribeToDataStream(res, "CREATE_CLIENTS"))
})

router.delete(ClientRoutes.DELETE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.deleteClient(req.params.driverLicense))
		.subscribe(subscribeToDataStream(res, "DELETE_CLIENTS"))
})

router.get(ClientRoutes.IS_AVAILABLE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.isClientAvailable(req.params.driverLicense, req.query.today))
		.flatMap((result: any[]) => of(result && result.length === 0))
		.subscribe(subscribeToDataStream(res, "IS_CLIENT_AVAILABLE"))
})

router.get(VehicleRoutes.IS_AVAILABLE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.isVehicleAvailable(req.params.license_plate, req.query.today))
		.subscribe(subscribeToDataStream(res, "IS_VEHICLE_AVAILABLE"))
})

router.get(VehicleRoutes.GET, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.getVehicles(req.query))
		.subscribe(subscribeToDataStream(res, "GET_VEHICLES"))
})

router.post(VehicleRoutes.FILTER, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.getVehicles(req.body))
		.subscribe(subscribeToDataStream(res, "POST_FILTER_VEHICLES"))
})

router.get(VehicleRoutes.GET_VEHICLE, (req: Request, res: Response) => {
	const clerkActions: ClerkActions = container.get<ClerkActions>(Types.ClerkActions)

	fromPromise(clerkActions.getVehicle(req.params.lp))
		.subscribe(subscribeToDataStream(res, "GET_VEHICLE"))
})

export const clerkRouter = router