/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // console.log(response);
        window.localStorage.setItem('user', email)
        // window.localStorage.setItem('token', response.user.accessToken)
        // console.log(response.user.accessToken)
        navigate("/");
      })
      .catch(() => {
        // console.log(error);
        setError("Invalid Email or Password");
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center space-y-4 p-5 w-full md:w-1/2 lg:w-1/4 mx-auto rounded-lg border-2 border-gray-300 shadow-2xl">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {error != "" && (
          <div className="bg-red-200 p-3 rounded-md">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={signIn} className="w-full flex flex-col space-y-5">
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-500 py-1 px-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-500 py-1 px-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md hover:bg-gray-900 hover:shadow-xl"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
