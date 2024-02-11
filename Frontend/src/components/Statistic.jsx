import React from "react";
import { useCustomQuery } from "../hooks/useApiData";
import { fetchStatistics } from "../api/apiCalls";


function Statistic() {
    const { data, isLoading, error } = useCustomQuery(
        ["decks"],
        fetchStatistics
      );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return <div>
        <h1>Statistics</h1>
        <div>
        </div>
  </div>;
}

export default Statistic;
