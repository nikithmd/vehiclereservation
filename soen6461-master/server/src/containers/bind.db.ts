import { container } from "./container";
import { Types } from "./types";
import { mysqlConfig } from "../config";

export const bindDbConfig = () => {
	if (container.isBound(Types.MySQLConfig))
		return
	container.bind(Types.MySQLConfig).toDynamicValue(() => {
		return mysqlConfig
	})
}