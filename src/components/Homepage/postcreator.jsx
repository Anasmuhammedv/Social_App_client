import React from 'react';

const PostCreator = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex space-x-4">
        <button className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
          Write a post
        </button>
        <button className="flex-1 bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600">
          Upload photos
        </button>
        <button className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
          Upload video
        </button>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="What's on your mind, Steve?"
          className="w-full p-3 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default PostCreator;
