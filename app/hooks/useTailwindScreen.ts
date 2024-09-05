import { useMedia } from 'react-use'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const {
  theme: { screens },
} = resolveConfig(tailwindConfig) as {
  theme: { screens: Record<string, string> }
}

const useTailwindScreen = (key: string, minmax: 'min' | 'max' = 'min') => {
  if (!screens[key]) {
    throw new Error(`Breakpoint ${key} is not defined in Tailwind config.`)
  }

  return useMedia(`(${minmax}-width: ${screens[key]})`) || false
}

export default useTailwindScreen
