
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { Link } from 'react-router-dom'


function Home() {

  const[serverRes,setserverRes]=useState({})

  const handleresponse=(res)=>{
    setserverRes(res)
  }



  return (

    <>

      <h1 className='text-primary ms-5 mb-5'>All Video Cards</h1>


      <Link to={'/watchhistory'} style={{textDecoration:'none',fontSize:'25px',color:'red',marginLeft:'69%'}}  className=''>Watch History</Link>

      <div className="container-fluid">

        <Row>

          {/* Add component Selector */}

          <Col lg={1}>

            <Add handleresponse={handleresponse}/>

          </Col>

          {/* View Component Selector */}

          <Col lg={7}>

            <View serverRes={serverRes}/>

          </Col>

          {/* Category Component Selector */}

          <Col lg={4}>

            <Category/>

          </Col>


        </Row>


      </div>


    </>
  )
}

export default Home