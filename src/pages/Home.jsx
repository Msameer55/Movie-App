import React from 'react'
import Upcoming from '../Components/Upcoming'
import DayTrendingMovies from '../Components/DayTrendingMovies'
import HeroBanner from '../Components/HeroBanner'

const Home = () => {
  return (
    <>
    <HeroBanner />
    <Upcoming />
    <DayTrendingMovies />
    </>
  )
}

export default Home