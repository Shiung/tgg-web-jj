import { useEffect, useReducer, type Dispatch } from 'react'
import { useOutletContext } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'
import type { RankConfigResponse } from '~/api/codegen/data-contracts'
import useStore from '~/stores/useStore'

type State = {
  isLoading: boolean
  rankConfigList: RankConfigResponse
  pageExist: { crypto: boolean; share: boolean } | undefined
}

type Action =
  | { type: 'SET_LOADING'; isLoading: State['isLoading'] }
  | { type: 'SET_RANKCONFIG'; rankConfigList: State['rankConfigList'] }

type ContextType = {
  state: State
  action: Dispatch<Action>
}

const InitState: State = {
  isLoading: false,
  rankConfigList: {
    bcRankDailyEntrance: false,
    bcRankDailyReward: false,
    bcRankMonthlyEntrance: false,
    bcRankMonthlyReward: false,
    bcRankWeeklyEntrance: false,
    bcRankWeeklyReward: false,
    shareRankEntrance: false,
    shareRankReward: false,
  },
  pageExist: undefined,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'SET_RANKCONFIG': {
      const {
        shareRankEntrance,
        bcRankDailyEntrance,
        bcRankMonthlyEntrance,
        bcRankWeeklyEntrance,
      } = action.rankConfigList ?? {}
      const pageExist = {
        crypto: !!bcRankDailyEntrance || !!bcRankMonthlyEntrance || !!bcRankWeeklyEntrance,
        share: shareRankEntrance ?? false,
      }

      return { ...state, rankConfigList: action.rankConfigList, pageExist: { ...pageExist } }
    }
    default:
      return state
  }
}

export const useRankProvider = () => {
  const [state, action] = useReducer(reducer, InitState)
  const isLoggedIn = useStore(state => state.isLoggedIn)

  const { data, isLoading } = useQuery({
    queryKey: ['rankConfigList', isLoggedIn],
    queryFn: () => (isLoggedIn ? apis.rank.rankConfigList() : apis.public.publicRankConfigList()),
  })

  useEffect(() => {
    if (!data?.data) return
    action({ type: 'SET_RANKCONFIG', rankConfigList: data?.data })
  }, [data, isLoading])

  const contextVal: ContextType = {
    state,
    action,
  }
  return {
    contextVal,
  }
}

export const useRankContext = () => {
  return useOutletContext<ContextType>()
}
