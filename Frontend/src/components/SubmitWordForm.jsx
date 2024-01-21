import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addWord, addCard, fetchDecks, addCardToDeck } from "../api/apiCalls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBackspace } from "react-icons/fa";
import FileUploadForm from "./FileUploadForm";

const schema = yup.object({
  english_word: yup.string().required("English word is required"),
});

function SubmitWordForm() {
  const [word_id, setWord_id] = useState("");
  const [english_word, setEnglish_word] = useState("");
  const [hungarian_meaning, setHungarian_meaning] = useState("");
  const [addCardError, setAddCardError] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* Get decks */
  const { data: decks } = useQuery({
    queryKey: ["decks"],
    queryFn: fetchDecks,
  });

  /* Translate word */
  const submitMutation = useMutation({
    mutationFn: addWord,
    onSuccess: () => {
      toast.success("The word has been successfully translated!");
    },
    onError: () => {
      toast.error("An error occurred while translating the word.");
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

  /* Add card to deck */
  const addCardToDeckMutation = useMutation({
    mutationFn: addCardToDeck,
    onSuccess: () => {
      toast.success("Card has been successfully added to the deck!");
      resetForm();
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
  });
  const addCardAndAddToDeck = () => {
    if (word_id) {
      addCardMutation.mutate(
        { word_id: word_id },
        {
          onSuccess: (response) => {
            addCardToDeckMutation.mutate({
              card_id: response.id,
              deck_id: selectedDeck,
            });
          },
        }
      );
    }
  };

  const addCardMutation = useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      /* toast.success("Card has been successfully added!"); */
      resetForm();
    },
    onError: (error) => {
      if (error.response.data.message) {
        setAddCardError(error.response.data.message);
        toast.error("This word is already connected to your profile.");
      }
    },
  });

  const handleAddCardToDeckClick = () => {
    addCardAndAddToDeck();
  };

  const resetForm = () => {
    reset({ english_word: "" });
    setWord_id("");
    setEnglish_word("");
    setHungarian_meaning("");
    setAddCardError("");
  };

  const watchedEnglishWord = watch("english_word");

  useEffect(() => {
    if (watchedEnglishWord === "") {
      setWord_id("");
      setHungarian_meaning("");
    }
  }, [watchedEnglishWord]);

  return (
    <div>
      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#A7C7E7] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                Submit an English Word
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="english_word"
                    id="english_word"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 pl-3 pr-10"
                    placeholder="Enter an English word"
                    {...register("english_word")}
                  />
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FaBackspace />
                  </button>
                </div>
                <p className="mt-1 text-sm text-red-600">
                  {errors.english_word?.message}
                </p>
                <button
                  type="submit"
                  className="w-full text-white bg-navbarBgColor hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Translate Word
                </button>
              </form>

              {word_id && (
                <div className="mt-4 p-4 rounded bg-white text-black">
                  <h1 className="font-bold">Translation</h1>
                  <hr className="h-px border-0 bg-black" />
                  <p className="mt-2">
                    <span className="font-semibold">{english_word}</span>:{" "}
                    <span className="italic">{hungarian_meaning}</span>
                  </p>

                  <div className="py-2">
                    <label htmlFor="deck-select" className="font-bold">Choose a deck:</label>
                    <hr className="h-px border-0 bg-black" />
                    <select
                      id="deck-select"
                      value={selectedDeck}
                      onChange={(e) => setSelectedDeck(e.target.value)}
                      className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navbarBgColor focus:border-navbarBgColor sm:text-sm"
                    >
                      <option value="">Select a deck</option>
                      {decks?.map((deck) => (
                        <option key={deck.id} value={deck.deck_id}>
                          {deck.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      className="text-white bg-navbarBgColor hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2 "
                      onClick={handleAddCardToDeckClick}
                    >
                      Add word to deck
                    </button>
                  </div>
                  {addCardError && (
                    <div className="mt-1 text-sm text-red-600">
                      {addCardError}
                    </div>
                  )}
                </div>
              )}
              {!word_id && <FileUploadForm />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubmitWordForm;
