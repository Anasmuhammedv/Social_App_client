import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/Auth/login";
import Users_SignUpForm from "./components/Auth/signup";
import Homepage from "./components/Homepage/homePageCombined";
import Sidebar from "./components/Homepage/leftsidebar";
import Feed from "./components/Homepage/mainpage";
import PostCreator from "./components/Homepage/postcreator";
import RightPanel from "./components/Homepage/rightPanel";
import AuthCallback from './components/Auth/Authcallback';
import ProfilePage from './components/profile/profile';
import Navbar from './components/Homepage/navbar';
import CreatePost from './components/profile/createpost';
import Message from './components/message/socketio';

function App() {
  return (
    <>
    <Navbar/>
       <Routes>
        <Route path="/Loginpage" element={<LoginPage />} />
        <Route path='/signup' element={<Users_SignUpForm/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path='/user/profile' element ={<ProfilePage/>}/>
        <Route path ='/createPost' element = {<CreatePost/>}/>

       {/* <Route path='/' element={<Message/>}/> */}
       </Routes>
       </>
     
  );
}

export default App;
