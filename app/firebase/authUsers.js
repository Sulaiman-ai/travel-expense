import app from './config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const userauth = getAuth(app);

function getValidatedUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(userauth,
            (user) => {
                // userDoc = user;
                unsubscribe();
                resolve(user);
            }
        )
    })
};

export {userauth, getValidatedUser};