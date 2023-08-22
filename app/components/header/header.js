"use client"

import Link from "next/link";
import useLoggedIn from "@/app/(user)/components/loggedIn";

export default function Header(){

    const { pathname, signUserOut } = useLoggedIn();

    return (
        <div>
            <Link href="/"><h1>Travel Expense Tracker</h1></Link>
            {(pathname !== '/signup') ? <button onClick={signUserOut}>Sign Out</button> : null}
        </div>
    )
}