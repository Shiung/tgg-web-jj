enum GameId {
  Mine = 1,
  Crash = 2,
  CatRussia = 3,
  GoDown100Floors = 4,
}

enum VenueType {
  Crypto = 1,
  Casual = 2,
}

type GameCurrency = 'usd' | 'K9'

const gameList: Record<
  GameId,
  {
    name: string
    currency: GameCurrency
    imgSrc: string
    imgAlt: string
    venueType: VenueType
  }
> = {
  [GameId.Mine]: {
    name: 'Mines',
    currency: 'usd',
    imgSrc: '/images/home/carousel/mines.png',
    imgAlt: 'mines',
    venueType: VenueType.Crypto,
  },
  [GameId.Crash]: {
    name: 'Crash',
    imgSrc: '/images/home/carousel/crash.png',
    imgAlt: 'crash',
    currency: 'usd',
    venueType: VenueType.Crypto,
  },
  [GameId.CatRussia]: {
    name: 'Cat Russia',
    currency: 'K9',
    imgSrc: '/images/home/carousel/cat-russia.png',
    imgAlt: 'cat-russia',
    venueType: VenueType.Casual,
  },
  [GameId.GoDown100Floors]: {
    name: 'Go Down 100 Floors',
    currency: 'usd',
    imgSrc: '/images/home/carousel/go-down-100-floors.png',
    imgAlt: 'go-down-100-floors',
    venueType: VenueType.Crypto,
  },
}

const getGameRoute = (id: GameId, type: VenueType) => {
  const gamePath = type === VenueType.Casual ? 'casual-game' : 'crypto-game'
  return `/${gamePath}/${id}`
}

export { gameList, getGameRoute, GameId, VenueType }
export type { GameCurrency }
