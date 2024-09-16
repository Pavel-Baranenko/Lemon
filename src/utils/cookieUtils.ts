// utils/cookieUtils.ts

import { isValidEthereumAddress } from "src/utils/text";

export const setReferralCookie = (
	setCookie: (name: string, value: string, options?: any) => void,
	id: string
) => {
	if (isValidEthereumAddress(id)) {
		setCookie("ref_id", id, { path: "/", maxAge: 30 * 24 * 60 * 60 });
	}
};

export const removeReferralCookie = (
	removeCookie: (name: string, options?: any) => void
) => {
	removeCookie("ref_id", { path: "/" });
};

export const isReferralCookieValid = (ref_id: string) => {
	return isValidEthereumAddress(ref_id);
};
