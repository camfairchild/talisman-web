import { activeMultisigsState } from '@domains/multisig'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { selector, selectorFamily } from 'recoil'

import { Rpc } from './tokens'

// Grab the pjs api from a selector. The selector caches the result based on the given rpc, so an
// api will will only be created once per rpc.
export const pjsApiSelector = selectorFamily({
  key: 'PjsApi',
  get: (rpcs?: Rpc[]) => async () => {
    const provider = new WsProvider(
      rpcs?.map(r => r.url),
      1000
    )
    const api = await ApiPromise.create({ provider })
    await api.isReady
    await api.isConnected
    return api
  },
  dangerouslyAllowMutability: true, // pjs wsprovider mutates itself to track connection msg stats
})

interface PjsApis {
  [rpc: string]: ApiPromise
}

// Get pjs apis for all active multisigs
export const allPjsApisSelector = selector({
  key: 'AllPjsApis',
  get: async ({ get }): Promise<PjsApis> => {
    const activeMultisigs = get(activeMultisigsState)
    const entries = await Promise.all(activeMultisigs.map(({ chain }) => [chain.id, get(pjsApiSelector(chain.rpcs))]))
    return Object.fromEntries(entries)
  },
  dangerouslyAllowMutability: true, // pjs wsprovider mutates itself to track connection msg stats
})
