const deleteList = async(user,url, id, list) => {
    try{
        const token = await user.getIdToken()
        const requestOptions = {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }

       return await fetch(`${url}/api/deleteList?id=${id}&list=${list}`, requestOptions)
    }catch (error) {
        console.error(error)
        throw error
    }
}

const deleteToDo = async(user,url, id) =>{
  try{
    const token = await user.getIdToken()
    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
    return await fetch(`${url}/api/deleteToDo?id=${id}`, requestOptions)
    }catch (error) {
        console.error(error)
        throw error
    }
}

export {deleteList, deleteToDo}