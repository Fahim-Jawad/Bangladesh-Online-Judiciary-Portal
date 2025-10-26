import React from 'react'
import {Container, Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import System from '../pages/System';
import systemBackgroundLogo from '../Images/systemBackgroundLogo.jpg'


const SystemBackground = (props) => {
  return (
    <Container className='container'>
       <img className='systemBackgroundImage' src={systemBackgroundLogo}></img>
        <div className='systemBackground'>
       {props.children}
        </div>
         
    </Container>
  )
}

export default SystemBackground

 