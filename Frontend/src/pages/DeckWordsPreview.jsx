import React from 'react'
import { DeckWordsPreviewComponent, DefaultNavbar } from '../components'

function DeckWordsPreview() {
  return (
    <div className="bg-[#412A4C] min-h-screen">
      <DefaultNavbar />
      <DeckWordsPreviewComponent />
    </div>
  )
}

export default DeckWordsPreview