const addNewToDo = async(user,url, todo ) =>{
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
        console.error(error)
        throw error
    }
}

const addNewList = async(user,url, newList) =>{
  try {
    const token = await user.getIdToken()
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }

   return await fetch(`${url}/api/addNewList?list=${newList}`,requestOptions)
}catch (error) {
    console.error(error)
    throw error
}
}

export {addNewList, addNewToDo}