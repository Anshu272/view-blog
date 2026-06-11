import { Alert, Button, TextInput, Modal ,ModalBody} from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link} from "react-router-dom";


import { CircularProgressbar } from "react-circular-progressbar";
import {
  Updatefailure,
  Updatestart,
  Updatesuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signoutSuccess
} from "../redux/user/userslice";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser,error,loading} = useSelector((state) => state.user);
  const [imgurl, setimgurl] = useState(null );
  const [imgfile, setimgfile] = useState(null);
  const [imgfileupload, setimgfileupload] = useState(null);
  const [imgfilerr, setimgfilerr] = useState(null);
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserError, setupdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setformData] = useState({});
  const filepick = useRef();
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (imgfile) {
      uploadimage();
    }
  }, [imgfile]);

  const uploadimage = async () => {
    setimgfilerr(null);
    setimageFileUploading(true);
    try {
      const url = `https://api.cloudinary.com/v1_1/dgywojrv0/image/upload`;
      const apiKey = '246991338712287';
      const apiSecret = 'bQ6FNPnEdYErogsXImunZ1vAK8A';
      const timestamp = Math.round((new Date).getTime()/1000);
      const signatureString = `timestamp=${timestamp}${apiSecret}`;
      
      const encoder = new TextEncoder();
      const data = encoder.encode(signatureString);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const uploadData = new FormData();
      uploadData.append('file', imgfile);
      uploadData.append('api_key', apiKey);
      uploadData.append('timestamp', timestamp);
      uploadData.append('signature', signature);
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setimgfileupload(progress.toFixed(0));
        }
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setimgurl(response.secure_url);
          setformData((prev) => ({ ...prev, profilePicture: response.secure_url }));
          setimageFileUploading(false);
        } else {
          setimgfilerr("could not upload image");
          setimgfileupload(null);
          setimgfile(null);
          setimgurl(null);
          setimageFileUploading(false);
        }
      };
      
      xhr.onerror = () => {
        setimgfilerr("could not upload image");
        setimgfileupload(null);
        setimgfile(null);
        setimgurl(null);
        setimageFileUploading(false);
      };
      
      xhr.send(uploadData);
    } catch (error) {
      setimgfilerr("could not upload image");
      setimgfileupload(null);
      setimgfile(null);
      setimgurl(null);
      setimageFileUploading(false);
      console.log(error);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimgfile(file);
      setimgurl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setupdateUserError("please fill all the fields");
      return;
    }
    if (imageFileUploading) {
      setupdateUserError("please wait for image to load");
      return;
    }
    try {
      dispatch(Updatestart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(Updatefailure(data.errmsg));
        setupdateUserError(data.errmsg);
        setupdateUserSuccess(null)
      } else {
        dispatch(Updatesuccess(data));
        setupdateUserSuccess("User successfully updated !");
        setupdateUserError(null)
      }
    } catch (error) {
      dispatch(Updatefailure(error.message));
      setupdateUserError(error.message);
      setupdateUserSuccess(null);
      console.error("Error updating user:", error);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.errmsg));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut=async()=>{
try {
  const res=await fetch(`/api/user/signout`,{
    method:'POST'
  });
  const data=res.json()
  if(!res.ok){
    console.log(data.message)
  }
  else{
    dispatch(signoutSuccess( ))
    navigate('/signin')
  }
} catch (error) {
  console.log(error.message)
  
}
  }

  return (
    <div className=" pl-5 w-full pr-5 pt-8 ">
      <form
        className="w-full h-full flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-4xl">Profile</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          ref={filepick}
          hidden
        />
        <div
          className="w-32 h-32 rounded-full object-contain border-2 border-gray-400 dark:border-white cursor-pointer relative"
          onClick={() => filepick.current.click()}
        >
          {imgfileupload && imgfileupload!='100' && (
            <div className="absolute inset-0 w-full h-full  justify-center">
              <CircularProgressbar
                className={imgfileupload === 100 ? hidden : ""}
                value={imgfileupload || 0}
                text={`${imgfileupload}%`}
                strokeWidth={3}
                styles={{
                  root: {
                    width: "100%", // Set the width for the progress bar
                    height: "100%", // Set the height for the progress bar
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imgfileupload / 100})`,
                  },
                }}
              />
            </div>
          )}
          <img
            src={imgurl || currentUser.profilePicture || "/default.png"}
            alt="avatar"
            className={`w-full h-full rounded-full ${
              imgfileupload && imgfileupload < 100 && "opacity-60"
            }`}
          />
        </div>
        {imgfilerr && (
          <Alert className="bg-red-300 text-red-600">{imgfilerr}</Alert>
        )}

        <TextInput
          type="text"
          placeholder="Username"
          id="username"
          className="w-[90%] max-w-[600px] "
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="Email"
          id="email"
          className="w-[90%] max-w-[600px] "
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="Password"
          id="password"
          className="w-[90%] max-w-[600px] "
          onChange={handleChange}
        />
        <Button
          className="w-[90%] max-w-[600px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg  px-4 py-0.5 text-center   text-white"
          type="submit" disabled={loading || imageFileUploading}
        >
          {loading?'Loading...':'Update'}
        </Button>
        {currentUser.isAdmin &&
                <Link to={'/create-post'} className="w-full flex justify-center ">
                <Button
                  className="w-[90%] max-w-[600px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg  px-4 py-0.5 text-center  text-lg text-white"  
                >
                  Create a post
        
                </Button></Link>}


        <div className="text-red-500 flex w-[90%] max-w-[600px] justify-between mb-6  ">
          <span className="cursor-pointer" onClick={()=>setShowModal(true)}>Delete Account</span>
          <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
        </div>
        {updateUserSuccess && (
          <div className="mt-5 bg-green-200 text-green-500 w-[90%] max-w-[600px] rounded-lg h-14 text-lg  flex justify-center items-center font-medium">
            {updateUserSuccess}
          </div>
        )}
        {updateUserError && (
          <div className="mt-5 bg-red-200 text-red-500 w-[90%] max-w-[600px] rounded-lg h-14 text-lg  flex justify-center items-center font-medium">
            {updateUserError}
          </div>
        )}
             {error && (
          <div className="mt-5 bg-red-200 text-red-500 w-[90%] max-w-[600px] rounded-lg h-14 text-lg  flex justify-center items-center font-medium">
            {error}
          </div>)}
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
        className="w-[500px] m-auto"
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center p-4'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button className="bg-red-600 text-white" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
