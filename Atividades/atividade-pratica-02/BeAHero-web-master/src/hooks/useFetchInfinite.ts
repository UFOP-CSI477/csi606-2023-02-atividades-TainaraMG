"use client";
import useSWRInfinite from "swr/infinite";

export function useFetchInfinite<Data =  any, Error = any>(url: string){
  
  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite<Data[], Error>(
    (index) => {
      return `http://localhost:8080/api/v1/${url}?page=${index}`;
    },
    async (url) => {
      const response = await fetch(url);
      const responseData = await response.json();

      return responseData;
    }
  );
  const flatennedData = data?.flat();

  const isEmpty = flatennedData?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1].length < 20) ; // Page Size
  const paginate = () => { setSize(size + 1)};

  return { data: data?.flat(), error, isEmpty, isReachingEnd, isLoading, paginate, mutate };
}
