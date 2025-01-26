import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const allContext = createContext()

const Authprovider = ({ routes }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create user in firebase
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // and img url and username upon signup
    const addNameImage = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    // login user with email and password
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login system....
    const googleLoginProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleLoginProvider)
    }

    // github login system
    const githubLoginProvider = new GithubAuthProvider();
    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubLoginProvider)
    }

    // logout all user
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const anyChanges = onAuthStateChanged(auth, currentuser => {
            currentuser ? setUser(currentuser) : setUser(null)
            setLoading(false)

            // jwt token related work
            if (currentuser?.email) {
                const users = { email: currentuser.email }

                axios.post('https://back-end-part-a11.vercel.app/jwt', users, {
                    // axios.post('http://localhost:5500/jwt', users, {
                    withCredentials: true
                })
                    .then(res => {
                        setLoading(false)
                    })
            }
            else {
                axios.post('https://back-end-part-a11.vercel.app/logout', {}, {
                    // axios.post('http://localhost:5500/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        setLoading(false)
                    })
            }

            return () => {
                anyChanges()
            }
        })
    }, [])

    // set neccesery things to send using context api....
    const contextlist = {
        signup, login, addNameImage,
        googleLogin, githubLogin,
        logOut,
        loading,
        user,
    }



    return (
        <div>
            <allContext.Provider value={{ 'hi': 'hello' }}>{routes}</allContext.Provider>
        </div>
    );
};

export default Authprovider;