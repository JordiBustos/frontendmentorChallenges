import { AxiosError } from "axios"
import Country from "./Country"

interface CountriesResponse {
  data: Country[] | null,
  loading: boolean,
  error: AxiosError | null
}

export default CountriesResponse;