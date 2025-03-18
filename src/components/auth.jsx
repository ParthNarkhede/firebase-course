import { auth, googleProvider } from '../config/firebase'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
// import {fireStore} from '../config/firebase';


export const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>SignIn</button>

            <div className="googlesignin">
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
            <div className="logout">
                <button onClick={logout}>Logout</button>
            </div>
        </div>

    )
}