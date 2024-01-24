import React from "react";
import { ViewPublicDecks, DefaultNavbar } from "../components";
function ViewPublicDecksPage() {
  return (
    <div className="bg-[#412A4C] min-h-screen">
        <DefaultNavbar />
        <ViewPublicDecks />
    </div>
  )
}

export default ViewPublicDecksPage