export interface PowerStats {
  intelligence: string,
  strength: string,
  speed: string,
  durability: string,
  power: string,
  combat: string,
}

export interface HeroInfo {
  id: string,
  name: string,
  imageUrl: string,
  powerStats: PowerStats,
}

export interface FormData {
  email: string,
  userName: string,
  password: string,
  ownedHeroes: Array<HeroInfo>,
  lastSelectedHero: HeroInfo,
}

export interface ApiResponse {
  response: string,
  error?: string
  'results-for'?: string,
  results?: any
}

export interface BattleInfo {
  battleDateTime: any,
  heroName: string,
  heroId: string,
  enemyName: string,
  enemyId: string,
  battleResult: string,
}

export interface PowerUp {
  title: string,
  powerStatName: string,
  powerStatUpgradeValue: string,
  usesLeft: string,
  imgUrl: string,
}

export interface HeroBiography {
  "full-name": string,
  "alter-egos": string,
  "aliases": [
    string
  ],
  "place-of-birth": string,
  "first-appearance": string,
  "publisher": string,
  "alignment": string,
}

export interface HeroAppearance {
  "gender": string,
  "race": string,
  "height": [
    string,
    string,
  ],
  "weight": [
    string,
    string,
  ],
  "eye-color": string,
  "hair-color": string,
}

export interface HeroWork {
  "occupation": string,
  "base": string,
}

export interface HeroConnections {
  "group-affiliation": string,
  "relatives": string
}

export interface ApiObject {
  response: string,
  id: string,
  name: string,
  powerstats: PowerStats,
  biography: HeroBiography,
  appearance: HeroAppearance,
  work: HeroWork,
  connections: HeroConnections,
  image: {
    url: string
  }
}

export interface BattleResults {
  userScore: number,
  enemyScore: number,
}
