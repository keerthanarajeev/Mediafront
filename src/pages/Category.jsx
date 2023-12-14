

import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllcategory, getVideos, updateCategory } from '../service/allapi';
import { Trash2 } from 'react-feather';
import Video from './Video'


function Category() {

   
  // State to view category without refresh

  const[serverRes,setserverRes]=useState({})

  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deletestatus, setDeleteStatus] = useState(false);

  const [categoryItem, setcategoryitem] = useState({
    id: "", name: "", allVideod: []
  })


  const handleDeleteStatus=(res)=>{
    setDeleteStatus(res)
  }

   // category remove

   const removeCategory=async(id)=>{
    
    // api call

    const response=await deleteCategory(id)
    console.log(response);


    if(response.status>=200&&response.status<300)
    {
      handleDeleteStatus(true)
    }
  }

  // create state to store  api response to view all category
  const [allCategory, setAllCategory] = useState([]);


  useEffect(() => {
    getCategoryList()

  }, [serverRes,deletestatus])


  // define function add category

  const addcategoryForm = (e) => {
    const { name, value } = e.target
    setcategoryitem({ ...categoryItem, [name]: value })
  }
  console.log(categoryItem);


  const handleAddCategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItem

    if (!id || !name) {
      toast.error("please fill the form completely");
    }
    else {
      const response = await addCategory(categoryItem)
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        setserverRes(response.data)
        setShow(false)
        toast.success("New Category Uploaded Successfully", {

          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

        getCategoryList()
      }
      else {
        toast.warning("Provide a unique id!!!")

      }
    }


  }

  const getCategoryList = async () => {
    // api call for getcategory
    const res = await getAllcategory()
    console.log(res);
    setAllCategory(res.data)
  }

  console.log(allCategory);


  // function definition

  const dragOver=(e)=>{
    e.preventDefault()
    console.log("dragging over the category board...!!!");
  }



  const dropped=async(e,categoryId)=>
  {
    console.log("category Id:",categoryId);
    let sourceCardId=e.dataTransfer.getData("cardId")
    console.log("sourceCardId",sourceCardId);
    // logic to implement adding card in the given category

    const{data} = await getVideos(sourceCardId)
    console.log('source video data',data);

    // dropped category details

    let selectedCategory=allCategory.find(item=>item.id==categoryId)
    console.log("target category details",selectedCategory);
    // to push drop data in to array
    selectedCategory.allVideod.push(data)
   // update drop data in allvideos array
    await updateCategory(categoryId,selectedCategory)
    getCategoryList()
  }
  
  return (
    <>

      <div className='d-grid'>

        <div onClick={handleShow} className='btn btn-dark m-2'>Add Category</div>



      </div>

      {
        allCategory.map(item => (

          <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,item?.id)}>

            

            <div className='d-flex justify-content-between border rounded mt-3 p-2'>
              <h4>{item.name}</h4>
              <span> <Trash2 onClick={()=>removeCategory(item?.id)} color='red' /></span>

              <Row>

                   {

                    item?.allVideod.map((card)=>(
                          <Col className='p-3 mb-1 sm={12}'>

                          <Video card={card} insideCategory={true} />
                          
                          </Col>


                    ))



                   }

              </Row>

            </div>
          </div>
        ))

        
        
      }



      {/* Modals */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
              <Form.Control name='id' onChange={addcategoryForm} type="text" placeholder="Category Id" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingcategory" label="Category">
              <Form.Control name='name' onChange={addcategoryForm} type="text" placeholder="Category" />
            </FloatingLabel>



          </Form>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
  )
}

export default Category



// 1.Create a watch istory tab in home page

// 2.Create new component for watch hystory
    //  table  format (id, cardname,url,title,date)

// 3.Create a watch history key in db.json and value as array

// When we click on the card add data to db.json