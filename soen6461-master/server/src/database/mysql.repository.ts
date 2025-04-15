import * as Knex from "knex";
import { MySqlConfig } from "../config";
import { injectable } from "inversify";

@injectable()
export class MysqlRepository {
	public databaseKnex: Knex

	constructor(connection: MySqlConfig) {
		this.databaseKnex = Knex({
			client: "mysql",
			connection,
			pool: {
				min: 1,
				max: 50
			},
			acquireConnectionTimeout: 10000
		})
	}

	destroy() {
		this.databaseKnex.destroy().catch((err: any) => { console.log(err) })
	}
}