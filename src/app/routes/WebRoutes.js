import { pageRoutes } from "@/configs";
import { lazy } from "react";

const Login = lazy(() => import("../pages/core/login"));
const SmartQuery = lazy(() => import("../pages/smartQuery"));
const SmartQueryResultTable = lazy(() => import("../pages/smartQuery/smartQueryResultTable"));

export const webRoutes = {
	private: [
		{
			path: pageRoutes.smart_query,
			element: SmartQuery,
		},
		{
			path: pageRoutes.smart_query_result,
			element: SmartQueryResultTable,
		},
	],
	public: [
		{
			path: pageRoutes.login,
			element: Login,
		},
	],
};
