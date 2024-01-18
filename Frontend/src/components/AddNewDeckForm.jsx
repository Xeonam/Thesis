import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { addDeck } from "../api/apiCalls";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const schema = yup.object({
  name: yup.string().required("Deck name is required"),
});

function AddNewDeckForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitMutation = useMutation({
    mutationFn: addDeck,
    onSuccess: () => {
      toast.success("The deck has been successfully added!");
      resetForm();
    },
    onError: () => {
      toast.error("An error occurred!");
    },
  });

  const onSubmit = (data) => {
    submitMutation.mutate(data);
  };

  const resetForm = () => {
    reset();
  };
  return (
    <div>
      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#A7C7E7] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                Deck name
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="deck_name"
                    id="deck_name"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 pl-3 pr-10"
                    placeholder="Deck name"
                    {...register("name")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  ></button>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-navbarBgColor hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddNewDeckForm;
