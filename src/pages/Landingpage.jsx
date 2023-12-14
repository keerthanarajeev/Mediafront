

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function Landingpage() {

  // function definition
  // redirect from one page to another page we can use hook ie useNavigate

  const navigate=useNavigate()


  const handleNavigate=()=>{


    navigate('/home')
  


  }



  return (

    <>

         <Row>

          <Col></Col>

          <Col lg={6}>

            <h1>Welcome Videooo.com</h1>
            <p style={{textAlign:'justify'}}>Where user can use their favorite videos. User can upload any youtube videos by copy and paste their url into videoos.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free . Try it now!!!</p>


            <button onClick={handleNavigate} className='btn btn-primary'>Click Here to Know More </button>
          
          
          </Col>

          <Col lg={5}>

            <img className='img-fluid' src="https://www.videoconverterfactory.com/tips/imgs-self/upload-hd-videos-to-youtube/upload-hd-videos-to-youtube-1.jpg" alt="no image" style={{marginLeft:'15%'}} />
          
          </Col>

         </Row>


    </>

  )
}

export default Landingpage