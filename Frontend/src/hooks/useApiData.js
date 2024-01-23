import { useQuery } from "@tanstack/react-query";

export function useCustomQuery(queryKey, queryFn)  {
    const query = useQuery({queryKey, queryFn});
    return query;
};




