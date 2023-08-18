import app from './config';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const userauth = getAuth(app);

function getValidatedUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(userauth,
            (user) => {
                unsubscribe();
                if (user){
                    resolve(user);
                }
                // userDoc = user;
            }
        )
    })
};

export {userauth, getValidatedUser};