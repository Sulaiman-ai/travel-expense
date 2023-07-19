"use client"

import { userauth } from "@/app/firebase/authUsers";
import useFirebaseAuth from "@/app/firebase/useFirebaseAuth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        })
            .catch((error) => {
                console.log('error', error)
            })
        }
    

    return (
        <>
        <button onClick={()=> router.push('/signup')}>signup page</button>
        <p>{email}</p>
        <p>{password}</p>
        <p>Auth User: {authUser.uid}</p>
        <button onClick={toggleOption}>{option}</button>
        <p>{user}</p>
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" value="Sign Up"/>
        </form>
        </>
    )
}