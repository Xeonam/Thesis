import React from "react";
import { SubmitWordForm, DefaultNavbar, FileUploadForm } from "../components";

function SubmitWord() {
  return (
    <div>
      <DefaultNavbar />
      <SubmitWordForm />
      <FileUploadForm />
    </div>
  );
}

export default SubmitWord;
