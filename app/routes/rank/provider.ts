import { useReducer, type Dispatch } from 'react'
import { useOutletContext } from '@remix-run/react'

type State = {
  count: number
  layout: 'LayOne' | 'LayTwo'
  isLoading: boolean
}

type Action =
  | { type: 'SET_COUNT'; count: State['count'] }
  | { type: 'SET_LAYOUT'; layout: State['layout'] }
  | { type: 'SET_LOADING'; isLoading: State['isLoading'] }

type ContextType = {
  state: State
  action: Dispatch<Action>
}

const InitState: State = {
  count: 99,
  layout: 'LayOne',
  isLoading: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_COUNT':
      return { ...state, count: action.count }
    case 'SET_LAYOUT':
      return { ...state, layout: action.layout }
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    default:
      return state
  }
}

export const useRankProvider = () => {
  const [state, action] = useReducer(reducer, InitState)

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
