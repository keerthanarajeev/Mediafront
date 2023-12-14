


import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleresponse}) {

  const [uploaddata, setuploaddata] = useState({

    id: "", caption: "", thumbnail: "", url: ""

  })


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // define setInput

  const setInput = (e) => {

    const { name, value } = e.target

    // spread operator(...)

    setuploaddata({ ...uploaddata, [name]: value })

    // setuploaddata(e.target.value)
  }

  console.log(uploaddata);

  // extract  embedded url from youtube original URL

  const extractUrl = (e) => {

    let youtubeurl = e.target.value

    if (youtubeurl.includes("v=")) {

      let index = youtubeurl.indexOf("v=")

      console.log(index);

      let videourl = youtubeurl.substring(index + 2, index + 13)

      console.log(videourl);

      let videodata = uploaddata

      videodata.url = `https://www.youtube.com/embed/${videourl}`

      setuploaddata(videodata)


    }

    console.log(uploaddata);

  }

  const handleAdd = async () => {

    const { id, caption, thumbnail, url } = uploaddata

    if (!id || !caption || !thumbnail || !url) {
      toast.error("please fill the form completely", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    else {
      const response = await addVideo(uploaddata)


      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data);

        handleresponse(response.data)
        setShow(false)
        toast.success("New Video Uploaded Successfully", {

          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

      }

      else {
        toast.warning("Provide a unique id!!!", {

          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    }

  }




  return (
    <>

      <div onClick={handleShow} className='btn'>

        <PlusCircle color='grey' size={80} />

      </div>

      {/* Modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            {/* Id */}

            <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
              <Form.Control name='id' onChange={setInput} type="text" placeholder="Uploading Video Id" />
            </FloatingLabel>

            {/* Caption */}

            <FloatingLabel className='mb-3' controlId="floatingcaption" label="Uploading Video Caption">
              <Form.Control name='caption' onChange={setInput} type="text" placeholder="Video Caption" />
            </FloatingLabel>


            {/* Video Cover Image URL */}

            <FloatingLabel className='mb-3' controlId="floatingimage" label="Video Cover Image URL">
              <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder="Video Cover Image URL" />
            </FloatingLabel>

            {/* Uploading Video Link */}

            <FloatingLabel className='mb-3' controlId="floatinglink" label="Uploading Video Link">
              <Form.Control name='url' onChange={extractUrl} type="text" placeholder="Video Link" />
            </FloatingLabel>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
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

export default Add