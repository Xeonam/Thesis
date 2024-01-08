import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addWord } from "../api/apiCalls";

const schema = yup.object({
  english_word: yup.string().required("English word is required"),
});

function SubmitWordForm() {
  const [word_id, setWord_id] = useState("");
  const [english_word, setEnglish_word] = useState("");
  const [hungarian_meaning, setHungarian_meaning] = useState("");

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
      console.log("Success!");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (responseData, error) => {
      if (responseData) {
        setWord_id(responseData.word_id);
        setEnglish_word(responseData.english_word);
        setHungarian_meaning(responseData.hungarian_meaning);
      }
    },
  });

  const handleResponseClick = () => {
    console.log("Word id: ", word_id);
  };

  const onSubmit = (data) => {
    submitMutation.mutate(data);

  };

  return (
    <div>
      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
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
                  <div className="response-div mt-4 p-4 rounded bg-white text-black" onClick={handleResponseClick}>
                    <h3 className="font-bold">Translate:</h3>
                    {english_word}: {hungarian_meaning}

                    <div className="text-center">
                        <button className="text-white bg-navbarBgColor hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2 ">
                            Add word
                        </button>
                    </div>
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
