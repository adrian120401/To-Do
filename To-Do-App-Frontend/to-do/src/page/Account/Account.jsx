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
        <div className="d-flex align-items-center flex-column mt-4">
            <div>
                <img alt={user?.displayName} src={user?.photoURL} 
                className="img-thumbnail"></img>
            </div>
            <div className="d-flex align-items-center flex-column mt-3">
                <p>Welcome to EasyTask, {user?.displayName}</p>
                <button type="button" class="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    )
}

export {Account}