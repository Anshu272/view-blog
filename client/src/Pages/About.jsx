import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-bold text-center my-7'>
            About     <Link
                          to={"/"}
                        >
                          <span className=" ml-2 text-5xl font-bold text-blue-500">V</span>
                          <span className="font-bold">Blog</span>
                        </Link>
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to <span className="font-bold text-lg text-blue-400">V</span>Blog! This blog was created by Anshu
              as a personal project to share his thoughts and ideas with the
              world.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}