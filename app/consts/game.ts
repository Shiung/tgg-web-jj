/**
 * 參考
 * https://docs.google.com/spreadsheets/d/1uN3ZDsea39P_Oa0GFE6DN8gHOkcc-KcF_qRY8WL-tG4/edit?usp=sharing
 */
enum GameCode {
  Crash = '10110001',
  Mines = '10110002',
  CatRussia = '10220001',
  GoDown100Floors = '10220002',
}

enum VenueType {
  Crypto = 1,
  Casual = 2,
}

type GameCurrency = 'usd' | 'K9'

interface BaseGameInfo {
  currency: GameCurrency
  name: string
  gameType: VenueType
  fallbackImgSrc: string
}

const baseGameInfos: Record<GameCode, BaseGameInfo> = {
  [GameCode.Mines]: {
    currency: 'usd',
    name: 'Mines',
    gameType: VenueType.Crypto,
    fallbackImgSrc: '/images/home/carousel/mines.png',
  },
  [GameCode.Crash]: {
    currency: 'usd',
    name: 'Crash',
    gameType: VenueType.Crypto,
    fallbackImgSrc: '/images/home/carousel/crash.png',
  },
  [GameCode.CatRussia]: {
    currency: 'K9',
    name: 'Cat Russia',
    gameType: VenueType.Casual,
    fallbackImgSrc: '/images/home/carousel/cat-russia.png',
  },
  [GameCode.GoDown100Floors]: {
    currency: 'usd',
    name: 'Go Down 100 Floors',
    gameType: VenueType.Casual,
    fallbackImgSrc: '/images/home/carousel/go-down-100-floors.png',
  },
}

// Type Guard
function isValidGameCode(value: string): value is GameCode {
  return Object.values(GameCode).includes(value as GameCode)
}

const getGameRoute = (gameCode: string, type: VenueType) => {
  if (!isValidGameCode(gameCode)) return ''
  const gamePath = type === VenueType.Casual ? 'casual-game' : 'crypto-game'
  return `/${gamePath}/${gameCode}`
}

export { baseGameInfos, GameCode, VenueType, getGameRoute, isValidGameCode }
export type { GameCurrency, BaseGameInfo }
