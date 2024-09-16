import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import LemonJet from '../jet-contracts/artifacts/contracts/LemonJet.sol/LemonJet.json'
import LJT from '../jet-contracts/artifacts/contracts/mocks/LemonJetToken.sol/LemonJetToken.json'

import { Abi } from 'viem'

export default defineConfig({
  out: 'src/hooks/generated.ts',
  contracts: [
    {
      name: 'LemonJet',
      abi: LemonJet.abi as Abi,
    },
    {
      name: 'LJT',
      abi: LJT.abi as Abi,
    }
  ],
  plugins: [
    react({
      // usePrepareContractWrite: false,
      // usePrepareContractFunctionWrite: false
    })
  ],
})
