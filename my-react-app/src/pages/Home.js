import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {

    const [imageUpload, setImageUpload] = useState(null);

    const handleImageFinishedUploading  = () => {
        alert('Image finished uploading!');
    }

    const fileSelectedHandler = event => {
        setImageUpload(event.target.files[0]);
      }
    
      const fileUploadHandler = () => {
        if(imageUpload == null) return;

        const fd = new FormData();
        fd.append('image', imageUpload, imageUpload.name);
        // insert the firebase url below!
        const post_endpoint = "https://us-central1-project-09-e4dd7.cloudfunctions.net/uploadFile";
        axios.post(post_endpoint, fd, {
          onUploadProgress: progressEvent => {
            // console.log('Upload Progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
          }
        })
          .then(res => {
            handleImageFinishedUploading();
        });
      }
    
    return (
        <div className = "mainContainer">
            <h2>Upload an Image!</h2>
            <div className="imagePreview">
                {/* only render the image if not null */}
                {imageUpload != null && <img src={URL.createObjectURL(imageUpload)} />}
                </div>

                <div className="returnedImage">
                </div>

                <div className="uploadButtons">
                <input type="file"/>
                <button onClick={fileUploadHandler}>Upload</button>
            </div>
        </div>
    )
}