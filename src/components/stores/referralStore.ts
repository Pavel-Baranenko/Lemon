// store/referralStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReferralProgramStore, ReferralData } from "src/utils/types";
import { isValidEthereumAddress } from "src/utils/text"; // Assuming this utility function exists

export const useReferralStore = create<ReferralProgramStore>()(
    persist(
        (set, get) => ({
            referralData: {},
            error: null,
            loading: true,
            setRefLink: (address: string, refLink: string) => {
                // Validate the address before setting the referral link
                if (!isValidEthereumAddress(address)) {
                    set({ error: "Invalid Ethereum address" });
                    return;
                }

                // Proceed with setting the referral link
                set((state) => ({
                    referralData: {
                        ...state.referralData,
                        [address]: {
                            ...state.referralData[address],
                            refId: refLink,
                        },
                    },
                    error: null, // Clear any previous errors
                }));
            },
            setError: (error: string | null) => set({ error }),
            setLoading: (loading: boolean) => set({ loading }),
        }),
        {
            name: "referral-storage",
        }
    )
);
