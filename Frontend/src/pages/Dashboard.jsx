import React from 'react'
import { Words, DefaultNavbar } from '../components'

function Dashboard() {
  return (
    <div className="bg-[#412A4C] min-h-screen">
      <DefaultNavbar />
      <Words />
    </div>
  )
}

export default Dashboard