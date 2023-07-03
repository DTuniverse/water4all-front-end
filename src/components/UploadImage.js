import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Modal, Button, Box } from "@mui/material";



function UploadImage() {
    const [uploaded, setUploaded] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
    const { token } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('picture', image, image.name);
            //(field, state image, file name)
            console.log(`formData ${formData}`)
            let res = await fetch('https://water4all-backend.onrender.com/api/upload', {
              method: "POST",
              headers:{
                Authorization: `Bearer ${token}`,
              },
              body: formData
            });
            setUploaded(true);
            setError(false);
            setOpen(false);
        }catch(err){
          setError(err)
        }
    };

    const fileData = ()=>{
      if(image){
        return(
          <h5>
            <em>{image.name}</em>
          </h5>
        )
        return null
      }
    };


  return (
    <>
    <Button onClick={handleOpen}>Upload Photo</Button>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <Box sx={{ ...style, width: "95vw" }}>
        <div>
        <p>Upload Image</p>
        <form onSubmit={onSubmit}>
              <div className="form-group">
                <div className="custom-file">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="custom-file-input"
                    id="image"
                  />

              <label className="custom-file-label" htmlFor="image">
                {image ? fileData() : "Choose File"}
              </label>
            </div>
          </div>

              <button type="submit" className="btn btn-primary" onClick={onSubmit}>
                Upload
              </button>
            

              {uploaded? "Upload Successfully Please Add Photo To Your Location " : error ? (
                <div className="text-danger">
                  An error occurred uploading the file
                </div>
              ) : null}
            </form>
        </div>
        </Box>
    </Modal>
  </>
  )
}

export default UploadImage