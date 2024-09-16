"use client";

import SetLinkButton from "src/components/buttons/SetLinkButton";
import UnauthButton from "src/components/buttons/UnauthButton";
import useApp from "src/context/AppContext";
import { useState, useEffect, useCallback } from "react";
import { useReferralStore } from "../stores/referralStore";
import { ReferralData } from "src/utils/types";
interface ReferralResponse {
	refLink?: string;
}

export default function ModalReferrals({}: ReferralData) {
	const { address, contracts, chain } = useApp();
	const [amount, setAmount] = useState<string>("10");

	const { referralData, setRefLink, error: storeError } = useReferralStore();
	const [error, setError] = useState<string | null>(storeError);
	const [inputValue, setInputValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchRefId = useCallback(async () => {
		if (address && !referralData[address]?.refId) {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/ref?id=${address}`);
				if (response.ok) {
					const data: ReferralResponse = await response.json();
					if (data.refLink) {
						setRefLink(address, data.refLink);
					}
				} else {
					setError("Referral link not found");
				}
			} catch (error) {
				setError("Failed to fetch referral link");
				console.error("Error fetching referral link:", error);
			} finally {
				setIsLoading(false);
			}
		}
	}, [address, referralData, setRefLink]);

	useEffect(() => {
		fetchRefId();
	}, [fetchRefId]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(event.target.value);
	};

	const refId = address ? referralData[address]?.refId : null;
	const refLink = `${window.location.origin}/?ref=${refId || address}`;
	const shortenedAddress = address
		? `${address.slice(0, 5)}...${address.slice(-3)}`
		: "";
	const shortenedRefLink = `${window.location.origin}/?ref=${shortenedAddress}`;

	const handleShareClick = useCallback(() => {
		if (navigator.share && refLink) {
			navigator
				.share({
					title: "Referral program",
					text: "Join me on Lemon Jet using this referral link:",
					url: refLink,
				})
				.catch((error) => console.error("Error sharing:", error));
		}
	}, [refLink]);

	const renderReferralLinkSection = () => {
		if (isLoading) {
			return <p>Loading...</p>;
		}

		if (refId) {
			return (
				<>
					<h2 className="modal-title">Referral Program</h2>
					<p>Share your referral link</p>
					<div className="referral-link-wrapper">
						<div className="link-container">
							<div className="link-wrapper">
								<div className="link-display">{refId}</div>
								<button className="btn share-button" onClick={handleShareClick}>
									Share
								</button>
							</div>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<h2 className="modal-title">Customize Your Referral Link</h2>
					<p>Set your custom referral link or use the default one below:</p>

					<div className="referral-link-wrapper mt-3">
						<div className="link-container d-flex align-items-center">
							<button className="btn share-button me-2" onClick={handleShareClick}>
								Share
							</button>
							<div className="link-wrapper">
								<div className="link-display">{shortenedRefLink}</div>
							</div>
						</div>
					</div>
					<input
						className="form-control form-control-lg text-center mt-1"
						type="text"
						value={inputValue}
						onChange={handleInputChange}
					/>
					<SetLinkButton
						address={address!}
						refId={inputValue}
						setRefLink={setRefLink}
						setError={setError}
					/>

					{error && <div className="text-danger mt-2">{error}</div>}
				</>
			);
		}
	};

	const renderUnauthenticatedSection = () => {
		return (
			<div style={{ maxWidth: "400px" }}>
				<div className="row mb-3">
					<div className="col-6">
						<div style={{ fontSize: "11px" }}>YOU WIN:</div>
						<input
							className="form-control form-control-lg text-center mt-1"
							type="text"
							value={"-"}
							readOnly
						/>
					</div>
					<div className="col-6">
						<div style={{ fontSize: "11px" }}>BALANCE:</div>
						<input
							className="form-control form-control-lg text-center mt-1"
							type="text"
							value={"-"}
							readOnly
						/>
					</div>
				</div>
				<div style={{ fontSize: "11px" }}>SET AMOUNT:</div>
				<input
					className="form-control form-control-lg text-center mt-2"
					type="text"
					value={"-"}
					readOnly
				/>
				<UnauthButton className="btn btn-lg btn-dark rounded-3 w-100 mt-3" />
			</div>
		);
	};

	if (address && chain && contracts?.ljt) {
		return (
			<div className="modal-content text-center">
				{renderReferralLinkSection()}
			</div>
		);
	}

	return renderUnauthenticatedSection();
}
