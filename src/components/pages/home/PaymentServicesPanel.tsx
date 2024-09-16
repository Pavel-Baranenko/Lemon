export default function PaymnetServicesPanel ()  {
    return <div
        className="d-flex gap-2 mb-2 mt-2 order-sm-first order-last">
        <div className="col">
            <button
                className="btn btn-sm btn-dark rounded-4 w-100 py-2">
                <img src="/img/uniswap-logo.png"
                     alt="Uniswap"/>
            </button>
        </div>
        <div className="col">
            <button
                className="btn btn-sm btn-dark rounded-4 w-100 py-2">
                <img
                    src="/img/pancakeswap-logo.png"
                    alt="PancakeSwap"/>
            </button>
        </div>
        <div className="col">
            <button
                className="btn btn-sm btn-dark rounded-4 w-100 py-2">
                <img src="/img/card-logo.png"
                     alt="Card"/>
            </button>
        </div>
    </div>
}
