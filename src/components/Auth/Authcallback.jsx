import { useLocation, useSearchParams } from 'react-router-dom';

function AuthCallback() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const user = searchParams.get('user');

  console.log(token,user);
  

  console.log("Token:", token);
  console.log("User:", user);

  return (
    <div>
      {/* Render or process the token and user */}
      <h1>Authentication Callback</h1>
    </div>
  );
}

export default AuthCallback;
