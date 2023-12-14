

import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Video from './Video'
import { getVideo } from '../service/allapi'
import Category from './Category'



function View({serverRes}) {

  // to store api response

  const[allvideos,setallvideos]=useState([])

  const[deleteStatus,setdeleteStatus]=useState(false)
  


  useEffect(() => {

    // call getallvideos

    getAllVideos()
    
  }, [serverRes,deleteStatus])
    
    // create a function 

    const getAllVideos=async()=>{

       const response= await getVideo()

      //  console.log(response.data);

       setallvideos(response.data)

    }

    console.log(allvideos);


  //  te get deleteresponse

  const handleDeleteStatus=(res)=>{

    setdeleteStatus(res)
  }

  
 



  return (

    <>

       <div className='border p-3 rounded m-4 ms-3'>

        <Row>


          {

             allvideos.map(videos=>(
              <Col className='p-3 mb-3'  sm={12} md={6}>

                   
               <Video card={videos} handleDeleteStatus={handleDeleteStatus}/>
               
            </Col>
             ))

          
            

          }

          


        </Row>


       </div>


    </>
  )
}

export default View