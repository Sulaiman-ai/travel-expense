import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useFirebaseAuth from "@/app/firebase/useFirebaseAuth";
import { userauth } from "@/app/firebase/authUsers";

export default function LoggedIn (){

    const { authUser, loading, signUserOut } = useFirebaseAuth(userauth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('checking if logged in');
        console.log('loading', loading);
        console.log('authuser', authUser);
        if (!loading && !authUser) {
            router.push('/signup')
        } 
        else if (authUser && pathname == '/signup') {
            router.push('/')
        }
    }, [authUser, loading, pathname]);

    return (
        (pathname !== '/signup') ?
        <>
        <button onClick={signUserOut}>Sign Out</button>
        <p>{authUser ? authUser.uid : null}</p>
        <p>{authUser ? authUser.email : null}</p>
        </> : null
    )
}