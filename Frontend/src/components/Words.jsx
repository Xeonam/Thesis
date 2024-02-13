import React, { useState, useEffect } from "react";
import { fetchWords } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  word: yup.string().required("Word is required"),
});

function Words() {
  const { data, isLoading, error } = useCustomQuery(["words"], fetchWords);
  const [filteredWords, setFilteredWords] = useState([]);


  const {
    register,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const searchWord = watch("word");

  useEffect(() => {
    if (!data || data.length === 0 || !searchWord) {
      setFilteredWords(data);
    } else {
      const filtered = data.filter((wordItem) =>
        wordItem.word.english_word.toLowerCase().includes(searchWord.toLowerCase()) ||
        wordItem.word.hungarian_meaning.toLowerCase().includes(searchWord.toLowerCase())
      );

      setFilteredWords(filtered);
    }
  }, [searchWord, data]);


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

  if (data.length === 0) {
    return (
      <div className="p-5 flex justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-importantText mb-3">
            Your words will appear here
          </h2>
          <p className="text-gray-600">
            Once you add words, they'll show up in this space.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto ">
        <form
          className="space-y-2 md:space-y-6 p-6 bg-red-400 rounded"
        >
          <div>
            <label className="block mb-2 font-bold">Search for a word</label>
            <input
              type="text"
              name="word"
              id="word"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="word"
              required=""
              {...register("word")}
            />
          </div>

        </form>
      </div>

      <h1 className="text-2xl font-bold mb-5 text-importantText">Words</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-center">
        {filteredWords?.map((wordItem) => (
          <div
            key={wordItem.card_id}
            className="bg-[#A3D8F4] rounded-lg shadow overflow-hidden break-words"
          >
            <div className="p-5">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                English Word: {wordItem.word.english_word}
              </p>
              <p className="text-gray-600 pt-2 my-1">
                Hungarian Meaning: {wordItem.word.hungarian_meaning}
              </p>
              <p className="text-gray-600 pt-2">
                Deck: {wordItem.deck_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Words;
