import { Request, Response, Router } from "express";
import { TransactionsRoutes, VehicleRoutes } from "../helper/routes.constants";
import { subscribeToDataStream } from "../helper/query.helper";
import { fromPromise } from "most";
import { AdminActions } from "../actions/admin.actions";
import { container } from "../containers/container"
import { Types } from "../containers/types"

const router = Router()

router.get(TransactionsRoutes.GET, (req: Request, res: Response) => {
	const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

	fromPromise(adminActions.processGetTransaction(req.query))
		.subscribe(subscribeToDataStream(res, "GET_TRANSACTION_VALUES"))
})

router.post(TransactionsRoutes.FILTER, (req: Request, res: Response) => {
	const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)
	fromPromise(adminActions.processGetTransaction(req.body))
		.subscribe(subscribeToDataStream(res, "GET_TRANSACTION_VALUES"))
})

router.get(VehicleRoutes.GET_VALUES, (req: Request, res: Response) => {
	const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

	fromPromise(adminActions.getDistinctValuesFromVehicles(req.params.fieldName))
		.subscribe(subscribeToDataStream(res, "GET_VEHICLE_VALUES"))
})

router.post(VehicleRoutes.POST, (req: Request, res: Response) => {
	const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

	fromPromise(adminActions.createVehicle(req.body))
		.subscribe(subscribeToDataStream(res, "CREATE_VEHICLE"))
})

router.put(VehicleRoutes.PUT, (req: Request, res: Response) => {
	const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

	fromPromise(adminActions.editVehicle(req.params.id || req.body.id, req.body))
		.subscribe(subscribeToDataStream(res, "UPDATE_VEHICLE"))
})

router.delete(VehicleRoutes.DELETE, (req: Request, res: Response) => {
	const adminActions: AdminActions = container.get<AdminActions>(Types.AdminActions)

	fromPromise(adminActions.deleteVehicle(req.params.id))
		.subscribe(subscribeToDataStream(res,"REMOVE_VEHICLE"))
})

export const adminRouter = router