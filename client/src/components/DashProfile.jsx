import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imgurl, setimgurl] = useState(null);
  const [imgfile, setimgfile] = useState(null);
  const [imgfileupload, setimgfileupload] = useState(null);
  const [imgfilerr, setimgfilerr] = useState(null);
  const filepick = useRef();

  useEffect(() => {
    if (imgfile) {
      uploadimage();
    }
  }, [imgfile]);

  const uploadimage = async () => {
    setimgfilerr(null)
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
        setimgfileupload(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgurl(downloadURL);
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

  return (
    <div className=" pl-5 w-full pr-5 pt-8 ">
      <form className="w-full h-full flex flex-col items-center gap-6">
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
          {imgfileupload  && (
            <div className="absolute inset-0 w-full h-full  justify-center">
              <CircularProgressbar className={imgfileupload===100 ? hidden:''}
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
            className={`w-full h-full rounded-full ${imgfileupload && imgfileupload <100 && 'opacity-60'}`}
          />
        </div>
        {imgfilerr && <Alert className="bg-red-300 text-red-600">{imgfilerr}</Alert>}

        <TextInput
          type="text"
          placeholder="Username"
          className="w-[90%] max-w-[600px] "
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          placeholder="Email"
          className="w-[90%] max-w-[600px] "
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          placeholder="Password"
          className="w-[90%] max-w-[600px] "
        />
        <Button className="w-[90%] max-w-[600px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg  px-4 py-0.5 text-center   text-white">
          Update
        </Button>
        <div className="text-red-500 flex w-[90%] max-w-[600px] justify-between  ">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}
