"use client"

import Link from "next/link";
import LoggedIn from "@/app/(user)/components/loggedIn";

export default function Header(){
    return (
        <div>
            <Link href="/"><h1>Travel Expense Tracker</h1></Link>
            <LoggedIn/>
        </div>
    )
}