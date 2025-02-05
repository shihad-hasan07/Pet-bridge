import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const allContext = createContext(null)

const Authprovider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateprofile = (name, image) => {
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
            
            return () => {
                anyChanges()
            }
        })
    }, [])

    // set neccesery things to send using context api....
    const contextlist = {
        signup, login, updateprofile,
        googleLogin, githubLogin,
        logOut,
        loading,
        user,
    }

    return (
        <div>
            <allContext.Provider value={contextlist}>
                {children}
            </allContext.Provider>
        </div>
    );
};

export default Authprovider;