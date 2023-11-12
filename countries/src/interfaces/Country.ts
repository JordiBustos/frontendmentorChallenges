interface Country {
  name: {
    common: string
    official: string,
    nativeName: object
  },
  tld: [],
  cca2: string,
  ccn3: string,
  cca3: string,
  cioc: string,
  independent: boolean,
  status: string,
  unMember: boolean,
  currencies: object,
  idd: object,
  capital: [],
  altSpellings: object,
  region: string,
  subregion: string,
  languages: object,
  translations: object,
  latlng: [],
  landlocked: boolean,
  borders: [],
  area: number,
  denonym: string,
  flag: string,
  maps: object,
  population: number,
  gini: object,
  fifa: string,
  car: object,
  timezones: [],
  continents: [],
  flags: {
    svg: string,
    png: string
    alt: string,
  },
  coatOfArms: object,
  startOfWeek: string,
  capitalInfo: object,
  postalCode: object,
}

export default Country;