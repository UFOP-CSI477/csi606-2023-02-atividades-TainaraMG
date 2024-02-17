"use client";
import useSWR from "swr";

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<Data[], Error>(
    `http://localhost:8080/api/v1/${url}`,
    async (url: string) => {
      const response = await fetch(url);
      const responseData = await response.json();

      return responseData;
    }
  );
  const isEmpty = data?.length === 0;

  return { data, error, isLoading, isEmpty, mutate };
}
