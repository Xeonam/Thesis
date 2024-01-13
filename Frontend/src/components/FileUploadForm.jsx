import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFile } from "../api/apiCalls";
import { FaInfoCircle } from "react-icons/fa";

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => toast.success("File uploaded successfully"),
    onError: (error) => {
      const errorMessage = error.response.data.message;
      toast.error(`Upload failed: ${errorMessage}`);
    },
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-6 p-6"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <button type="button" onClick={toggleModal}>
        <FaInfoCircle />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0" onClick={toggleModal}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-blue-200">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-">
                File Upload Instructions
              </h3>
              <div className="mt-2 px-7 py-3">
                <p>
                  Please upload a .txt file containing the words you wish to
                  learn. The system will automatically translate these words
                  into Hungarian and add them to your study flashcards.
                </p>
              </div>
              <p className="text-sm font-bold">
                After the upload is complete, each word from your file will be
                translated and added to your flashcards for learning.
              </p>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col rounded-lg border-2 border-purple-300 border-dashed w-full md:w-96 h-44 p-6 group text-center bg-white hover:border-purple-500 hover:bg-purple-100 transition duration-300 ease-in-out">
          <div className="h-full w-full text-center flex flex-col items-center justify-center">
            {!selectedFile && (
              <p className="pointer-none text-purple-500 group-hover:text-purple-600 transition duration-300 ease-in-out mt-2">
                Drag and drop files here <br /> or{" "}
                <span className="text-purple-600 hover:text-purple-700 font-semibold">
                  select a .txt file
                </span>{" "}
                from your computer
              </p>
            )}
            {selectedFile && (
              <p className="text-green-600 mt-2">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out"
      >
        Upload
      </button>
    </form>
  );
}

export default FileUploadForm;
