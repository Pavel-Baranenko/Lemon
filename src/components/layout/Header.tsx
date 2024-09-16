import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import cn from "classnames";
import useApp from "src/context/AppContext";
import { ConnectButton } from "./ConnectButton";

interface NavLinkProps {
	href?: string; // href is optional
	label: string;
	modalType?: string;
}

function NavLink({ href, label, modalType }: NavLinkProps) {
	const router = useRouter();
	const isActive = modalType
		? router.query.modal === modalType
		: router.pathname === href;

	// Ensure href is never undefined when passed to the Link component
	const validHref = href || "#";

	return modalType ? (
		<button
			className={cn("nav-link", { active: isActive })}
			onClick={(e) => {
				e.preventDefault();
				router.push({ query: { modal: modalType } });
			}}
		>
			{label}
		</button>
	) : (
		<Link href={validHref} className={cn("nav-link", { active: isActive })}>
			{label}
		</Link>
	);
}


export default function Header() {
	const { address, chain } = useApp();

	return (
		<nav className="navbar navbar-expand-lg py-1 py-sm-3">
			<div className="container">
				<Link href="/" className="navbar-brand d-flex">
					<img src="/img/logo.png" alt="Lemon Jet" />
				</Link>

				<div className="order-lg-2 navbar-connectbutton">
					<ConnectButton />
				</div>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse justify-content-center"
					id="navbarNavDropdown"
				>
					<ul className="navbar-nav navbar-dark fs-5">
						<li className="nav-item px-1">
							<NavLink href="/" label="Game" />
						</li>
						<li className="nav-item px-1">
							<NavLink modalType="history" label="History" />
						</li>
						<li className="nav-item px-1">
							<NavLink modalType="claim" label="Claim" />
						</li>
						<li className="nav-item px-1">
							<NavLink modalType="referrals" label="Referral" />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
