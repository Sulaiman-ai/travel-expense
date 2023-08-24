"use client"

import Link from "next/link";
import useLoggedIn from "@/app/(user)/components/loggedIn";

import headerstyle from '../../css/header.module.css';

export default function Header(){

    const { pathname, signUserOut } = useLoggedIn();

    return (
        <div className={headerstyle.container}>
            <Link href="/" className={headerstyle.title}><h1>Travel Expense Tracker</h1></Link>
            <Link href="/transactions" className={headerstyle.link}>Transactions</Link>
            {(pathname !== '/signup') ? <p onClick={signUserOut} className={headerstyle.link}>Sign Out</p> : null}
        </div>
    )
}