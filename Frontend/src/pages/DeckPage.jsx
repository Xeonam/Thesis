import React from 'react'
import { Decks, DefaultNavbar } from '../components'

function Dashboard() {
  return (
    <div className="bg-[#412A4C] min-h-screen">
      <DefaultNavbar />
      <Decks />
    </div>
  )
}

export default Dashboard