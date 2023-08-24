import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useFirebaseAuth from "@/app/firebase/useFirebaseAuth";
import { userauth } from "@/app/firebase/authUsers";

export default function useLoggedIn (){

    const { authUser, loading, signUserOut } = useFirebaseAuth(userauth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('checking if logged in');
        console.log('loading', loading);
        console.log('authuser', authUser);
        debugger;
        if (!loading && !authUser && pathname !== '/signup') {
            router.push('/signup')
        } 
        else if (authUser && pathname == '/signup') {
            router.push('/')
        }
        debugger;
    }, [authUser, loading, pathname]);

    return {pathname, signUserOut}

    // return (
    //     (pathname !== '/signup') ?
    //     <>
    //     <button onClick={signUserOut}>Sign Out</button>
    //     {/* <p>{authUser ? authUser.uid : null}</p>
    //     <p>{authUser ? authUser.email : null}</p> */}
    //     </> : null
    // )
}