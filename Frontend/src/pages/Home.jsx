import React, { useState } from 'react'

import { useTheme } from '../context/ThemeContext'  // ✅ import theme hook
import FindPharmacy from '../components/FindPharmacy'

import Hero from '../components/Hero'
import FeaturedPharmacies from '../components/FeaturedPharmacies'
import TestimonialCarousel from '../components/TestimonialCarousel'
import KeyFeatures from '../components/KeyFeatures'


const Home = () => {
  
  const { theme } = useTheme()  // ✅ access theme colors


  return (
    <>

     <Hero />
      <FindPharmacy />
      <FeaturedPharmacies />
      <KeyFeatures />
      <TestimonialCarousel />

    </>
  )
}

export default Home


