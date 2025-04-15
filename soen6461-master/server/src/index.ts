import * as express from "express"
import * as morgan from "morgan"
import * as cors from "cors"
import { Express, Request, Response } from "express"
import { json, urlencoded } from "body-parser";
import { authRouter } from "./routes/auth.routes";
import { clerkRouter } from "./routes/clerk.routes";
import { adminRouter } from "./routes/admin.routes";
import { Paths } from "./helper/routes.constants";
import { SERVER_PORT } from "./config";
import { NextFunction } from "express-serve-static-core";
import { bindDbConfig } from "./containers/bind.db";

const app: Express = express()

app.use(morgan("combined"))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.use((request: Request, response: Response, next: NextFunction) => {
	bindDbConfig()
	next()
})
app.use(Paths.AUTH, authRouter)
app.use(Paths.CLERK, clerkRouter)
app.use(Paths.ADMIN, adminRouter)

app.listen(SERVER_PORT)
console.log("Server started at http://localhost:" + SERVER_PORT)



