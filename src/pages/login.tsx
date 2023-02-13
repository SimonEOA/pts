import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      <img></img>
      <div>
        <button onClick={() => signIn()}>Login with Spotify</button>
      </div>
    </div>
  );
};

export default Login;
