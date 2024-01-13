import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFile } from "../api/apiCalls";

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 p-6">
      <div className="flex items-center justify-center w-full">
        <label
          className="flex flex-col rounded-lg border-2 border-purple-300 border-dashed w-full md:w-96 h
  -44 p-6 group text-center bg-white hover:border-purple-500 hover:bg-purple-100 transition duration-300 ease-in-out"
        >
          <div className="h-full w-full text-center flex flex-col items-center justify-center">

            <p className="pointer-none text-purple-500 group-hover:text-purple-600 transition duration-300 ease-in-out mt-2">
              Drag and drop files here <br /> or{" "}
              <span className="text-purple-600 hover:text-purple-700 font-semibold">
                select a .txt file
              </span>{" "}
              from your computer
            </p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      <button
        type="submit"
        className="
  
  w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out"
      >
        Upload
      </button>
    </form>
  );
}

export default FileUploadForm;
