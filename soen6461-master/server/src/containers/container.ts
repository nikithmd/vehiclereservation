import "reflect-metadata"
import { Container } from "inversify";
import { AuthDb } from "../database/auth.db";
import { Types } from "./types";
import { ClientsDb } from "../database/clients.db";
import { TransactionsDb } from "../database/transactions.db";
import { VehiclesDb } from "../database/vehicles.db";
import { AdminActions } from "../actions/admin.actions"
import { ClerkActions } from "../actions/clerk.actions"

const container = new Container()

// bind database repositories
container.bind<AuthDb>(Types.AuthDb).to(AuthDb)
container.bind<ClientsDb>(Types.ClientsDb).to(ClientsDb)
container.bind<TransactionsDb>(Types.TransactionsDb).to(TransactionsDb)
container.bind<VehiclesDb>(Types.VehiclesDb).to(VehiclesDb)

// bind actions
container.bind<AdminActions>(Types.AdminActions).to(AdminActions)
container.bind<ClerkActions>(Types.ClerkActions).to(ClerkActions)

export { container }