import { createConfig, webSocket } from "wagmi";
import { arbitrum, arbitrumSepolia, Chain } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { AuthProvider } from "@arcana/auth";
import { ArcanaConnector } from "@arcana/auth-wagmi";

export const projectIdArc =
	process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID_ARCANA || "";
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectIdArc) {
	console.error(
		"Arcana Project ID is missing. Please check your environment variables."
	);
}
if (!projectId) {
	console.error(
		"WalletConnect Project ID is missing. Please check your environment variables."
	);
}

export const provider: AuthProvider = new AuthProvider(projectIdArc, {
	alwaysVisible: true,
	setWindowProvider: true,
	debug: true,
	position: "left",
	theme: "dark",
});

export const connector = () => {
	// @ts-ignore
	return new ArcanaConnector({ auth: provider });
};

export const chains: [Chain, ...Chain[]] =
	process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
		? [arbitrumSepolia]
		: [arbitrum];

const metadata = {
	name: "Lemon Jet",
	description: "Lemon Jet Telegram Mini app",
	url: "https://jet.battlemon.io",
	icons: [""],
};

export const wagmiConfig = createConfig({
	chains,
	connectors: [injected(), connector(), walletConnect({ projectId, metadata })],
	ssr: true,
	transports: {
		[arbitrumSepolia.id]: webSocket(
			`wss://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
		),
	},
});

declare module "wagmi" {
	interface Register {
		config: typeof wagmiConfig;
	}
}
