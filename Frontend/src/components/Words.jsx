import React, { useState } from "react";
import { fetchWords } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCardByName } from "../api/apiCalls";

const schema = yup.object({
  word: yup.string().required("Word is required"),
});

function Words() {
  const { data, isLoading, error } = useCustomQuery(["words"], fetchWords);
  const [deckName, setDeckName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchedWord, setSearchedWord] = useState("");


  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const submitMutation = useMutation({
    mutationFn: getCardByName,
    onSuccess: (data) => {
      console.log(data);
      setDeckName(data);
      resetForm();
      setErrorMessage("");
    },
    onError: (error) => {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while searching for the word."
      );
    },
  });

  const onSubmit = (data) => {
    setSearchedWord(data.word);
    submitMutation.mutate(data);
  };

  const resetForm = () => {
    reset();
  };

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
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Search for a word
            </label>
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

          <button
            type="submit"
            className="w-full text-white bg-navbarBgColor   active:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Search
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage} ({searchedWord})</div>
        )}
        {deckName && (
          <div className="text-green-600 mt-4">
            The word {searchedWord} is found in the {deckName} deck.
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold mb-5 text-importantText">Words</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-center">
        {data?.map((wordItem) => (
          <div
            key={wordItem.card_id}
            className="bg-[#A3D8F4] rounded-lg shadow overflow-hidden break-words"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                English Word: {wordItem.word.english_word}
              </h3>
              <hr className="h-px  bg-black border-0"></hr>
              <p className="text-gray-600 pt-2">
                Hungarian Meaning: {wordItem.word.hungarian_meaning}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Words;
