import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Updatefailure,
  Updatestart,
  Updatesuccess,
} from "../redux/user/userslice";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imgurl, setimgurl] = useState(null);
  const [imgfile, setimgfile] = useState(null);
  const [imgfileupload, setimgfileupload] = useState(null);
  const [imgfilerr, setimgfilerr] = useState(null);
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserError, setupdateUserError] = useState(null);
  const [formData, setformData] = useState({});
  const filepick = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (imgfile) {
      uploadimage();
    }
  }, [imgfile]);

  const uploadimage = async () => {
    setimgfilerr(null);
    const storage = getStorage(app);
    const filename = new Date().getTime() + imgfile.name;
    const storageref = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageref, imgfile);
    console.log(imgfileupload, imgfilerr);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimgfileupload(progress.toFixed(0));
      },
      (error) => {
        setimgfilerr("could not get");
        setimgfileupload(null);
        setimgfile(null);
        setimgurl(null);
        setimageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgurl(downloadURL);
          setformData({ ...formData, profilePicture: downloadURL });
          setimageFileUploading(false);
        });
      }
    );
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
          {imgfileupload && (
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
            src={imgurl || currentUser.profilePicture}
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
          type="submit"
        >
          Update
        </Button>
        <div className="text-red-500 flex w-[90%] max-w-[600px] justify-between  ">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
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
      </form>
    </div>
  );
}
