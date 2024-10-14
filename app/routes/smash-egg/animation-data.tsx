import type { LottieAnimationData } from './types'

import hammer from './lottie/-hammer.json'

// Import all Lottie JSON files
import standbyg from './lottie/standbyg.json'
import standbys from './lottie/standbys.json'
import standbyc from './lottie/standbyc.json'

import gold01 from './lottie/gold01.json'
import gold02 from './lottie/gold02.json'
import gold03 from './lottie/gold03.json'
import gold04 from './lottie/gold04.json'
import gold05 from './lottie/gold05.json'
import goldn from './lottie/goldn.json'

import silver01 from './lottie/silver01.json'
import silver02 from './lottie/silver02.json'
import silver03 from './lottie/silver03.json'
import silver04 from './lottie/silver04.json'
import silver05 from './lottie/silver05.json'
import slivern from './lottie/slivern.json'

import copper01 from './lottie/copper01.json'
import copper02 from './lottie/copper02.json'
import copper03 from './lottie/copper03.json'
import copper04 from './lottie/copper04.json'
import copper05 from './lottie/copper05.json'
import coppern from './lottie/coppern.json'

import changegts from './lottie/changegts.json'
import changegtc from './lottie/changegtc.json'
import changectg from './lottie/changectg.json'
import changects from './lottie/changects.json'
import changestc from './lottie/changestc.json'
import changestg from './lottie/changestg.json'

export const hammerFile: LottieAnimationData = hammer

// Animation array for standby state
export const standbyArr: LottieAnimationData[] = [standbyg, standbyc, standbys]

// Animation array for golden egg
export const goldArr: LottieAnimationData[] = [gold01, gold02, gold03, gold04, goldn, gold05]

// Animation array for silver egg
export const silverArr: LottieAnimationData[] = [
  silver01,
  silver02,
  silver03,
  silver04,
  slivern,
  silver05,
]

// Animation array for copper egg
export const copperArr: LottieAnimationData[] = [
  copper01,
  copper02,
  copper03,
  copper04,
  coppern,
  copper05,
]

export const changeArr: LottieAnimationData[][] = [
  [changegts, changegtc],
  [changectg, changects],
  [changestc, changestg],
]
