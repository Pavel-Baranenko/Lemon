// hooks/useReferralStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReferralProgramStore, ReferralData } from "src/utils/types";

export const useReferralStore = create<ReferralProgramStore>()(
	persist(
		(set) => ({
			referralData: {},
			error: null,
			loading: true,
			setRefLink: (address: string, refLink: string) =>
				set((state) => ({
					referralData: {
						...state.referralData,
						[address]: {
							...state.referralData[address],
							refId: refLink,
						},
					},
				})),
			setError: (error: string | null) => set({ error }),
			setLoading: (loading: boolean) => set({ loading }),
		}),
		{
			name: "referral-storage",
			getStorage: () => localStorage,
		}
	)
);
