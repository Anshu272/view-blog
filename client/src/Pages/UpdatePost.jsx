import React, { useState ,useEffect} from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';

import { CircularProgressbar } from 'react-circular-progressbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate ,useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const {postId}=useParams()
  const navigate=useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);


  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      
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
      uploadData.append('file', file);
      uploadData.append('api_key', apiKey);
      uploadData.append('timestamp', timestamp);
      uploadData.append('signature', signature);
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setImageUploadProgress(progress.toFixed(0));
        }
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData((prev) => ({ ...prev, image: response.secure_url }));
        } else {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        }
      };
      
      xhr.onerror = () => {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
      };
      
      xhr.send(uploadData);
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }}
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
    <form className='flex flex-col gap-4'onSubmit={handleSubmit} >
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
          type='text'
          placeholder='Title'
          value={formData.title}
          required
          id='title'
          className='flex-1'
          onChange={(e)=>setFormData({...formData,title:e.target.value})}

        />
        <Select onChange={(e)=>setFormData({...formData,category:e.target.value})} value={formData.category}
        >
          <option value='uncategorized'>Select a category</option>
          <option value='javascript'>JavaScript</option>
          <option value='reactjs'>React.js</option>
          <option value='nextjs'>Next.js</option>
        </Select>
      </div>
      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput
          type='file'
          accept='image/*'
          onChange={(e)=>{setFile(e.target.files[0])}}
        />
        <Button
          type='button'
          className='mx-3 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold' onClick={handleUpdloadImage}
        >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
        </Button>
      </div>
      {imageUploadError && <div className='w-full bg-red-200 text-red-600 h-10 rounded-lg text-lg font-medium flex items-center pl-5'>{imageUploadError}</div>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
      <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          value={formData.content}
          onChange={(value)=>setFormData({...formData,content:value})}
        />
          <Button
            className=" bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg   py-0.5 text-center   text-white"
            type="submit" 
          >
            Update post
          </Button>
    </form>
  </div>

  )
}
