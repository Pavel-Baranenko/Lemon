import { NextRequest, NextResponse } from "next/server";
import { saveRefLink, fetchRefLink, deleteRefLink } from "src/utils/kvUtils";
import { verifyMessage } from "ethers";
import {
	isValidEthereumAddress,
	isValidRefLink,
	isValidMessageFormat,
} from "src/utils/text";

export const runtime = "edge";

const allowedOrigin = process.env.ALLOWED_ORIGIN || "";

const setCORSHeaders = () => ({
	"Access-Control-Allow-Origin": allowedOrigin,
	"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type,Authorization",
	"Access-Control-Allow-Credentials": "true",
});

const createResponse = (
	body: Record<string, unknown> | null,
	status: number,
	headers = {}
) => {
	return NextResponse.json(body, {
		status,
		headers: { ...setCORSHeaders(), ...headers },
	});
};

const handleOptionsRequest = () => createResponse(null, 204);

const fetchReferralLinkFromKV = async (id: string): Promise<string | undefined> => {
	return await fetchRefLink(id) ?? undefined;
};

const validateMessageAndSignature = (
	id: string,
	refLink: string,
	message: string,
	signature: string
) => {
	const messageTemplate = `By signing this message, you authorize the referral ID "${refLink}" to be linked to your Ethereum address: ${id}. This action confirms your ownership of the address and your intention to set this referral link.`;
	if (!isValidMessageFormat(message, messageTemplate)) {
		throw new Error("Invalid message format");
	}

	const recoveredAddress = verifyMessage(message, signature);
	if (recoveredAddress.toLowerCase() !== id.toLowerCase()) {
		throw new Error("Logged in address does not match the provided ID");
	}
};

const handleGetRequest = async (id: string) => {
	if (!isValidEthereumAddress(id) && !isValidRefLink(id)) {
		return createResponse({ error: "Invalid ID. Must be a valid Ethereum address or a referral link." }, 400);
	}

	const existingRefLink = await fetchReferralLinkFromKV(id);
	if (!existingRefLink) {
		return createResponse({ error: "Referral link not found" }, 404);
	}

	return createResponse({ refLink: existingRefLink }, 200);
};

const handlePostOrPutRequest = async (req: NextRequest, id: string) => {
	if (!isValidEthereumAddress(id)) {
		return createResponse({ error: "Invalid Ethereum address." }, 400);
	}

	const { refLink, message, signature } = await req.json() as {
		refLink?: string;
		message?: string;
		signature?: string;
	};

	if (!refLink || !isValidRefLink(refLink)) {
		return createResponse({ error: "Invalid referral link" }, 400);
	}

	if (!message || !signature) {
		return createResponse({ error: "Message and signature are required" }, 400);
	}

	try {
		validateMessageAndSignature(id, refLink, message, signature);

		await saveRefLink(id, refLink);
		await saveRefLink(refLink, id);

		return createResponse({ refLink }, 200);
	} catch (error) {
		const errorMessage = (error as Error).message;
		return createResponse({ error: errorMessage }, 403);
	}
};

const handleDeleteRequest = async (id: string, refLink?: string) => {
	if (!isValidEthereumAddress(id)) {
		return createResponse({ error: "Invalid Ethereum address." }, 400);
	}

	if (!refLink || !isValidRefLink(refLink)) {
		return createResponse({ error: "Invalid referral link" }, 400);
	}

	await deleteRefLink(id);
	await deleteRefLink(refLink);

	return createResponse(null, 204);
};

export default async function handler(req: NextRequest) {
	console.log(`Received ${req.method} request at ${new Date().toISOString()}`);

	if (req.method === "OPTIONS") {
		return handleOptionsRequest();
	}

	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id") || "";

		switch (req.method) {
			case "GET":
				return await handleGetRequest(id);
			case "POST":
			case "PUT":
				return await handlePostOrPutRequest(req, id);
			case "DELETE": {
				const { refLink } = await req.json() as { refLink?: string };
				return await handleDeleteRequest(id, refLink);
			}
			default:
				return createResponse(null, 405); // Method Not Allowed
		}
	} catch (error) {
		console.error("Error processing request:", error);
		const errorMessage = (error as Error).message;
		return createResponse({ error: "Internal Server Error: " + errorMessage }, 500);
	}
}
