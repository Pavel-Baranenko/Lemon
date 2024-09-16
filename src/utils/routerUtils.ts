// utils/routerUtils.ts

import { NextRouter } from "next/router";

export const removeQueryParam = (
	router: NextRouter,
	paramToRemove: string,
	otherQueries: Record<string, any>
) => {
	const { pathname } = router;
	const updatedQuery = { ...otherQueries };

	delete updatedQuery[paramToRemove];

	router.replace(
		{
			pathname,
			query: updatedQuery,
		},
		undefined,
		{ shallow: true }
	);
};