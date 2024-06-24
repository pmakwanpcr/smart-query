const pageRoutes = {
	login: "/login",
	smart_query: "/smart-query",
	smart_query_result: "/smart-query-result",
};

export default pageRoutes;

export const filterRoute = (route) => {
	return route.substring(1);
};
