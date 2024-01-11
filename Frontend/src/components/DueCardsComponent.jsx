import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDueCards } from "../api/apiCalls";

function DueCardsComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dueCards"],
    queryFn: fetchDueCards,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DueCardsComponent;
