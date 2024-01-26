import React from "react";
import { fetchDeckWords } from "../api/apiCalls";
import { fetchPublicDeckWords } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";
import { Table } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DeckWordsPreviewComponent() {
  const deckId = window.location.pathname.split("/")[2];
  const location = useLocation();
  const fromPrivate = location.state?.fromPrivate;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const { data, isLoading, error, refetch } = useCustomQuery(
    ["deckWords", deckId],
    () => (fromPrivate ? fetchDeckWords(deckId) : fetchPublicDeckWords(deckId))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <button
        onClick={handleBack}
        className="p-2 bg-blue-500 rounded my-5 mx-2 hover:text-importantText"
      >
        Return
      </button>

      <Table>
        <Table.Head>
          <Table.HeadCell className="bg-gray-800 text-white">
            Card
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800 text-white">
            English Word
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800 text-white">
            Hungarian Meaning
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800 text-white">
            Custom Meaning
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {data.map((item, index) => (
            <Table.Row key={item.card_id} className="bg-gray-700">
              <Table.Cell className="whitespace-nowrap font-medium text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="text-white">
                {item.word.english_word}
              </Table.Cell>
              <Table.Cell className="text-white">
                {item.word.hungarian_meaning}
              </Table.Cell>
              <Table.Cell className="text-white">
                {item.word.custom_meaning ? "Yes" : "No"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DeckWordsPreviewComponent;
