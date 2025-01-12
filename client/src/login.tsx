import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./navbar";

const Login = () => {

    return(
        <>
        <Navbar></Navbar>
         <header>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
        </>
    )
}
export default Login