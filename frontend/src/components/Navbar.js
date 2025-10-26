import React from 'react'
import flagLogo from '../Images/flagLogo.jpg'
import {Container, Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';


const Navbar = () => {
  return (

    <Container className= 'container'>
        <div className= 'BOJP'>
        <div className='flagBoxGreen'>
            <div className='flagCircleRed'>
<img className='flagImage' src={flagLogo}></img>
            </div>
      </div>
          <h1>BANGLADESH ONLINE JUDICIARY PORTAL</h1>
        </div>
    </Container>
           
       )
}

export default Navbar