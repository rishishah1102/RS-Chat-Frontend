import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import '../CSS/changeSidebarProfile.css';
import axios from 'axios';
import instance from "../Utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangeSidebarProfile({ profilePhoto, click, handlePhoto }) {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (profilePhoto !== "" || profilePhoto !== undefined) {
            setImageUrl(profilePhoto);
        }
    }, [profilePhoto]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'x1jwk3yh');
        formData.append('cloud_name', 'dijjlexrf');

        let response = await axios.post('https://api.cloudinary.com/v1_1/dijjlexrf/image/upload', formData);
        setImageUrl(response.data.url);
    }

    const handleChange = () => {
        instance.post('/changeProfile', {
            profilePhoto: imageUrl
        }, { headers: { Authorization: localStorage.getItem('rschattoken') } });
        toast.success("Profile Photo changed successfully!");
        handlePhoto(imageUrl);
        click(false);
    }

    return (
        <div className="changeSidebarProfile">
            <div className="changeSidebarProfileHeader">
                <Avatar style={{ height: "150px", width: "150px", margin: "50px" }} src={imageUrl} />
                <input type="file" className='changeProfileInputImage' onChange={handleImageUpload} />
            </div>
            <div className="changeSidebarProfileButton">
                <button type='submit' onClick={handleChange}>Change</button>
            </div>
            <ToastContainer position='bottom-right' theme="colored" />
        </div>
    );
};

export default ChangeSidebarProfile;