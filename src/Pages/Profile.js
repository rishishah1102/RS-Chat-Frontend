import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import "../CSS/Profile.css";
import axios from 'axios';
import instance from "../Utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    const Navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'x1jwk3yh');
        formData.append('cloud_name', 'dijjlexrf');

        let response = await axios.post('https://api.cloudinary.com/v1_1/dijjlexrf/image/upload', formData);
        setImageUrl(response.data.url);
    }

    const handleUpdate = () => {
        instance.post('/profile', {
            name: name,
            description: description,
            profilePhoto: imageUrl
        }, { headers: { Authorization: localStorage.getItem('rschattoken') } });
        toast.success("Data has been submitted successfully");
        setTimeout(() => {
            Navigate('/Chat');
        }, 3000);
    }

    return (
        <div className='profile'>

            <div className="profileContainer">

                <div className="heading">
                    <h1>Set-Up your Profile</h1>
                </div>

                <div className="profileImage">
                    <Avatar style={{ height: "200px", width: "200px" }} src={imageUrl} />
                    <input type="file" onChange={handleImageUpload} className='inputImage' />
                </div>

                <div className="details">
                    <input type="text" placeholder='Your Name' className='userName' onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" placeholder='Description' className='description' onChange={(e) => { setDescription(e.target.value) }} />
                    <button type='submit' onClick={handleUpdate}>Update</button>
                </div>

            </div>
            <ToastContainer position='bottom-right' theme="colored" />
        </div>
    );
};

export default Profile;