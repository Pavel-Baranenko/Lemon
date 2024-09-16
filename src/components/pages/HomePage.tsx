import FlyingScene from "src/components/babylon/FlyingScene";
import Layout from "src/components/layout/Web3Layout";
import cn from "classnames";
import { useState, useEffect } from "react";
import useApp from "src/context/AppContext";
import BetsPlayButton from "src/components/buttons/BetsPlayButton";
import UnauthButton from "src/components/buttons/UnauthButton";
import NumberInput from "src/components/layout/NumberInput";
import { useIsMounted } from "src/hooks/useIsMounted";
import { GameContainer } from "src/components/pages/home/GameContainer";
import { useFlyingStore } from "../stores/flyingStore";

interface HomePageProps {
	offScene?: boolean;
}

export default function HomePage({ offScene }: HomePageProps) {
	const { address, contracts, chain, balance } = useApp();

	const truncateToTwoDecimals = (value: number) => {
		return Math.floor(value * 100) / 100;
	};

	const [bet, setBet] = useState<string>("0");
	const [multiplier, setMultiplier] = useState<string>("2");
	const isMounted = useIsMounted();

	const handleDouble = () => {
		let newBet = Number(bet) * 2;
		if (newBet > Number(balance.value)) {
			newBet = truncateToTwoDecimals(Number(balance.value)); // Округляем баланс до двух знаков после запятой
		}
		setBet(newBet.toString());
	};

	const handleHalve = () => {
		const newBet = (Number(bet) / 2).toString();
		setBet(newBet);
	};

	const calculateWinChance = (multiplier: number) => {
		return (Math.min(100, 100 / multiplier) * 0.99).toFixed(2);
	};

	const handleMaxBet = () => {
		setBet(truncateToTwoDecimals(Number(balance.value)).toFixed(2));
	};

	return (
		<Layout>
			<div className="container">
				<div className="row mb-4">
					<div className="col-md-7 order-md-2">
						<GameContainer 
							multiplier={Number(multiplier)} 
							bet={Number(bet)} />
					</div>
					<div className="col-md-5 order-md-1 d-flex align-items-center align-content-stretch">
						<div className="left-form my-1 d-flex flex-column">
							<div className="d-flex gap-2 mb-2 mt-2 order-sm-first order-last">
								<div className="col">
									<button className="btn btn-sm btn-dark rounded-4 w-100 py-2">
										<img src="/img/uniswap-logo.png" alt="Uniswap" />
									</button>
								</div>
								<div className="col">
									<button className="btn btn-sm btn-dark rounded-4 w-100 py-2">
										<img src="/img/pancakeswap-logo.png" alt="PancakeSwap" />
									</button>
								</div>
								<div className="col">
									<button className="btn btn-sm btn-dark rounded-4 w-100 py-2">
										<img src="/img/card-logo.png" alt="Card" />
									</button>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12 col-9">
									<label className="px-2 py-2">LJT amount:</label>
									<label className="float-end px-2 py-2">
										{" "}
										{(Number(bet) * 0.14).toFixed(2)} USDT
									</label>

									<NumberInput
										state={[bet, setBet]}
										className="form-control border-0 form-control-lg text-center"
										size={38}
										step={1}
										min={1}
										max={Number(balance.value)}
									/>
								</div>
								<div className="col-sm-12 col-3 ps-0 ps-sm-3">
									<div
										className="d-flex gap-2 flex-column flex-sm-row mt-4 mt-sm-0"
										style={{ paddingTop: "6px" }}
									>
										<div className="col">
											<button
												className="btn btn-secondary btn-sm w-100 rounded-4 py-0 py-sm-1"
												onClick={handleHalve}
												disabled={Number(bet) / 2 < 1}
											>
												/2
											</button>
										</div>
										<div className="col d-none d-sm-block">
											<button
												className="btn btn-secondary btn-sm w-100 rounded-4 py-0 py-sm-1"
												onClick={handleMaxBet}
											>
												MAX
											</button>
										</div>
										<div className="col">
											<button
												className="btn btn-secondary btn-sm w-100 rounded-4 py-0 py-sm-1"
												onClick={handleDouble}
												disabled={Number(bet)  >= Number(balance.value)}
											>
												x2
											</button>
										</div>
									</div>
								</div>
							</div>
							<hr className="my-1 my-sm-3" />

							<div className="row">
								<div className="col-sm-12 col-8">
									<label className="px-2 py-2">
										Chance: <strong>{calculateWinChance(Number(multiplier))}%</strong>
									</label>
									<label className="float-end px-2 py-2">
										<strong>{(Number(bet) * Number(multiplier)).toFixed(2)} LJT</strong>{" "}
									</label>

									<NumberInput
										state={[multiplier, setMultiplier]}
										className="form-control border-0 text-center"
										size={30}
										step={0.1}
										min={1.1}
										max={5000}
									/>
								</div>

								<div className="col-sm-12 col-4 ps-0 ps-sm-3 mt-3 mt-sm-0">
									{address && chain && contracts?.bets ? (
										<BetsPlayButton
											className="btn btn-lg btn-dark w-100 rounded-4 py-2 my-3"
											address={address}
											contract={contracts.bets}
											amount={bet}
											multiplier={Math.round(Number(multiplier) * 100)}
										>
											START
										</BetsPlayButton>
									) : (
										<UnauthButton
											className="btn btn-lg btn-dark w-100 rounded-4 py-2 my-3"
											address={address}
											chain={chain}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}