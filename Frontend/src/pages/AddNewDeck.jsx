import React from "react";
import { AddNewDeckForm, DefaultNavbar } from "../components";

function AddNewDeck() {
  return (
    <div className="bg-[#412A4C] min-h-screen">
      <DefaultNavbar />
      <AddNewDeckForm />
    </div>
  );
}

export default AddNewDeck;
