import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./navbar";

const Login = () => {

    return(
        <>
        <Navbar></Navbar>
         <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
        </>
    )
}
export default Login