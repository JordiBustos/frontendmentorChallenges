// useApiFetch.ts
import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Country from "../interfaces/Country";
import CountriesResponse from "../interfaces/CountriesResponse";
import { SetStateAction } from "react";

function useApiFetch<T>(url: string): CountriesResponse | null {
  const [data, setData] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      try {
        const response: AxiosResponse<T> = await axios.get(url, { signal });
        setData(response.data as SetStateAction<Country[] | null>);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          setError(err as AxiosError);
        }
      } finally {
        setLoading(false);
      }
    };

    const abortController = new AbortController();
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useApiFetch;
