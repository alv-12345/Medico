import React from 'react'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import SpecialityMenu from '../components/SpecialityMenu'
import Reveal from '../components/Reveal'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Header />
      <Reveal width="100%" delay={0.2}>
        <SpecialityMenu />
      </Reveal>
      <Reveal width="100%" delay={0.3}>
        <TopDoctors />
      </Reveal>
      <Reveal width="100%" delay={0.2}>
        <Banner />
      </Reveal>
    </div>
  )
}

export default Home
