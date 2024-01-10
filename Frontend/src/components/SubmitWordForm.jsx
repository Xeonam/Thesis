import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addWord, addCard, fetchWord } from "../api/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  english_word: yup.string().required("English word is required"),
});

function SubmitWordForm() {
  const [word_id, setWord_id] = useState("");
  const [english_word, setEnglish_word] = useState("");
  const [hungarian_meaning, setHungarian_meaning] = useState("");
  const [addCardError, setAddCardError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitMutation = useMutation({
    mutationFn: addWord,
    onSuccess: () => {
        toast.success("The word has been successfully translated!");
    },
    onError: (error) => {

      if (error.response && error.response.data && error.response.data.message === "Word already exists.") {
        handleFetchWordClick(english_word);
      } else {
        console.log("An error occurred", error);
      }
    },
    onSettled: (responseData) => {
      if (responseData) {
        setWord_id(responseData.word_id);
        setEnglish_word(responseData.english_word);
        setHungarian_meaning(responseData.hungarian_meaning);
      }
    },
  });
  
  const onSubmit = (data) => {
    submitMutation.mutate(data);
  };

  // addCard
  const addCardMutation = useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      console.log("Success!");
    },
    onError: (error) => {
      setAddCardError(error.response.data.message);
    },
  });

  const handleAddCardClick = () => {
    if (word_id) {
      addCardMutation.mutate({ word_id: word_id });
    }
  };

  const fetchWordMutation = useMutation({
    mutationFn: fetchWord,
    onSuccess: (data) => {
      console.log("Word fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching word:", error);
    },
  });

  const handleFetchWordClick = (wordName) => {
    fetchWordMutation.mutate(wordName);
  }
    

  return (
    <div>
      <ToastContainer position="bottom-right" limit={3}/>
      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#A7C7E7] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                Submit an English Word
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="english_word"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    English Word
                  </label>
                  <input
                    type="text"
                    name="english_word"
                    id="english_word"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter an English word"
                    {...register("english_word")}
                  />
                  <p className="mt-1 text-sm text-red-600">
                    {errors.english_word?.message}
                  </p>
                </div>

                {word_id && (
                  <div
                    className="mt-4 p-4 rounded bg-white text-black"
                  >
                    <h1 className="font-bold">Translation</h1>
                    <hr className="h-px border-0 bg-black" />
                    <p className="mt-2">
                      <span className="font-semibold">{english_word}</span>:{" "}
                      <span className="italic">{hungarian_meaning}</span>
                    </p>
                    <div className="text-center pt-2">
                      <button className="text-white bg-navbarBgColor hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2 "
                       onClick={handleAddCardClick} >
                        Add word
                      </button>
                    </div>
                    { addCardError && (
                      <div className="mt-1 text-sm text-red-600">
                        {addCardError}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-navbarBgColor hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Translate Word
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubmitWordForm;
