"use client"

import { userauth } from "@/app/firebase/authUsers";
import useFirebaseAuth from "@/app/firebase/useFirebaseAuth";
import { addUser } from "@/app/firebase/setData";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import formstyle from '../css/signupform.module.css';

export default function SignUp (){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState('logged out');
    const [option, setOption] = useState('signup');
    const router = useRouter();
    console.log('auth', userauth)

    const {authUser, loading, signUserOut} = useFirebaseAuth(userauth);

    const toggleOption = () => {
        switch (option) {
            case 'signup':
                setOption('login');
                break;
            case 'login':
                setOption('signup');
                break;
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        let userFunction;
        switch(option){
            case 'login': userFunction = signInWithEmailAndPassword; break;
            case 'signup': userFunction = createUserWithEmailAndPassword; break;
        }
        userFunction(userauth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('user', user)
            setUser(user.uid);
            addUser(user.uid);
        })
            .catch((error) => {
                console.log('error', error)
            })
        }
    

    return (
        <>
        <div className={formstyle.container}>
            {/* <p>{option}</p> */}
            <div className={formstyle.tabcontainer}>
                <button className={`${formstyle.tab} ${option=='login' ? formstyle.active : null}`} onClick={()=>setOption('login')}>Login</button>
                <button className={`${formstyle.tab} ${option=='signup' ? formstyle.active : null}`} onClick={()=>setOption('signup')}>Sign Up</button>
            </div>
            <form className={formstyle.form} onSubmit={handleSubmit}>
                <input name="email" placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
                <input name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit" value={option=='login' ? 'Login' : "Sign Up"}/>
            </form>
        </div>
        </>
    )
}