import React from 'react'
import { DueCardsComponent, DefaultNavbar } from '../components'
function DueCard() {
  return (
    <div className="bg-[#412A4C] min-h-screen">
        <DefaultNavbar />
        <DueCardsComponent />
    </div>
  )
}

export default DueCard