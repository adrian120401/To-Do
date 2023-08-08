export const addNewToDo = async(user,url, todo ) =>{
    try {
        const token = await user.getIdToken()
        const requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(todo)
        }

       return await fetch(`${url}/api/addNewTodo`,requestOptions)
    }catch (error) {
        console.log(error)
        throw error
    }
}