import { UserAuth } from "../../context/AuthContext"

const Account = () => {


    const {user, logOut} = UserAuth()

    const handleLogout = async() =>{
        try {
            await logOut()
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
            <h1>Account</h1>
            <p>Welcome to EasyTask, {user?.displayName}</p>
            <button type="button" class="btn btn-outline-danger mx-2" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export {Account}