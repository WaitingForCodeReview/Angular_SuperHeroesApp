export interface PowerStats {
  intelligence: string,
  strength: string,
  speed: string,
  durability: string,
  power: string,
  combat: string,
}

export interface HeroInfo {
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
  results?: Array<Object>
}
