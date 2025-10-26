import React from 'react'
import Navbar from '../components/Navbar'
import SystemBackground from '../components/SystemBackground'
import {Container} from 'react-bootstrap'
import System from './System'
const Home = () => {
  return (

    <Container>
      <Navbar />
    <SystemBackground>  
    <System />
    </SystemBackground>
    </Container>

  )
}

export default Home