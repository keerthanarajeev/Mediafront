

import React from 'react'
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, deleteVideo } from '../service/allapi';
import { v4 as uuidv4 } from 'uuid';


function Video({card,handleDeleteStatus, insideCategory }) {

 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    
    setShow(true);
  // to generate id automatically
   
  const uid=uuidv4()
  console.log(uid);

  // to generate system time and date
  
  let cardTime=new Date()

  console.log(cardTime);
  

  const{caption,url}=card

  if (uid!="",caption!="",url!="",cardTime!="")
  {

    const  body={
      id:uid,categoryname:caption,url,date:cardTime
    }

    // api call for post data to watch history

    const res= await addHistory(body)
    console.log(res);
  }

  }

  

  // video remove

  const removeItem=async(id)=>{
    
    // api call

    const response=await deleteVideo(id)
    console.log(response);


    if(response.status>=200&&response.status<300)
    {
      handleDeleteStatus(true)
    }
  }

  // function definition

  const dragStarted=(e,id)=>{
    console.log("drag started & source card id:"+id);

    e.dataTransfer.setData("cardId",id)
  }


  return (
    <>
      
      <div>

      <Card className='shadow' draggable onDragStart={e=>dragStarted(e,card?.id)}> 
      <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
            <span> {card?.caption}</span>

            <span>

              
                 {
                  insideCategory?"":
                <Trash2 onClick={()=>removeItem(card?.id)} color='red' style={{float:'right'}}/>
                  }
              
            </span>
              
        </Card.Title>
        
      </Card.Body>
    </Card>

    {/* Modal */}

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <iframe width="100%" height="400px" src={`${card?.url}?autoplay=1`} title="Neela Nilave - Video Song | RDX | Kapil Kapilan | Sam CS | Shane Nigam,Antony Varghese,Neeraj Madhav" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


        </Modal.Body>
        
      </Modal>


      </div>
        



    </>
  )
}

export default Video