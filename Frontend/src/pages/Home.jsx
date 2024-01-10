import React from 'react'
import { DefaultNavbar, Hero, HeroImage, FeaturesSection } from '../components'

function Home() {
  return (
    <div>
        <DefaultNavbar />
        <Hero />
        <HeroImage />
        <FeaturesSection />
    </div>
  )
}

export default Home