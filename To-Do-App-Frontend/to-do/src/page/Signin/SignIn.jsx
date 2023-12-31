import { useEffect } from "react"
import { UserAuth } from "../../context/AuthContext"
import {GoogleButton} from "react-google-button"
import { useNavigate } from "react-router"

const SignIn = () => {

    const {googleSignIn, user} = UserAuth()

    const navigate = useNavigate()


    const handleGoogleSignIn = async() => {
        try {
            await googleSignIn()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() =>{
        if(user != null){
            navigate('/account')
        }
        
    },[user])
    
    return(
        <div  className="d-flex align-items-center flex-column mt-4">
            <header>
                <h1>Sign In</h1>
            </header>
            <section>
                <GoogleButton onClick={handleGoogleSignIn} />
            </section>
            
        </div>
    )
}

export {SignIn}