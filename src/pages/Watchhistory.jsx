

import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { getHistory } from '../service/allapi';
import { useEffect } from 'react';


function Watchhistory() {

  const [history,sethistory]=useState([])

  useEffect(() => {

    getwatchHistory()
    
  }, [])
  
  
  
  
  
  const getwatchHistory =async() =>{
   const{data} = await getHistory()
   sethistory(data);
  }

console.log(history);


  return (
    <div>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>URL</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>

        {

           history?.map((item,index)=> (

        <tr>
          <td>{index+1}</td>
          <td>{item?.categoryname}</td>
          <td>{item?.url}</td>
          <td>{item?.date}</td>
        </tr>

           ))




        }
        
      
        
      </tbody>
    </Table>
    </div>
  )
}

export default Watchhistory