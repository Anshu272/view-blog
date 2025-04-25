import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?limit=4');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  
  return (
    <div>
      {/* Hero Section - Keeping your original structure with enhanced styling */}
      <div className='relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img 
            src='/blog.png' 
            alt='Blog background'
            className='w-full h-full object-cover brightness-90'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-black/70'></div>
        </div>
        
        <div className='relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 text-white'>
          <div className='max-w-4xl space-y-6'>
            <h1 className='text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-tight'>
              Welcome to My <span className="text-teal-400">Blog</span>
            </h1>
            <p className='text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto'>
              Discover insightful articles and tutorials on web development, 
              software engineering, and modern programming techniques.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                to='/about'
                className='px-6 py-3 border border-white text-white hover:bg-white/10 font-medium rounded-lg transition duration-300'
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Posts Section - Keeping your original flex layout */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-12'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-8'>
            <h2 className='text-3xl font-extrabold text-center text-gray-800 dark:text-white'>
              Recent Posts
            </h2>
            <div className='flex flex-wrap gap-6 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 hover:underline text-center font-medium transition-colors duration-200'
            >
              View all posts →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}