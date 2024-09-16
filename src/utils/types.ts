// utils/types.ts

export interface ReferralProgramState {
	referralData: Record<string, ReferralData>;
	error: string | null;
	loading: boolean;
}

export interface ReferralProgramActions {
	setRefLink: (address:string, refLink: string) => void;
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
}

export interface ReferralProgramStore
	extends ReferralProgramState,
		ReferralProgramActions {}

export interface ReferralData {
    address?: string;
	refId?: string;
	inviterId?: string;
}
