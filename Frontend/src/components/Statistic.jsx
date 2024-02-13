import React from "react";
import { useCustomQuery } from "../hooks/useApiData";
import { fetchStatistics } from "../api/apiCalls";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";



function Statistic() {
  const { data, isLoading, error } = useCustomQuery(["decks"], fetchStatistics);
  const navigate = useNavigate();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleBack = () => {
    navigate(-1);
  }

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
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell className="bg-gray-800 text-white">
            Number
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800 text-white">
            Deck name
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800 text-white">
            Practised time
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800 text-white">
            Practised date
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {data.map((item, index) => (
            <Table.Row key={item.card_id} className="bg-gray-700">
              <Table.Cell className="whitespace-nowrap font-medium text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="text-white">
                {item.deck_name}
              </Table.Cell>
              <Table.Cell className="text-white">
              {formatTime(item.practice_duration)}
              </Table.Cell>
              <Table.Cell className="text-white">
                {formatDate(item.practice_date)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Statistic;
