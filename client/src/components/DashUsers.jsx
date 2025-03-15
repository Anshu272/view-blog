import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Modal ,Button} from 'flowbite-react';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log("error.message");
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/auth/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };


  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
        <table className='min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Date created
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                user image
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                username
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                admin
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200'>
            {users.map((user) => (
              <tr key={user._id} className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    <img className='w-12 h-12 object-cover bg-gray-500 rounded-full' src={user.profilePicture} alt='image'></img>
  
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                    {user.username}
    
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer'>
                  <span onClick={() => {setShowModal(true);setUserIdToDelete(user._id)}} >
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
        <p className='text-gray-700 dark:text-gray-300'>You have no users</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button className="bg-red-600 text-white " onClick={handleDeleteUser}>
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