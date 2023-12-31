
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from '@/components/Nav';
import {useState} from 'react';
import Logo from "./Logo";
import Link from "next/link";




export default function Layout({children}) {
  const {data:session} = useSession();


  const [showNav, setShowNav] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    
    if (result.error) {
      // Handle authentication error
      console.error('Authentication error:', result.error);
      return(
        alert("Please use the provided account to login. \n Account:jsmith@gmail.com \n Email:123")
      )
    } else {
      // Authentication successful
      console.log('Authentication successful');

  console.log("session",session);
      // You can redirect the user or perform other actions
    }
  };

  if(!session) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-login">
      <div className="w-1/2 h-1/2 shadow-lg bg-bgGray rounded-lg flex items-center flex-col justify-center">
      <h1>Sign in</h1>
      <div className="flex flex-start flex-col justify-start gap-2">
        <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="jsmith@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
        {/* Use onClick event to trigger sign-in */}
        <button className = "btn-default w-full" onClick={handleSignIn}>Continue</button>
      </div>
        </div>
    </div>
    </div>
    //   <div className="w-screen h-screen bg-bgGray flex items-center">
    //   <div className="text-center w-full">
    //     <button onClick={()=>signIn('google')} className="bg-white p-2 rounded-lg px-4"> Login with Google</button>
    //   </div>
    //  </div>
  )
  }
  return (
    <div className="bg-bgGray min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="flex grow justify-center mr-6">
        <Logo />
      </div>

      </div>

      <div className="flex">
        <Nav show = {showNav} />
        <div className="flex-grow p-8">{children}</div>
      </div>
    </div>
  )
}
