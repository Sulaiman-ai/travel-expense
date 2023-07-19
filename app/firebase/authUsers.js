import app from './config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const userauth = getAuth(app);

export {userauth};