import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiShareFatFill } from "react-icons/pi";
import { FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import api from '../../interceptor/interceptor';


const Feed = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('accessToken');
  console.log(token);
  

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await api.get('/api/post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getAllPosts();
  }, []);
  const style = { color: "blue", fontSize: "1.2em" }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg">
          {/* User Info */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{post.userId?.name || 'Unknown User'}</h3>
            <span className="text-gray-500 text-sm">{new Date(post.timestamp).toLocaleString()}</span>
          </div>

          {/* Post Content */}
          <p className="text-gray-700 mb-4">{post.title}</p>

          {/* Post Image */}
          {post.image && (
            <div className="mb-4">
              <img src={post.image} alt="Post" className="flex items-center justify-center w-f64 h-64 object-cover rounded-lg" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-start gap-5 items-center mt-4">
            <button className="text-blue-500 font-bold hover:underline">Comment </button><FaComment style={style}/>
            <button className="text-blue-500 font-bold hover:underline">Share</button><PiShareFatFill style={style}/>
            <button className="text-blue-500 font-bold hover:underline">Like</button><FcLike style={style}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
