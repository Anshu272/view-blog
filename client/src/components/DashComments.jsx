import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal ,Button} from 'flowbite-react';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [userComments, setUserComments] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setcommentIdToDelete] = useState('');


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments');
        const data = await res.json();
        if (res.ok) {
          setUserComments(data.comments);
          console.log(data)
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userComments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserComments((prev) => [...prev, ...data.posts]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteComment = async () => {
    try {
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setUserComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };


  return (
    <div className='table-auto w-full min-h-screen overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userComments.length > 0 ? (
        <>
        <table className='min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Date updated
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Comment Content
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                No of likes
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
               PostID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                UserID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200'>
            {userComments.map((comment) => (
              <tr key={comment._id} className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  {new Date(comment.updatedAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {comment.content}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  {comment.likes.length}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  {comment.postId}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-teal-600 dark:text-teal-400 hover:underline'>
                  {comment.userId}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer'>
                  <span onClick={() => {setShowModal(true);setcommentIdToDelete(comment._id)}} >
                    Delete
                  </span>
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
        <p className='text-gray-700 dark:text-gray-300'>You have no comments yet!</p>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button className="bg-red-600 text-white " onClick={handleDeleteComment}>
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