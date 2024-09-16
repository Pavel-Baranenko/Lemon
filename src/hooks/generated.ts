import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LJT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ljtAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_lj', internalType: 'address', type: 'address' }],
    name: 'setLemonJet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferWager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LemonJet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lemonJetAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'playerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'wager',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'payout',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'x', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'threshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'multiplier',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OutcomeEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'wager',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'multiplier',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'blockNumber',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'PlayEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'wager',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RefundEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'referreeReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'playerCashback',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SentToReferree',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'payout',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferPayoutFailed',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IChainLinkVRF',
    outputs: [
      { name: '', internalType: 'contract IVRFCoordinatorV2', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cashback',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'games',
    outputs: [
      { name: 'requestId', internalType: 'uint256', type: 'uint256' },
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'wager', internalType: 'uint256', type: 'uint256' },
      { name: 'multiplier', internalType: 'uint256', type: 'uint256' },
      { name: 'blockNumber', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxWager',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'from', internalType: 'address', type: 'address' }],
    name: 'getReferree',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'houseEdge',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_ljt', internalType: 'address', type: 'address' },
      { name: '_ChainLinkVRF', internalType: 'address', type: 'address' },
      { name: '_keyHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_subId', internalType: 'uint64', type: 'uint64' },
      { name: '_tresuary', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keyHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ljt',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'wager', internalType: 'uint256', type: 'uint256' },
      { name: 'multiplier', internalType: 'uint256', type: 'uint256' },
      { name: 'referre', internalType: 'address', type: 'address' },
    ],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'uint256', type: 'uint256' },
      { name: 'randomWords', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'referreeReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'refundMoney',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'requestToPlayer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'subId',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tresuary',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__
 */
export const useReadLjt = /*#__PURE__*/ createUseReadContract({ abi: ljtAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadLjtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLjtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadLjtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"name"`
 */
export const useReadLjtName = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLjtOwner = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadLjtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLjtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ljtAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__
 */
export const useWriteLjt = /*#__PURE__*/ createUseWriteContract({ abi: ljtAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteLjtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: ljtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteLjtDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: ljtAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteLjtIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: ljtAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteLjtMint = /*#__PURE__*/ createUseWriteContract({
  abi: ljtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLjtRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ljtAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"setLemonJet"`
 */
export const useWriteLjtSetLemonJet = /*#__PURE__*/ createUseWriteContract({
  abi: ljtAbi,
  functionName: 'setLemonJet',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLjtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: ljtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteLjtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ljtAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLjtTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ljtAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transferWager"`
 */
export const useWriteLjtTransferWager = /*#__PURE__*/ createUseWriteContract({
  abi: ljtAbi,
  functionName: 'transferWager',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__
 */
export const useSimulateLjt = /*#__PURE__*/ createUseSimulateContract({
  abi: ljtAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateLjtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: ljtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateLjtDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateLjtIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateLjtMint = /*#__PURE__*/ createUseSimulateContract({
  abi: ljtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLjtRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"setLemonJet"`
 */
export const useSimulateLjtSetLemonJet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'setLemonJet',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLjtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: ljtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateLjtTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLjtTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ljtAbi}__ and `functionName` set to `"transferWager"`
 */
export const useSimulateLjtTransferWager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ljtAbi,
    functionName: 'transferWager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ljtAbi}__
 */
export const useWatchLjtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ljtAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ljtAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchLjtApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ljtAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ljtAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLjtOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ljtAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ljtAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLjtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ljtAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__
 */
export const useReadLemonJet = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"IChainLinkVRF"`
 */
export const useReadLemonJetIChainLinkVrf = /*#__PURE__*/ createUseReadContract(
  { abi: lemonJetAbi, functionName: 'IChainLinkVRF' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"cashback"`
 */
export const useReadLemonJetCashback = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'cashback',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"games"`
 */
export const useReadLemonJetGames = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'games',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"getMaxWager"`
 */
export const useReadLemonJetGetMaxWager = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'getMaxWager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"getReferree"`
 */
export const useReadLemonJetGetReferree = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'getReferree',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"houseEdge"`
 */
export const useReadLemonJetHouseEdge = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'houseEdge',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"keyHash"`
 */
export const useReadLemonJetKeyHash = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'keyHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"ljt"`
 */
export const useReadLemonJetLjt = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'ljt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLemonJetOwner = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"referreeReward"`
 */
export const useReadLemonJetReferreeReward =
  /*#__PURE__*/ createUseReadContract({
    abi: lemonJetAbi,
    functionName: 'referreeReward',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"requestToPlayer"`
 */
export const useReadLemonJetRequestToPlayer =
  /*#__PURE__*/ createUseReadContract({
    abi: lemonJetAbi,
    functionName: 'requestToPlayer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"subId"`
 */
export const useReadLemonJetSubId = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'subId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"tresuary"`
 */
export const useReadLemonJetTresuary = /*#__PURE__*/ createUseReadContract({
  abi: lemonJetAbi,
  functionName: 'tresuary',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__
 */
export const useWriteLemonJet = /*#__PURE__*/ createUseWriteContract({
  abi: lemonJetAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteLemonJetInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: lemonJetAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"play"`
 */
export const useWriteLemonJetPlay = /*#__PURE__*/ createUseWriteContract({
  abi: lemonJetAbi,
  functionName: 'play',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 */
export const useWriteLemonJetRawFulfillRandomWords =
  /*#__PURE__*/ createUseWriteContract({
    abi: lemonJetAbi,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"refundMoney"`
 */
export const useWriteLemonJetRefundMoney = /*#__PURE__*/ createUseWriteContract(
  { abi: lemonJetAbi, functionName: 'refundMoney' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLemonJetRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lemonJetAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLemonJetTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lemonJetAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLemonJetWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lemonJetAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__
 */
export const useSimulateLemonJet = /*#__PURE__*/ createUseSimulateContract({
  abi: lemonJetAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateLemonJetInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lemonJetAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"play"`
 */
export const useSimulateLemonJetPlay = /*#__PURE__*/ createUseSimulateContract({
  abi: lemonJetAbi,
  functionName: 'play',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 */
export const useSimulateLemonJetRawFulfillRandomWords =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lemonJetAbi,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"refundMoney"`
 */
export const useSimulateLemonJetRefundMoney =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lemonJetAbi,
    functionName: 'refundMoney',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLemonJetRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lemonJetAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLemonJetTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lemonJetAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lemonJetAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLemonJetWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lemonJetAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__
 */
export const useWatchLemonJetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lemonJetAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchLemonJetInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"OutcomeEvent"`
 */
export const useWatchLemonJetOutcomeEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'OutcomeEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLemonJetOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"PlayEvent"`
 */
export const useWatchLemonJetPlayEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'PlayEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"RefundEvent"`
 */
export const useWatchLemonJetRefundEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'RefundEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"SentToReferree"`
 */
export const useWatchLemonJetSentToReferreeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'SentToReferree',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lemonJetAbi}__ and `eventName` set to `"TransferPayoutFailed"`
 */
export const useWatchLemonJetTransferPayoutFailedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lemonJetAbi,
    eventName: 'TransferPayoutFailed',
  })
