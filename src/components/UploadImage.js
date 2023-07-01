import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';




function UploadImage({flag, setFlag}) {
    const [uploaded, setUploaded] = useState(false);
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
    const { token } = useContext(AuthContext);
    const handleShow = ()=> setShow(true);
    const handleClose = ()=> setShow(false);

    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('picture', image, image.name);
            //(field, state image, file name)
            console.log(`formData ${formData}`)
            let res = await fetch('http://localhost:8080/api/upload', {
              method: "POST",
              headers:{
                Authorization: `Bearer ${token}`,
              },
              body: formData
            });
            setUploaded(true);
            setError(false);
            handleClose();
            setFlag(!flag);

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
    {/* <button className="btn btn-primary m-2" onClick={handleShow}>
      Upload
    </button> */}
    <div show={show} onHide={handleClose}>
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

          <button type="submit" className="btn btn-primary">
            Upload
          </button>
         

          {uploaded? "Upload Successfully Please Add Photo To Your Location " : error ? (
            <div className="text-danger">
              An error occurred uploading the file
            </div>
          ) : null}
        </form>
        {/* <button variant="secondary" onClick={handleClose}>
          Close
        </button>  */}
    </div>
  </>
  )
}

export default UploadImage