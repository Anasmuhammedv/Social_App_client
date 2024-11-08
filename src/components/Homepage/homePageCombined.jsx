import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Sidebar from './leftsidebar';
import PostCreator from './postcreator';
import Feed from './mainpage';
import RightPanel from './rightPanel';
import Navbar from './navbar';

function Homepage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const user = searchParams.get('user');

  console.log(token,user);
  

  console.log("Token:", token);
  console.log("User:", user);
  return (
    <>
    {/* <Navbar/> */}
    <div className="flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* <PostCreator /> */}
        <Feed />
      </div>

      {/* Right Sidebar */}
      <RightPanel />
    </div>
    </>
  );
}

export default Homepage;
