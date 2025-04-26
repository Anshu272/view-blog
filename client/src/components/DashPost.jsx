import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal ,Button} from 'flowbite-react';

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='table-auto w-full min-h-screen overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
        <table className='min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Date updated
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Post image
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Post title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Delete
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200'>
            {userPosts.map((post) => (
              <tr key={post._id} className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}      
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500 rounded'
                    />
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  <Link
                    className='font-medium text-blue-600 dark:text-blue-400 hover:underline'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  {post.category}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer'>
                  <span onClick={() => {setShowModal(true);setPostIdToDelete(post._id)}} >
                    Delete
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-teal-600 dark:text-teal-400 hover:underline'>
                  <Link to={`/update-post/${post._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
               {showMore && (
                <button
                  onClick={handleShowMore}
                  className='w-full text-teal-500 self-center text-sm py-7'
                >
                  Show more
                </button>
              )}
              </>
        
      ) : (
        <p className='text-gray-700 dark:text-gray-300'>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center p-4'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button className="bg-red-600 text-white " onClick={handleDeletePost}>
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