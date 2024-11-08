import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('accessToken');
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  console.log(token);
  

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUserPosts();
  }, [id, token]);

  const user = posts.length > 0 ? posts[0].userId : null; // Assuming user data comes from the first post

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Profile Info Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center sm:justify-between mb-6">
        {/* Profile Picture */}
        <div className="flex items-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="flex flex-col sm:ml-8 text-center sm:text-left">
            {user ? (
              <>
                <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
              </>
            ) : (
              <p>Loading user details...</p>
            )}
            <div className="flex justify-center sm:justify-start space-x-6">
              <div>
                <span className="font-bold">{posts.length}</span>
                <p className="text-gray-600">Posts</p>
              </div>
              <div>
                <span className="font-bold">450</span>
                <p className="text-gray-600">Followers</p>
              </div>
              <div>
                <span className="font-bold">230</span>
                <p className="text-gray-600">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mt-4 sm:mt-0">
          <button
            className="text-blue-500 font-semibold border border-blue-500 px-4 py-2 rounded-lg mb-2 sm:mb-0"
            onClick={() => navigate('/createPost')}
          >
            Create Post
          </button>
          <button className="text-blue-500 font-semibold border border-blue-500 px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-full h-48 bg-gray-300 relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-lg font-semibold">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
